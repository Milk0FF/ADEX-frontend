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
  <div class="profile">
    <div class="profile__container container">
      <div class="profile__sidebar profile-sidebar">
        <div class="profile-sidebar__avatar">
          <img v-if="userInfo.avatar == null" src="../assets/images/no-image.jpg"/>
          <img v-else :src="userInfo.avatar"/>

          <div v-if="userInfo.employment_type == 'Свободен'" class="profile-sidebar__status status status_green">Свободен</div>
          <div v-else class="profile-sidebar__status status status_red">Занят</div>
        </div>
        <div class="profile-sidebar__name">
          {{userInfo.firstname + ' ' + userInfo.lastname}}
        </div>
        <div class="profile-sidebar__line profile-line">
          <div class="profile-line__title">Город</div>
          <div class="profile-line__name">{{ userInfo.city }}</div>
        </div>
        <div class="profile-sidebar__line profile-line">
          <div class="profile-line__title">Страна</div>
          <div class="profile-line__name">{{ userInfo.country }}</div>
        </div>
        <div class="profile-sidebar__line profile-line">
          <div class="profile-line__title">О себе</div>
          <div class="profile-line__name">{{ userInfo.about }}</div>
        </div>
        <div class="profile-sidebar__categories" v-if="userInfo.categories">
          <div class="profile-sidebar__category task-category task-category_red"
               v-for="category in userInfo.categories" 
               :key="category.id"
               :class="'task-category' + category.color">{{ category.name }}</div>
        </div>
      </div>
      <div class="profile__content">
        <div class="profile__cards">
          <div class="profile__card profile-card profile-card_green">
            <div class="profile-card__info">
              <div class="profile-card__number">{{ userInfo.rating }}</div>
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
              <div class="profile-card__number">{{ userInfo.success_reviews }}</div>
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
              <div class="profile-card__number">{{ userInfo.failed_reviews }}</div>
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
                      <img src="../assets/images/user-logo.png">
                    </div>
                    <a href="#" class="review__name">{{review.author.firstname +  ' ' + review.author.lastname}}</a>
                  </div>
                  <div class="review__text">
                    {{review.comment}}
                  </div>
                </div>
                <div class="review__date">10.02.2020 г</div>
              </div>
            </div>
          </div>
          <div v-else class="profile-reviews__error">Отзывов нет</div>
        </div>
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
export default {
  name: "ProfilePage",
  mounted(){
    this.getUserInfo();
  },
  data(){
    return{
      isOpenDropMenu: false,
      BASE_URL: "http://127.0.0.1:8000/api",
      token: "1|yZwLvytMTyry2fCisN7xAFNkFOzSqcxviQUdUnte",
      userInfo: {},
      userType: 1,
      reviews: [],
    }
  },
  methods:{
    openDropMenu(){
      if(this.isOpenDropMenu)
        this.isOpenDropMenu = false;
      else
        this.isOpenDropMenu = true;
    },
    setUserType(userTypeValue){
      this.userType = userTypeValue;
      this.getReviews();
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
    
    async getUserInfo(){
      try{
        const res = await axios.get(this.BASE_URL + "/user",
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
    }  
  },
};
</script>
