<template>
  <div class="profile">
    <div class="profile__container container">
      <div class="profile__sidebar profile-sidebar">
        <div class="profile-sidebar__avatar">
          <img v-if="userInfo.avatar == null" src="../assets/images/no-image.jpg"/>
          <img v-else :src="userInfo.avatar"/>

          <div v-if="userInfo.employment_type && userInfo.employment_type.name == 'Свободен'" class="profile-sidebar__status status status_green">Свободен</div>
          <div v-else class="profile-sidebar__status status status_red">Занят</div>
        </div>
        <div v-if="userInfo.firstname && userInfo.lastname" class="profile-sidebar__name">
          {{userInfo.firstname + ' ' + userInfo.lastname}}
        </div>
        <div v-else class="profile-sidebar__name">
          Незнакомец
        </div>
        <div class="profile-sidebar__line profile-line">
          <div class="profile-line__title">Город</div>
          <div v-if="userInfo.city" class="profile-line__name">{{ userInfo.city }}</div>
          <div v-else class="profile-line__name">Не указан</div>
        </div>
        <div class="profile-sidebar__line profile-line">
          <div class="profile-line__title">Страна</div>
          <div v-if="userInfo.country" class="profile-line__name">{{ userInfo.country }}</div>
          <div v-else class="profile-line__name">Не указана</div>
        </div>
        <div class="profile-sidebar__line profile-line">
          <div class="profile-line__title">О себе</div>
          <div v-if="userInfo.about" class="profile-line__name">{{ userInfo.about }}</div>
          <div v-else class="profile-line__name">Не указано</div>
        </div>
        <div class="profile-sidebar__categories" v-if="userInfo.categories">
          <div class="profile-sidebar__category task-category "
               v-for="category in userInfo.categories" 
               :key="category.id"
               :class="'task-category_' + category.color">{{ category.name }}</div>
        </div>
      </div>
      <div class="profile__content">
        <div class="profile__cards">
          <div class="profile__card profile-card profile-card_green">
            <div class="profile-card__info">
              <div v-if="userInfo.rating" class="profile-card__number">{{ userInfo.rating }}</div>
              <div v-else class="profile-card__number">0</div>
              <div class="profile-card__name">Рейтинг</div>
            </div>
            <div class="profile-card__statics">
              <div class="profile-card__column profile-card__column_start"></div>
              <div class="profile-card__column profile-card__column_middle"></div>
              <div class="profile-card__column profile-card__column_end"></div>
            </div>
          </div>
          <div class="profile__card profile-card profile-card_purple">
            <div class="profile-card__info">
              <div v-if="userInfo.success_reviews" class="profile-card__number">{{ userInfo.success_reviews }}</div>
              <div v-else class="profile-card__number">0</div>
              <div class="profile-card__name">Одобрен</div>
            </div>
            <div class="profile-card__statics">
              <div class="profile-card__column profile-card__column_start"></div>
              <div class="profile-card__column profile-card__column_middle"></div>
              <div class="profile-card__column profile-card__column_end"></div>
            </div>
          </div>
          
          <div class="profile__card profile-card profile-card_red">
            <div class="profile-card__info">
              <div v-if="userInfo.failed_reviews" class="profile-card__number">{{ userInfo.failed_reviews }}</div>
              <div v-else class="profile-card__number">0</div>
              <div class="profile-card__name">Отклонён</div>
            </div>
            <div class="profile-card__statics">
              <div class="profile-card__column profile-card__column_start"></div>
              <div class="profile-card__column profile-card__column_middle"></div>
              <div class="profile-card__column profile-card__column_end"></div>
            </div>
          </div>
        </div>
        <div class="profile__reviews profile-reviews">
          <h3 class="profile-reviews__title">Отзывы</h3>
          <div class="profile-reviews__user-types">
            <div class="profile-reviews__user-type" 
                :class=" userType == 1 ? 'profile-reviews__user-type_active' : ''"  
                @click="setUserType(1)">
              Исполнитель
            </div>
            <div class="profile-reviews__user-type"
                :class=" userType == 2 ? 'profile-reviews__user-type_active' : ''"  
                @click="setUserType(2)">
              Заказчик
            </div>
          </div>
          <div class="profile-reviews__body" v-if="reviews.length > 0">
            <div class="profile-reviews__review review" v-for="review in reviews" :key="review.id">
              <div class="review__score" :class="review.score == 'Негативно' ? 'review__score_negative' : ''">
                <img src="../assets/images/like.svg">
              </div>
              <div class="review__content" >
                <div class="review__info">
                  <div class="review__user-info">
                    <div class="review__avatar">
                      <img v-if="review.author.avatar == null" src="../assets/images/no-image.jpg"/>
                      <img v-else :src="review.author.avatar"/>
                    </div>
                    <a href="#" @click.prevent="changeProfile(review.author.username)" class="review__name">{{review.author.firstname +  ' ' + review.author.lastname}}</a>
                  </div>
                  <div class="review__text">
                    {{review.comment}}
                  </div>
                </div>
                <div class="review__date">{{review.created_at}} г</div>
              </div>
            </div>
          </div>
          <div v-else class="profile-reviews__error">Отзывов нет</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios';
export default {
  name: "ProfilePage",
  mounted(){
    this.token = localStorage.getItem('token');
    this.username = this.$route.params.username;
    this.getUserInfoByUsername();
  },
  data(){
    return{
      BASE_URL: "http://127.0.0.1:8000/api",
      token: null,
      userInfo: {},
      username: null,
      userType: 1,
      reviews: [],
    }
  },
  methods:{
    setUserType(userTypeValue){
      this.userType = userTypeValue;
      this.getReviews();
    },
    changeProfile(username){
      this.$router.push('/profile/' + username);
      this.username = username;
      this.getUserInfoByUsername();
    },
    async getReviews(){
      try{
        const res = await axios.get(this.BASE_URL + "/user-reviews", 
          {
            params:{
              user_id: this.userInfo.id,
              user_type: this.userType,
            },
            headers:{
              'Accept': 'application/json',
              "Authorization": `Bearer ${this.token}`
            },
        });
        this.reviews = res.data;

      } catch(error){
        console.log(error.response.data);
      }
    },
    
    async getUserInfoByUsername(){
      try{
        const res = await axios.get(this.BASE_URL + "/user/" + this.username,
          {
            headers:{
              'Accept': 'application/json',
              "Authorization": `Bearer ${this.token}`
            }
        });
        this.userInfo = res.data;
        this.getReviews();
      } catch(error){
        console.log(error.response.data);
      }
    },
     
  },
};
</script>
