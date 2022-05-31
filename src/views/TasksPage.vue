<template>
  <div class="header">
    <div class="header__container container">
      <div class="header__logo logo">
        <img src="../assets/images/logo-sm.svg"/>
        <div class="logo__name">
          ADEX
        </div>
      </div>
      <div class="header__menu"></div>
      <div class="header__profile header-profile">
        <div class="header-profile__content"  @click="openDropMenu">
          <div class="header-profile__name">
            Иванов Иван
          </div>
          <div class="header-profile__img">
            <img src="../assets/images/user-logo.png">
          </div>
        </div>
        <div class="header-profile__dropmenu header-dropmenu" v-if="isOpenDropMenu">
          <div class="header-dropmenu__usertypes">
            <a class="header-dropmenu__usertype header-dropmenu__usertype_active">Исполнитель</a>
            <a class="header-dropmenu__usertype">Заказчик</a>
          </div>
          <ul class="header-dropmenu__list">
            <li>
              <a class="header-dropmenu__link">Профиль</a>
            </li>
            <li>
              <a class="header-dropmenu__link">Выход</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
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
          <!-- <a class="main-categories__category">
            Instagram
          </a>
          <a class="main-categories__category">
            Vk
          </a>
          <a class="main-categories__category">
            Instagram
          </a>
          <a class="main-categories__category">
            Vk
          </a>
          <a class="main-categories__category">
            Instagram
          </a>
          <a class="main-categories__category">
            Vk
          </a> -->
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
         <!-- <div class="main__task main-task">
           <div class="main-task__header">
             <div class="main-task__name">Make YouTube Video </div>
             <div class="main-task__categories">
               <div class="main-task__category task-category task-category_red">Youtube</div>
               <div class="main-task__category task-category task-category_blue">VK</div>
               <div class="main-task__category  task-category task-category_green">VK</div>
             </div>
             <div class="main-task__price">10 000 ₽</div>
           </div>
           <div class="main-task__content">
             <div class="main-task__description">Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem ...</div>
             <div class="main-task__time">11 дней</div>
           </div>
         </div>
         <div class="main__task main-task">
           <div class="main-task__header">
             <div class="main-task__name">Make YouTube Video</div>
             <div class="main-task__categories">
               <div class="main-task__category task-category task-category_red">Youtube</div>
               <div class="main-task__category task-category task-category_blue">VK</div>
               <div class="main-task__category  task-category task-category_green">VK</div>
             </div>
             <div class="main-task__price">10 000 ₽</div>
           </div>
           <div class="main-task__content">
             <div class="main-task__description">Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem ...</div>
             <div class="main-task__time">11 дней</div>
           </div>
         </div>
         <div class="main__task main-task">
           <div class="main-task__header">
             <div class="main-task__name">Make YouTube Video</div>
             <div class="main-task__categories">
               <div class="main-task__category task-category task-category_red">Youtube</div>
               <div class="main-task__category task-category task-category_blue">VK</div>
               <div class="main-task__category  task-category task-category_green">VK</div>
             </div>
             <div class="main-task__price">10 000 ₽</div>
           </div>
           <div class="main-task__content">
             <div class="main-task__description">Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.</div>
             <div class="main-task__time">11 дней</div>
           </div>
           <div class="main-task__response">
             <textarea class="main-task__response-field" placeholder="Оставьте отклик (напишите информацию о себе, какими навыками обладаете, чтобы заказчик выбрал именно вас)"></textarea>
             <button class="main-task__btn btn btn-primary">Отправить</button>
           </div>
         </div> -->
      </div>

    </div>
  </div>
  <div class="footer">
    <div class="footer__container container">
      <div class="footer__developers">
        <div class="footer__name">
          Разработано:
        </div>
        <div class="footer__logo logo">
          <img src="../assets/images/logo-sm-sm.svg"/>
          <div class="logo__name">
            ADEX
          </div>
        </div>
      </div>
      <div class="footer__site-name">
        www.adex.ru
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
    this.getPrices();
    this.getCategoryWorks();
    this.getTasks();
  },

  data(){
    return{
      isOpenDropMenu: false,
      priceSliderValues: [0,0],
      min: 0,
      max: 0,
      filterCategoryWorksId: 0,
      categoryWorks: [],
      tasks: [],
      selectedCategoriesWorks:[],

      token: "2|fsIfNetkvCNSZwFUp02iiPNS9kqd9IiPdhVtylRa",
      BASE_URL: "http://127.0.0.1:8000/api",
    }
  },
  methods:{
    ...mapGetters({getToken: 'getToken'}),
    openDropMenu(){
      if(this.isOpenDropMenu)
        this.isOpenDropMenu = false;
      else
        this.isOpenDropMenu = true;
    },
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
  // computed:{
  //   currentMin(){
  //     return this.min;
  //   },
  //   currentMax(){
  //     return this.max;
  //   },
  // },
  
  components:{
    Slider,
    TaskComponent,
  }
};
</script>
<style src="@vueform/slider/themes/default.css"></style>
<style src="@/assets/css/slider-styling.scss" lang="scss"></style>

