<template>
  <div class="main">
    <div class="main__container container container_column">
      <div class="main__filters">
        <div class="main__categories main-categories">
          <a class="main-categories__category" 
              :class="filterCategoryWorksId === 0 ? 'main-categories__category_active' : ''" 
              @click="setFilterCategoryWorks(0)">
              Все
          </a>
          <a class="main-categories__category" 
              v-for="categoryWork in categoryWorks" 
              :key="categoryWork.id" 
              :class="filterCategoryWorksId === categoryWork.id ? 'main-categories__category_active' : ''" 
              @click="setFilterCategoryWorks(categoryWork.id)"> 
            {{categoryWork.name}}
          </a>
        </div>
        <div class="main__price-slider price-slider">
          <div class="price-slider__price">Цена ( ₽ )</div>
            <slider v-model="priceSliderValues"
                    :min="min"
                    :max="max"
                    :tooltipPosition="'bottom'"
                    :step="10"
                    :format="{thousand: '.'}"
                    class="price-slider__slider"
                    @update="getTasks"
                    />

        </div>
      </div>
      <div v-if="tasks.length > 0" class="main__tasks">
        <task-component v-for="(task, index) in tasks" 
                        :key="index" 
                        :id="task.id" 
                        :name="task.name" 
                        :description="task.description" 
                        :price="task.price" 
                        :customerId="task.customer_id" 
                        :categories="task.categories"
                        @responseSended="deleteTask(index)"/>
      </div>
      
      <div v-else class="main__tasks">
        <div class="main__error">Задачи не найдены!</div>
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
import Slider from '@vueform/slider'
import TaskComponent from '@/components/tasks/TaskComponent.vue'
import {mapGetters} from 'vuex'


export default {
  name: "TasksPage",
  mounted(){
    this.token = localStorage.getItem('token');
    
    this.getPrices();
    this.getCategoryWorks();
    this.getTasks();
  },

  data(){
    return{
      priceSliderValues: [0,0],
      min: 0,
      max: 0,
      filterCategoryWorksId: 0,
      categoryWorks: [],
      tasks: [],
      selectedCategoriesWorks:[],
      token: null,
      BASE_URL: "http://127.0.0.1:8000/api",
      modalText: 'Отклик успешно отправлен!',
      modalIsShow: false,
    }
  },
  methods:{
    ...mapGetters({getToken: 'getToken'}),
    
    setFilterCategoryWorks(id){
      this.filterCategoryWorksId = id;
      this.getTasks();
    },
    deleteTask(taskIndex){
      this.modalIsShow = true;
      this.tasks.splice(taskIndex, 1);
    },
    async getPrices(){
      const res = await axios.get('/tasks/prices',
        {
          headers:{
            'Accept': 'application/json',
            'Authorization': `Bearer ${this.token}`
          }
      });
      const min = parseInt(res.data.min_price);
      const max = parseInt(res.data.max_price); 
      this.min = min;
      this.max = max;
      this.priceSliderValues = [min, max];

    },

    async getCategoryWorks(){
      const res = await axios.get('/category-works',
        {
          headers:{
            'Accept': 'application/json',
            'Authorization': `Bearer ${this.token}`
          }
      });
      this.categoryWorks = res.data;
    },
    async getTasks(){
      let params = {}
      if(this.priceSliderValues[0] !== 0)
        params.price_start = this.priceSliderValues[0];

      if(this.priceSliderValues[0] !== 0)
        params.price_end = this.priceSliderValues[1];

      if(this.filterCategoryWorksId !== 0)
        params.categories = [this.filterCategoryWorksId];

      const res = await axios.get('/tasks', {
            params: params,
            headers:{
              'Accept': 'application/json',
              "Authorization": `Bearer ${this.token}`
            }
          },
        );
      this.tasks = res.data;
    },

  },
  components:{
    Slider,
    TaskComponent,
    ModalComponent,
  }
};
</script>
<style src="@vueform/slider/themes/default.css"></style>
<style src="@/assets/css/slider-styling.scss" lang="scss"></style>

