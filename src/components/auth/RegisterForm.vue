<template>
  <form class="form" @submit.prevent="moveToLogin">
    <div class="container container_center">
      <div class="form__content">
        <div class="form__logo">
          <img src="../../assets/images/logo.svg">
        </div>
        <div class="form__title">
          Регистрация
        </div>
        <div class="form__text">
          Регистрируйтесь и начинайте обмениваться рекламой
        </div>
        <div class="form__inputs">
          <div class="form__input">
            <input type="text" placeholder="Email">
          </div>
          <div class="form__input">
            <input type="text" placeholder="Пароль">
          </div>
          <div class="form__input">
            <input type="text" placeholder="Подтверждение пароля">
          </div>
          <button class="form__btn btn btn-primary" type="submit">Зарегистрироваться</button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: "RegisterForm",
  methods:{
    moveToLogin(){
      this.$router.push('/login')
    }
  }
};
</script>
<style lang="scss" scoped>
  @import '../../assets/css/auth.scss';
</style>
