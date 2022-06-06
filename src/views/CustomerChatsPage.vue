<template>
  <div class="chats">
    <div v-if="customerTasks.length > 0" class="chats__container chats__container_lg container">
      <div class="chats__sidebar chats-sidebar">
        <div class="chats-sidebar__task" 
              v-for="(customerTask, index) in customerTasks" 
              :key="index" 
              :class="currentCustomerTaskId == customerTask.id ? 'chats-sidebar__task_active' : ''" 
              @click="setCurrentTask(customerTask.id, index)">
            <div class="chats-sidebar__task-name">{{ customerTask.name }}</div>
            <div class="chats-sidebar__task-status task-status">{{ customerTask.status.name }}</div>
        </div>
      </div>
      <div v-if="chats.length > 0" class="chats__sidebar chats-sidebar">
        <div  class="chats-sidebar__chat chats-sidebar__chat_customer-chat" 
              v-for="chat in chats" 
              :key="chat.id" 
              :class="currentChatId == chat.id ? 'chats-sidebar__chat_active' : ''" 
              @click="setCurrentChat(chat.id, chat)">
          <div class="chats-sidebar__user-info chat-user-info">
            <div class="chat-user-info__avatar">
              <img v-if="chat.executor.avatar == null" src="../assets/images/no-image.jpg"/>
              <img v-else :src="chat.executor.avatar"/>
            </div>
            <div class="chat-user-info__info">
              <div class="chat-user-info__name">{{ chat.executor.firstname + ' ' + chat.executor.lastname }}</div>
            </div>
          </div>
          <div v-if="chat.task.executor_id == chat.executor.id" 
               class="chats-sidebar__status task-status">Исполнитель</div>
        </div>
      </div>
      <div  v-else class="chats__sidebar chats-sidebar">
        <div class="chats__error">Чатов по задаче пока что нет!</div>
      </div>
      <div class="chats__chat chat" v-if="currentChat !== null">
        <div class="chat__header">
          <div class="chat__user-info chat-user-info">
            <a href="#" class="chat-user-info__avatar">
              <img v-if="currentChat.executor.avatar == null" src="../assets/images/no-image.jpg"/>
              <img v-else :src="currentChat.executor.avatar"/>
            </a>
            <div class="chat-user-info__info">
              <router-link :to="'/profile/' + currentChat.executor.username" class="chat-user-info__name">{{ currentChat.executor.firstname + ' ' + currentChat.executor.lastname }}</router-link>
              <div class="chat-user-info__task-name">{{ currentChat.task.name }}</div>
            </div>
          </div>
          <div class="chat__settings" v-click-away="hideChatDropMenu">
            <div class="chat__settings-content" @click="openChatDropMenu">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div class="chat__dropmenu chat-dropmenu" v-if="isOpenChatDropMenu">
              <ul class="chat-dropmenu__list">
                <li v-if="customerTasks[currentCustomerTaskIndex].status.name === 'Создано'"
                    @click="setExecutor(currentChat.executor.id)">
                  <a class="chat-dropmenu__link">Назначить исполнителем</a>
                </li>
                <li v-if="customerTasks[currentCustomerTaskIndex].status.name === 'Исполнитель выбран'"
                    @click="changeTaskStatus(4, currentChat.executor.id)">
                  <a class="chat-dropmenu__link">Начать выполнение</a>
                </li>
                <li v-if="customerTasks[currentCustomerTaskIndex].status.name === 'Исполнитель выбран'"
                    @click="unsetExecutor">
                  <a class="chat-dropmenu__link">Сменить исполнителя</a>
                </li>
                <li v-if="customerTasks[currentCustomerTaskIndex].status.name === 'В процессе выполнения'"
                    @click="changeTaskStatus(5)">
                  <a class="chat-dropmenu__link">Задача выполнена</a>
                </li>
                <li v-if="customerTasks[currentCustomerTaskIndex].status.name === 'В процессе выполнения'"
                    @click="changeTaskStatus(6)">
                  <a class="chat-dropmenu__link" >Задача не выполнена</a>
                </li>
                <li v-if="customerTasks[currentCustomerTaskIndex].status.name === 'Выполнено' || customerTasks[currentCustomerTaskIndex].status.name === 'Не выполнено'"
                    @click="changeTaskStatus(7)">
                  <a class="chat-dropmenu__link" >Завершить задачу</a>
                </li>
                <li v-if="customerTasks[currentCustomerTaskIndex].status.name == 'Создано' || customerTasks[currentCustomerTaskIndex].status.name == 'Исполнитель выбран'"
                    @click="changeTaskStatus(2)">
                  <a class="chat-dropmenu__link" >Отменить задачу</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="chat__content">
          <div class="chat__messages">
            <div class="chat__message message"
                  :class="chatMessage.author.id === currentUserId ? 'message_owner' : 'message_another'"
                  v-for="(chatMessage, index) in chatMessages"
                  :key="index">
                <div class="message__body">
                  <div class="message__text">{{ chatMessage.text }}</div>
                  <div @click="deleteMessage(chatMessage.id, index)" class="message__delete"></div>
                </div>
                <div class="message__date">{{ chatMessage.created_at }} г.</div>
            </div>
          </div>
          <div class="chat__send-review send-review" 
               v-if="(customerTasks[currentCustomerTaskIndex].status.name == 'Выполнено' || customerTasks[currentCustomerTaskIndex].status.name == 'Не выполнено') 
                     && currentChat.isCustomerReviewAdded == false">
            <div class="send-review__title">Оставьте отзыв об исполнителе</div>
            <div class="send-review__content">
              <div class="send-review__form-group">
                <multiselect v-model="selectScoreTypesValue"
                              :options="selectScoreTypesOptions"
                              :label="'name'"
                              :canClear="false"
                              :valueProp="'id'"
                              :placeholder="'Укажите оценку'"/>
              </div>
              <div class="send-review__form-group">
                <textarea class="send-review__field" placeholder="Напишите отзыв ..." @keyup.enter="validateSendReviewField" v-model.trim="reviewText"></textarea>
              </div>
              <button class="send-review__btn btn btn_primary" @click="validateSendReviewField">Отправить</button>
            </div>
          </div>
        </div>
        <div class="chat__footer">
          <div class="chat__form-group chat__form-group_lg">
            <textarea class="chat__field" placeholder="Напишите сообщение ..." @keyup.enter="validateSendMessageField" v-model.trim="messageText"></textarea>
          </div>
          <button class="chat__btn btn" @click="validateSendMessageField">Отправить</button>
        </div>
      </div>
    </div>
    
    <div v-else class="chats__container chats__container_lg container" >
      <div class="chats__error chats__error_lg">Пока что чатов никаких нет, создайте задачу чтобы исполнители могли откликнуться на ваши услуги</div>
    </div>
  </div>
  <modal-component :text="modalText" 
                    :isShow="modalIsShow"
                    @close="modalIsShow = false"/>
