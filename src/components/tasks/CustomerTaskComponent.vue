<template>
  <div class="tasks-content__task main-task main-task_full">
    <div class="main-task__body" @click="expandTask">
      <div class="main-task__header">
        <div class="main-task__name">{{name}}</div>
        <div class="main-task__categories">
          <div class="main-task__category task-category " 
              :class="'task-category_' + category.color" 
              v-for="category in taskCategories" 
              :key="category.id">
            {{category.name}}
          </div>
        </div>
        <div class="main-task__price">{{ price }} ₽</div>
      </div>
      <div class="main-task__content">
        <div class="main-task__description">{{ description }}</div>
        <div class="main-task__status">{{ taskStatus.name }}</div>
      </div>
    </div>
    <form class="main-task__form" v-if="isExpandedTask">
        <h3 class="main-task__title">Редактирование задачи</h3>
        <div class="main-task__fields">
          <div class="main-task__field field field_sm">
            <div class="field__content">
              <div class="field__title">Название</div>
              <input class="field__input" type="text" placeholder="Название" v-model="senderName">
            </div>
            <div class="field__error" v-if="v$.senderName.$error">{{ v$.senderName.$errors[0].$message }}</div>
          </div>
          <div class="main-task__field field field_sm">
            <div class="field__content">
              <div class="field__title">Цена (можно не указывать)</div>
              <input class="field__input" type="text" placeholder="Цена" v-model="senderPrice">
            </div>
            <div class="field__error" v-if="v$.senderPrice.$error">{{ v$.senderPrice.$errors[0].$message }}</div>
          </div>
          <div class="main-task__field field">
            <div class="field__content">
              <div class="field__title">Описание</div>
              <input class="field__input" type="text" placeholder="Описание" v-model="senderDescription">
            </div>
            <div class="field__error" v-if="v$.senderDescription.$error">{{ v$.senderDescription.$errors[0].$message }}</div>
          </div>
          <div class="main-task__field field field_sm">
            <div class="field__content">
              <div class="field__title">Дата окончания</div>
              <input class="field__input" type="date" placeholder="Дата окончания" v-model="senderDateEnd">
            </div>
            <div class="field__error" v-if="v$.senderDateEnd.$error">{{ v$.senderDateEnd.$errors[0].$message }}</div>
          </div>
          <div class="main-task__field field field_sm">
            <div class="field__content">
              <div class="field__title">Статус задачи</div>
                <multiselect v-model="selectTaskStatusValue"
                              :options="selectTaskStatusOptions"
                              :label="'name'"
                              :canClear="false"
                              :valueProp="'id'"
                              :placeholder="'Укажите статус задачи'"/>
            </div>
          </div>
          <div class="main-task__field field">
            <div class="field__content">
              <div class="field__title">Категории</div>
                <multiselect v-model="selectCategoriesValue"
                              :mode="'tags'"
                              :options="selectCategoriesOptions"
                              :label="'name'"
                              :valueProp="'id'"
                              :placeholder="'Укажите категории рекламы'"/>
            </div>
          </div>
        </div>
      <button class="main-task__btn btn btn_primary" @click.prevent="validateEditTaskFields">Изменить</button>
    </form>
  </div>
</template>

<script>

import axios from 'axios';
import Multiselect from '@vueform/multiselect';
import useVuelidate from '@vuelidate/core';
import {required, helpers, numeric } from '@vuelidate/validators';

export default {
  name: "CustomerTaskComponent",
  setup(){
    return {v$: useVuelidate()}
  },
  mounted(){
    this.selectTaskStatusOptions = this.statuses;
    this.selectCategoriesOptions = this.categoryWorks;
    
    this.selectTaskStatusValue = this.taskStatus.id;
    this.taskCategories.forEach(category => {
      this.selectCategoriesValue.push(category.id);
    });

    this.senderName = this.name;
    this.senderPrice = this.price;
    this.senderDescription = this.description;
    this.senderDateEnd = this.dateEnd;
  },
  data(){
    return{
      token: "1|4vepAHf3tvM9hqRGQCOinrrV9urGB5tWusKWdCHi",
      BASE_URL: "http://127.0.0.1:8000/api",

      isExpandedTask: false,
      senderName: null,
      senderPrice: null,
      senderDescription: null,
      senderDateEnd: null,

      selectTaskStatusValue: 0,
      selectTaskStatusOptions: [],

      selectCategoriesValue: [],
      selectCategoriesOptions: [],
    }
  },
  components:{
    Multiselect,
  },
  props:{
    id: {
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
    dateEnd:{
      type: String,
      default: '',
    },
    taskStatus:{
      type: Object,
      default: () => {
        return {}
      }
    },
    taskCategories:{
      type: Array,
      default: () => {
        return []
      }
    },
    categoryWorks:{
      type: Array,
      default: () => {
        return []
      }
    },
    statuses:{
      type: Array,
      default: () => {
        return []
      }
    },
  },
  methods:{
    expandTask(){
      if(this.isExpandedTask){
        this.isExpandedTask = false;
      }
      else
        this.isExpandedTask = true;
    },
    
    validateEditTaskFields(){
      this.v$.senderName.$touch();
      this.v$.senderPrice.$touch();
      this.v$.senderDescription.$touch();
      this.v$.senderDateEnd.$touch();
      if (this.v$.senderName.$error || this.v$.senderPrice.$error || this.v$.senderDescription.$error || this.v$.senderDateEnd.$error){
        console.log('Проверку не прошли!');
        return;
      }
      console.log('Проверку прошли!');
      this.updateTask();
    },

    async updateTask(){
      try{
          const res = await axios.put(this.BASE_URL + "/task/" + this.id, {
              name: this.senderName,
              price: this.senderPrice,
              status: this.selectTaskStatusValue,
              description: this.senderDescription,
              categories: this.selectCategoriesValue,
            },
            {
              headers:{
                'Accept': 'application/json',
                "Authorization": `Bearer ${this.token}`
              }
          });
          console.log(res);
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
    },
  },
  validations () {
    return {
      senderName: { required: helpers.withMessage("Поле Название обязательно для заполнения", required),},
      senderPrice: { numeric: helpers.withMessage("Поле Цена заполнено неверно", numeric)  },
      senderDescription: { required: helpers.withMessage("Поле Описание обязательно для заполнения", required)},
      senderDateEnd: { required: helpers.withMessage("Поле Дата окончания обязательно для заполнения", required)  },
    }
  },
};
</script>