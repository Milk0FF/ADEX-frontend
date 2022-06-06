<template>
  <div class="tasks">
    <div class="tasks__container container">
      <div class="tasks__sidebar tasks-sidebar">
        <h3 class="tasks-sidebar__title">Создать задачу</h3>
        <form class="tasks-sidebar__form">
          <div class="tasks-sidebar__field field">
            <div class="field__content">
              <div class="field__title">Название</div>
              <input class="field__input" type="text" placeholder="Название" v-model="name">
            </div>
            <div class="field__error" v-if="v$.name.$error">{{ v$.name.$errors[0].$message }}</div>
          </div>
          <div class="tasks-sidebar__field field">
            <div class="field__content">
              <div class="field__title">Цена (можно не указывать)</div>
              <input class="field__input" type="text" placeholder="Цена" v-model="price">
            </div>
            <div class="field__error" v-if="v$.price.$error">{{ v$.price.$errors[0].$message }}</div>
          </div>
          <div class="tasks-sidebar__field field">
            <div class="field__content">
              <div class="field__title">Описание</div>
              <input class="field__input" type="text" placeholder="Описание" v-model="description">
            </div>
            <div class="field__error" v-if="v$.description.$error">{{ v$.description.$errors[0].$message }}</div>
          </div>
          <div class="tasks-sidebar__field field">
            <div class="field__content">
              <div class="field__title">Дата окончания</div>
              <input class="field__input" type="date" placeholder="Дата окончания" v-model="dateEnd">
            </div>
            <div class="field__error" v-if="v$.dateEnd.$error">{{ v$.dateEnd.$errors[0].$message }}</div>
          </div>
          <div class="tasks-sidebar__field field">
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
          <button class="tasks-sidebar__btn btn btn_primary" @click.prevent="validateCreateTaskFields">Создать</button>
        </form>
        
      </div>
      <div class="tasks__content tasks-content">
        <h3 class="tasks-content__title">Текущие задачи</h3>
        <div class="tasks-content__tasks" v-if="tasks.length > 0">
          <customer-task-component v-for="task in tasks" 
                                    :key="task.id" 
                                    :price="task.price" 
                                    :id="task.id"
                                    :name="task.name"  
                                    :dateEnd="task.date_end"
                                    :description="task.description" 
                                    :taskStatus="task.status"
                                    :taskCategories="task.categories" 
                                    :categoryWorks="categoryWorks" 
                                    :statuses="taskStatuses"
                                    @taskUpdated="modalOpenWhenTaskUpdated"/>
        </div>
        <div class="tasks-content__tasks" v-else>
          <div class="tasks-content__error">
            Текущих задач нет, создайте новую
          </div>
        </div>
      </div>
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
import CustomerTaskComponent from '@/components/tasks/CustomerTaskComponent.vue';
import useVuelidate from '@vuelidate/core';
import {required, helpers, numeric } from '@vuelidate/validators';

export default {
  name: "CustomerTasksPage",
  setup(){
    return {v$: useVuelidate()}
  },
  mounted(){
    this.token = localStorage.getItem('token');
    this.getCategoryWorks();
    this.getTaskStatuses();
    this.getCustomerTasks();
  },
  data(){
    return{
      BASE_URL: "http://127.0.0.1:8000/api",
      token: null,

      name: null,
      price: null,
      description: null,
      dateEnd: null,
      tasks: [],
      taskStatuses: [],

      modalText: '',
      modalIsShow:false,

      categoryWorks: [],

      selectCategoriesValue: null,
      selectCategoriesOptions: [],
    }
  },
  components:{
    Multiselect,
    CustomerTaskComponent,
    ModalComponent,
  },
  methods:{
    modalOpenWhenTaskUpdated(){
      this.modalText= 'Задача успешно изменена!';
      this.modalIsShow= true;
    },
    validateCreateTaskFields(){
      this.v$.name.$touch();
      this.v$.price.$touch();
      this.v$.description.$touch();
      this.v$.dateEnd.$touch();
      if (this.v$.name.$error || this.v$.price.$error || this.v$.description.$error || this.v$.dateEnd.$error){
        return;
      }
      this.createTask();
    },

    async getCategoryWorks(){
      const res = await axios.get('/category-works',
        {
          headers:{
            'Accept': 'application/json',
            'Authorization': `Bearer ${this.token}`,
          }
      });
      this.categoryWorks = res.data; 
      res.data.forEach(category => {
        this.selectCategoriesOptions.push(category)
      });
    },

    async getCustomerTasks(){
      const res = await axios.get('/customer-tasks', {
            headers:{
              'Accept': 'application/json',
              "Authorization": `Bearer ${this.token}`
            }
          },
        );
      this.tasks = res.data;
    },

    async createTask(){
      try{
          const res = await axios.post("/task", {
              name: this.name,
              price: this.price,
              description: this.description,
              date_end: this.dateEnd,
              categories: this.selectCategoriesValue,
            },
            {
              headers:{
                'Accept': 'application/json',
                "Authorization": `Bearer ${this.token}`
              }
          });
          this.modalText = 'Задача успешно создана!';
          this.modalIsShow = true;
          this.tasks.push(res.data);
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
    async getTaskStatuses(){
      const res = await axios.get('/tasks/statuses',
        {
          headers:{
            'Accept': 'application/json',
            'Authorization': `Bearer ${this.token}`,
          }
      });
      this.taskStatuses = res.data;
    },
  },
  validations () {
    return {
      name: { required: helpers.withMessage("Поле Название обязательно для заполнения", required),},
      price: { numeric: helpers.withMessage("Поле Цена заполнено неверно", numeric)  },
      description: { required: helpers.withMessage("Поле Описание обязательно для заполнения", required)},
      dateEnd: { required: helpers.withMessage("Поле Дата окончания обязательно для заполнения", required)  },
    }
  },
};
</script>