</template>

<script>

import axios from 'axios';
import ModalComponent from '@/components/ModalComponent.vue';
import Multiselect from '@vueform/multiselect';

export default {
  name: "ChatsPage",
  mounted(){
    this.token = localStorage.getItem('token');
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.currentUserId = userInfo.id;
    this.getScoreTypes();
    this.getCustomerTasks();
  },
  data(){
    return{
      BASE_URL: "http://127.0.0.1:8000/api",
      token: null,
      isOpenChatDropMenu: false, 
      customerTasks: [],
      chats: [],
      chatMessages: [],
      
      modalText: '',
      modalIsShow:false,

      messageText: null,
      reviewText: null,

      currentUserId: null,
      currentChatId: null,
      currentCustomerTaskId: null,
      currentCustomerTaskIndex: null,
      currentChat: null,
      
      selectScoreTypesValue: 1,
      selectScoreTypesOptions: [],
    }
  },
  components:{
    ModalComponent,
    Multiselect
  },
  methods:{
    setCurrentTask(taskId, taskIndex){
      if(this.currentCustomerTaskId === taskId)
        return;
      this.currentChat = null;
      this.currentCustomerTaskId = taskId;
      this.currentCustomerTaskIndex = taskIndex;
      this.getCustomerChats();
    },
    setCurrentChat(chatId, chat){
      if(this.currentChatId === chatId)
        return;
      this.currentChatId = chatId;
      this.currentChat = chat;
      this.getChatMessages();
    },
    validateSendMessageField(){
      if(this.messageText == null)
        return;
      this.createChatMessage();
    },
    validateSendReviewField(){
      if(this.reviewText == null)
        return;
      this.createReview();
    },
    
    async createReview(){
      try{
        await axios.post('/review', 
              {
                comment: this.reviewText,
                score_type_id: this.selectScoreTypesValue,
                task_id: this.currentCustomerTaskId,
                customer_id: this.customerTasks[this.currentCustomerTaskIndex].customer_id,
                executor_id: this.customerTasks[this.currentCustomerTaskIndex].executor_id,
              },
              {
              headers:{
                'Accept': 'application/json',
                "Authorization": `Bearer ${this.token}`
              }
        });
        this.modalText = 'Отзыв успешно сохранён!';
        this.modalIsShow = true;
        this.reviewText = null;
        this.currentChat.isCustomerReviewAdded = true;
      } catch(error){
        console.log(error.response.data);
      }
    },

    openChatDropMenu(){
      if(this.isOpenChatDropMenu)
        this.isOpenChatDropMenu = false;
      else
        this.isOpenChatDropMenu = true;
    },
    hideChatDropMenu(){
      this.isOpenChatDropMenu = false;
    },
    async setExecutor(executorId){
      await axios.post('/task/' + this.currentCustomerTaskId + '/executor', 
            {
              executor_id: executorId,
            },
            {
              headers:{
                'Accept': 'application/json',
                "Authorization": `Bearer ${this.token}`
              }
      });
      this.changeTaskStatus(3);
    },
    
    async unsetExecutor(){
      await axios.post('/task/' + this.currentCustomerTaskId + '/delete-executor', {},
            {
              headers:{
                'Accept': 'application/json',
                "Authorization": `Bearer ${this.token}`
              }
      });
      this.changeTaskStatus(1);
    },

    async changeTaskStatus(taskStatusId, executorId = null){
      const params = {
        task_status : taskStatusId,
      }
      if(executorId)
        params.executor_id = executorId
      try{
        await axios.post('/task/' + this.currentCustomerTaskId + '/status', params,
          {
            headers:{
              'Accept': 'application/json',
              "Authorization": `Bearer ${this.token}`
            }
        });
        location.reload();
      } catch(error){
        console.log(error.response.data);
      }
    },
    
    async getCustomerTasks(){
      const res = await axios.get('/customer-tasks', {
            headers:{
              'Accept': 'application/json',
              "Authorization": `Bearer ${this.token}`
            }
          },
        );
      this.customerTasks = res.data;
      if(res.data.length > 0){
        this.currentCustomerTaskId = res.data[0].id;
        this.currentCustomerTaskIndex = 0;
      }
      this.getCustomerChats();
    },
    async getCustomerChats(){
      const res = await axios.get('/task/' + this.currentCustomerTaskId + '/chats', {
            headers:{
              'Accept': 'application/json',
              "Authorization": `Bearer ${this.token}`
            }
          },
        );
      this.chats = res.data;
      if(res.data.length > 0){
        this.currentChatId = res.data[0].id;
        this.currentChat = res.data[0];
        this.getChatMessages();
      }
    },
    async getChatMessages(){
      const res = await axios.get('/chat/' + this.currentChatId, {
            headers:{
              'Accept': 'application/json',
              "Authorization": `Bearer ${this.token}`
            }
          },
        );
      this.chatMessages = res.data;
    },

    async createChatMessage(){
      try{
          const res = await axios.post("/chat/" + this.currentChatId + '/message', 
            {
              text: this.messageText,
            },
            {
              headers:{
                'Accept': 'application/json',
                'Authorization': `Bearer ${this.token}`,
              }
          });
          this.messageText = null;
          this.chatMessages.push(res.data);
      } catch(error){
          console.log(error.response.data);
      }
    } ,
    
    async getScoreTypes(){
      const res = await axios.get('/score-types',
        {
          headers:{
            'Accept': 'application/json',
            'Authorization': `Bearer ${this.token}`,
          }
      });
      this.selectScoreTypesOptions = res.data;
    },
    async deleteMessage(messageId, messageIndex){
      try{
          await axios.delete("/chat/" + this.currentChatId + '/message/' + messageId, 
            {
              headers:{
                'Accept': 'application/json',
                'Authorization': `Bearer ${this.token}`,
              }
          });
          this.modalText = 'Сообщение успешно удалено!';
          this.modalIsShow = true;
          this.chatMessages.splice(messageIndex, 1);
      } catch(error){
          console.log(error.response.data);
      }
    }
  },
  validations () {
    return {
      // editTextMessage: { required: helpers.withMessage("Поле Напишите сообщение обязательно для заполнения", required),},
      // messageText: { required: helpers.withMessage("Поле Напишите сообщение обязательно для заполнения", required),},
      // reviewText: { required: helpers.withMessage("Поле Напишите отзыв обязательно для заполнения", required),},
    }
  }
};
</script>
