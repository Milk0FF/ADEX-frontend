<template>
  <div class="page">
    <div class="page__header page-header">
      <div class="page-header__container container">
        <div class="page-header__logo">
          <img src="../assets/images/logo.svg"/>
          <div class="page-header__name">
            ADEX
          </div>
        </div>
        <div class="page-header__buttons">
          <router-link :to="'/login'" class="page-header__login-btn">Авторизоваться</router-link>
          <router-link :to="'/register'" class="page-header__register-btn btn btn_sm">Зарегистироваться</router-link>
        </div>
      </div>
    </div>
    <slot/>
  </div>
</template>

<script>
export default {
  name: "PresentationLayout",
  mounted(){
    // const pageHeader = document.querySelector('.page-header');
    window.addEventListener('scroll', function(){
        console.log(this.window.scrollX);
    });
  },
  data(){
    return {
    }
  },
  methods:{
  },
};
</script>
