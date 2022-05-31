<template>
  <div class="main__task main-task">
    <div class="main-task__body" @click="expandTask">
      <div class="main-task__header">
        <div class="main-task__name">{{name}} </div>
        <div class="main-task__categories">
          <div class="main-task__category task-category " 
              :class="'task-category_' + category.color" 
              v-for="category in categories" 
              :key="category.id">
            {{category.name}}
          </div>
          <!-- <div class="main-task__category task-category task-category_red">Youtube</div>
          <div class="main-task__category task-category task-category_blue">VK</div>
          <div class="main-task__category  task-category task-category_green">VK</div> -->
        </div>
        <div class="main-task__price">{{price}} ₽</div>
      </div>
      <div class="main-task__content">
        <div class="main-task__description">{{description}}</div>
        <div class="main-task__time">11 дней</div>
      </div>
    </div>
    <div class="main-task__response" v-if="isExpandedTask">
      <textarea class="main-task__response-field" v-model.trim="text" placeholder="Оставьте отклик (напишите информацию о себе, какими навыками обладаете, чтобы заказчик выбрал именно вас)"></textarea>
      <!-- <button class="main-task__btn btn btn-primary" @click="createChat">Отправить</button> -->
      <button class="main-task__btn btn" @click="createChat">Отправить</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "TaskComponent",
  mounted(){
    this.token = localStorage.getItem('token');
  },
  data(){
    return{
      BASE_URL: "http://127.0.0.1:8000/api",
      text: null,
      isExpandedTask: false,
      token: null,
    }
  },
  methods:{
    expandTask(){
      if(this.isExpandedTask){
        this.isExpandedTask = false;
      }
      else
        this.isExpandedTask = true;
    },
    getInfo(){
      console.log("Customer_id", this.customerId, "Task_id", this.id, "Text", this.text);
    },
    async createChat(){
      try{
          await axios.post(this.BASE_URL + "/chat", {
              customer_id: this.customerId,
              task_id: this.id,
              text: this.text,
            },
            {
              headers:{
                'Accept': 'application/json',
                "Authorization": `Bearer ${this.token}`
              }
          });
          this.$emit('responseSended');
      } catch(error){
          console.log(error.response.data);
          // const status = error.response.status;
          // if(status === 400){
          //   this.error = 'Пользователя с таким email не существует';
          //   return;
          // }
          // if(status === 422){
          //   this.error = 'Пароль введён неверно'
          //   return;
          // }
          // if(status === 500){
          //   this.error = 'Ошибка сервера';
          //   return;
          // }
      }
    } 
  },
  props:{
    id: {
      type: Number,
      default: 0,
    },
    customerId:{
      type: Number,
      default: 0,
    },
    price:{
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    description:{
      type: String,
      default: '',
    },
    categories:{
      type: Array,
      default: () => {
        return []
      }
    }
  }
};
</script>