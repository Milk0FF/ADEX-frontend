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
        </div>
      </div>
      <div v-if="chats.length > 0" class="chats__sidebar chats-sidebar">
        <div  class="chats-sidebar__chat" 
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
              <div class="chat-user-info__task-name">{{ chat.task.name }}</div>
            </div>
          </div>
          <div class="chats-sidebar__date">
            {{ chat.created_at }} г.
          </div>
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
          <div class="chat__settings">
            <div class="chat__settings-content" @click="openChatDropMenu">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div class="chat__dropmenu chat-dropmenu" v-if="isOpenChatDropMenu">
              <ul class="chat-dropmenu__list">
                <li v-if="customerTasks[currentCustomerTaskIndex].status.name === 'Создано'">
                  <a class="chat-dropmenu__link">Назначить исполнителем</a>
                </li>
                <li v-if="customerTasks[currentCustomerTaskIndex].status.name === 'Исполнитель выбран'">
                  <a class="chat-dropmenu__link">Начать выполнение задачи</a>
                </li>
                <li v-if="customerTasks[currentCustomerTaskIndex].status.name === 'В процессе выполнения'">
                  <a class="chat-dropmenu__link">Завершить задачу</a>
                </li>
                <li v-if="customerTasks[currentCustomerTaskIndex].status.name === 'Выполнено'">
                  <a class="chat-dropmenu__link">Оставить отзыв</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="chat__content">
          <div class="chat__message "
                :class="chatMessage.author.id === currentUserId ? 'chat__message_owner' : 'chat__message_another'"
                v-for="chatMessage in chatMessages"
                :key="chatMessage.id">
              <div class="chat__text">{{ chatMessage.text }}</div>
              <div class="chat__date">{{ chatMessage.created_at }} г.</div>
          </div>
        </div>
        <div class="chat__footer">
          <div class="chat__form-group">
            <textarea class="chat__field" placeholder="Напишите сообщение ..." v-model="messageText"></textarea>
            <div class="chat__field-error" v-if="v$.messageText.$error">{{ v$.messageText.$errors[0].$message }}</div>
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
import useVuelidate from '@vuelidate/core'
import {required, helpers} from '@vuelidate/validators'

export default {
  name: "ChatsPage",
  setup(){
    return {v$: useVuelidate()}
  },
  mounted(){
    this.token = localStorage.getItem('token');
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.currentUserId = userInfo.id;
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
      currentUserId: null,
      currentChatId: null,
      currentCustomerTaskId: null,
      currentCustomerTaskIndex: null,
      currentChat: null,
    }
  },
  components:{
    ModalComponent,
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
      this.v$.messageText.$touch();
      if (this.v$.messageText.$error ){
        return;
      }
      this.createChatMessage();
    },
    openChatDropMenu(){
      if(this.isOpenChatDropMenu)
        this.isOpenChatDropMenu = false;
      else
        this.isOpenChatDropMenu = true;
    },
    async getCustomerTasks(){
      const res = await axios.get(this.BASE_URL + '/customer-tasks', {
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
      const res = await axios.get(this.BASE_URL + '/task/' + this.currentCustomerTaskId + '/chats', {
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
      const res = await axios.get(this.BASE_URL + '/chat/' + this.currentChatId, {
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
          const res = await axios.post(this.BASE_URL + "/chat/" + this.currentChatId + '/message', 
            {
              text: this.messageText,
            },
            {
              headers:{
                'Accept': 'application/json',
                'Authorization': `Bearer ${this.token}`,
              }
          });
          this.chatMessages.push(res.data);
      } catch(error){
          console.log(error.response.data);
      }
    } ,
  },
  validations () {
    return {
      messageText: { required: helpers.withMessage("Поле Напишите сообщение обязательно для заполнения", required),},
    }
  }
};
</script>
