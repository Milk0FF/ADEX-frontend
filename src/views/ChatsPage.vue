<template>
  <div class="chats">
    <div v-if="chats.length > 0" class="chats__container container">
      <div class="chats__sidebar chats-sidebar" >
        <div class="chats-sidebar__chat" 
              v-for="chat in chats" 
              :key="chat.id" 
              :class="currentChatId == chat.id ? 'chats-sidebar__chat_active' : ''" 
              @click="setCurrentChat(chat.id, chat)">
          <div class="chats-sidebar__user-info chat-user-info">
            <div class="chat-user-info__avatar">
              <img v-if="chat.customer.avatar == null" src="../assets/images/no-image.jpg"/>
              <img v-else :src="chat.customer.avatar"/>
            </div>
            <div class="chat-user-info__info">
              <div class="chat-user-info__name">{{ chat.customer.firstname + ' ' + chat.customer.lastname }}</div>
              <div class="chat-user-info__task-name">{{ chat.task.name }}</div>
            </div>
          </div>
          <div class="chats-sidebar__status task-status">{{ currentChat.task.status.name}}</div>
        </div>
      </div>  
      <div class="chats__chat chat" v-if="currentChat !== null">
        <div class="chat__header">
        <div class="chat__user-info chat-user-info">
          <a href="#" class="chat-user-info__avatar">
            <img v-if="currentChat.customer.avatar == null" src="../assets/images/no-image.jpg"/>
            <img v-else :src="currentChat.customer.avatar"/>
          </a>
          <div class="chat-user-info__info">
            <router-link :to="'/profile/' + currentChat.customer.username" class="chat-user-info__name">{{ currentChat.customer.firstname + ' ' + currentChat.customer.lastname }}</router-link>
            <div class="chat-user-info__task-name">{{ currentChat.task.name }}</div>
          </div>
        </div>
        </div>
        <div class="chat__content">
          <div class="chat__messages">
            <div class="chat__message "
                  :class="chatMessage.author.id === currentUserId ? 'chat__message_owner' : 'chat__message_another'"
                  v-for="chatMessage in chatMessages"
                  :key="chatMessage.id">
              <div class="chat__text">
                {{ chatMessage.text }}
                <div class="chat__context-options chat-context-options">
                  <div class="chat-context-options__delete"></div>
                  <div class="chat-context-options__edit"></div>
                </div>
              </div>
              <div class="chat__date">{{ chatMessage.created_at }} г.</div>
            </div>
          </div>
          <div class="chat__send-review send-review" 
               v-if="(currentChat.task.status.name == 'Выполнено' || currentChat.task.status.name == 'Не выполнено') 
                     && currentChat.isExecutorReviewAdded == false">
            <div class="send-review__title">Оставьте отзыв о заказчике</div>
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
                <textarea class="send-review__field" placeholder="Напишите отзыв ..." v-model="reviewText"></textarea>
                <div class="send-review__field-error" v-if="v$.reviewText.$error">{{ v$.reviewText.$errors[0].$message }}</div>
              </div>
              <button class="send-review__btn btn btn_primary" @click="validateSendReviewField">Отправить</button>
            </div>
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
    <div v-else class="chats__container container">
      <div class="chats__error chats__error_lg">Пока что чатов никаких нет, откликнитесь на задачу чтобы начать работать с заказчиками</div>
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

    this.getScoreTypes();
    this.getExecutorChats();
  },
  data(){
    return{
      BASE_URL: "http://127.0.0.1:8000/api",
      token: null,

      chats: [],
      chatMessages: [],
      
      modalText: '',
      modalIsShow:false,

      selectScoreTypesValue: 1,
      selectScoreTypesOptions: [],

      reviewText: null,
      messageText: null,
      currentUserId: null,
      currentChatId: null,
      currentChat: null,
    }
  },
  components:{
    ModalComponent,
    Multiselect
  },
  methods:{
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
    validateSendReviewField(){
      this.v$.reviewText.$touch();
      if (this.v$.reviewText.$error){
        return;
      }
      this.createReview();
    },

    async createReview(){
      try{
        await axios.post(this.BASE_URL + '/review', 
              {
                comment: this.reviewText,
                score_type_id: this.selectScoreTypesValue,
                task_id: this.currentChat.task.id,
                customer_id: this.currentChat.task.customer_id,
                executor_id: this.currentChat.task.executor_id,
              },
              {
              headers:{
                'Accept': 'application/json',
                "Authorization": `Bearer ${this.token}`
              }
        });
        this.modalText = 'Отзыв успешно сохранён!';
        this.modalIsShow = true;
        this.currentChat.isExecutorReviewAdded = true;
      } catch(error){
        console.log(error);
      }
    },
    async getExecutorChats(){
      const res = await axios.get(this.BASE_URL + '/chats', {
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
          this.messageText = '';
          this.chatMessages.push(res.data);
      } catch(error){
          console.log(error.response.data);
      }
    } ,
    
    async getScoreTypes(){
      const res = await axios.get(this.BASE_URL + '/score-types',
        {
          headers:{
            'Accept': 'application/json',
            'Authorization': `Bearer ${this.token}`,
          }
      });
      this.selectScoreTypesOptions = res.data;
    },
  },
  validations () {
    return {
      messageText: { required: helpers.withMessage("Поле Напишите сообщение обязательно для заполнения", required),},
      reviewText: { required: helpers.withMessage("Поле Напишите отзыв обязательно для заполнения", required),},
    }
  }
};
</script>
