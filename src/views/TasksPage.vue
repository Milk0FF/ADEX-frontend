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
            <!-- main-categories__category_active -->
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
      <div class="main__tasks">
        <task-component v-for="task in tasks" 
                        :key="task.id" 
                        :id="task.id" 
                        :name="task.name" 
                        :description="task.description" 
                        :price="task.price" 
                        :customerId="task.customer_id" 
                        :categories="task.categories"
                        @responseSended="openModal"/>
      </div>

    </div>
  </div>
</template>

<script>

import axios from 'axios';
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
    }
  },
  methods:{
    ...mapGetters({getToken: 'getToken'}),
    
    openModal(){
      console.log('Отклик отправлен!');
    },
    setFilterCategoryWorks(id){
      this.filterCategoryWorksId = id;
      this.getTasks();
    },
    async getPrices(){
      const res = await axios.get(this.BASE_URL + '/tasks/prices',
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
      const res = await axios.get(this.BASE_URL + '/category-works',
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
      console.log(params);

      const res = await axios.get(this.BASE_URL + '/tasks', {
            params: params,
            headers:{
              'Accept': 'application/json',
              "Authorization": `Bearer ${this.token}`
            }
          },
        );
      console.log(res.data);
      this.tasks = res.data;
    },

  },
  components:{
    Slider,
    TaskComponent,
  }
};
</script>
<style src="@vueform/slider/themes/default.css"></style>
<style src="@/assets/css/slider-styling.scss" lang="scss"></style>

