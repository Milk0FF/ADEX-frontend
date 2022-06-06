r<template>
  <div class="header">
    <div class="header__container container">
      <router-link :to="'/'" class="header__logo logo">
        <img src="../assets/images/logo-sm.svg"/>
        <div class="logo__name">
          ADEX
        </div>
      </router-link>
      <ul class="header__menu header-menu">
      </ul>
      <div class="header__profile header-profile" v-click-away="hideDropMenu">
        <div class="header-profile__content"  @click="openDropMenu">
          <div class="header-profile__name" v-if="userInfo !== null">
            <div v-if="userInfo.lastname == null || userInfo.lastname == null ">Незнакомец</div>
            <div v-else>{{userInfo.firstname + ' ' + userInfo.lastname}}</div>
          </div>
          <div class="header-profile__img" v-if="userInfo !== null">
            <img v-if="userInfo.avatar == null" src="../assets/images/no-image.jpg"/>
            <img v-else :src="userInfo.avatar"/>
          </div>
        </div>
        <div class="header-profile__dropmenu header-dropmenu" v-if="isOpenDropMenu">
          <div class="header-dropmenu__usertypes">
            <a class="header-dropmenu__usertype " 
               :class="userInfo.user_type == 1 ? 'header-dropmenu__usertype_active' : ''"  
               @click="changeUserType(1)">Исполнитель</a>
            <a class="header-dropmenu__usertype" 
               :class="userInfo.user_type == 2 ? 'header-dropmenu__usertype_active' : ''"
               @click="changeUserType(2)">Заказчик</a>
          </div>
          <div class="header-dropmenu__list">
            <a class="header-dropmenu__link" @click="moveToNewPage('/tasks')" v-if="userInfo.user_type == 2"  :class="$router.currentRoute.value.path == '/tasks' ? 'header-dropmenu__link_active' : ''">Задачи</a>
            <a class="header-dropmenu__link" @click="moveToNewPage('/')" v-else :class="$router.currentRoute.value.path == '/' ? 'header-dropmenu__link_active' : ''">Задачи</a>
            <a class="header-dropmenu__link" @click="moveToNewPage('/chats')" v-if="userInfo.user_type == 1" :class="$router.currentRoute.value.path == '/chats' ? 'header-dropmenu__link_active' : ''">Чаты</a>
            <a class="header-dropmenu__link" @click="moveToNewPage('/customer-chats')" v-else :class="$router.currentRoute.value.path == '/customer-chats' ? 'header-dropmenu__link_active' : ''">Чаты</a>
            <a class="header-dropmenu__link" @click="moveToNewPage('/personal-profile')" :class="$router.currentRoute.value.path == '/personal-profile' ? 'header-dropmenu__link_active' : ''">Профиль</a>
            <a class="header-dropmenu__link" @click="logout">Выход</a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <slot/>

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
  name: "MainLayout",
  mounted(){
    this.token = localStorage.getItem('token');
    this.getUserInfo();
  },
  data(){
    return{
      isOpenDropMenu: false,
      token: null,
      userInfo: null,
    }
  },
  methods:{
    openDropMenu(){
      if(this.isOpenDropMenu)
        this.isOpenDropMenu = false;
      else
        this.isOpenDropMenu = true;
    },
    hideDropMenu(){
      this.isOpenDropMenu = false;
    },
    moveToNewPage(route){
      this.isOpenDropMenu = false;
      this.$router.push(route);
    },
    logout(){
      localStorage.removeItem('token');
      localStorage.removeItem('userInfo');
      this.$router.push('/login');
    },
    changeUserType(userType){
      if(this.userInfo.user_type == userType)
        return;
      this.doChangeUserType(userType);
    },
    async getUserInfo(){
      try{
        const res = await axios.get("/user",
          {
            headers:{
              'Accept': 'application/json',
              "Authorization": `Bearer ${this.token}`
            }
        });
        this.userInfo = res.data;
        const userInfo = JSON.stringify(res.data);
        localStorage.setItem('userInfo', userInfo);

      } catch(error){
        console.log(error.response.data);
      }
    },
    async doChangeUserType(userType){
      try{
        await axios.post("/user/type",
          {
            user_type: userType
          },
          {
            headers:{
              'Accept': 'application/json',
              "Authorization": `Bearer ${this.token}`
            }
        });
        this.userInfo.user_type = userType;

        const userInfo = JSON.stringify(this.userInfo);

        localStorage.setItem('userInfo', userInfo);
        location.reload();
      } catch(error){
        console.log(error.response.data);
      }
    },
  },
};
</script>
