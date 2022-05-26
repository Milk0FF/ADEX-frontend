<template>
  <form class="form" @submit.prevent="moveToRegister">
    <div class="container container_center">
      <div class="form__content">
        <div class="form__logo">
          <img src="../../assets/images/logo.svg">
        </div>
        <div class="form__title">
          Авторизация
        </div>
        <div class="form__text">
          Авторизуйтесь и начните обмениваться рекламой
        </div>
        <div class="form__inputs">
          <div class="form__input">
            <input type="text" placeholder="Email">
          </div>
          <div class="form__input">
            <input type="text" placeholder="Пароль">
          </div>
          <button class="form__btn btn" type="submit">Авторизоваться</button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: "LoginForm",
  
  methods:{
    moveToRegister(){
      this.$router.push('/register')
    }
  }
};
</script>
<style lang="scss" scoped>
  @import '../../assets/css/auth.scss';
</style>
