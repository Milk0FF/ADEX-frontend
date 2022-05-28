<template>
  <div class="auth">
    <div class="auth-header">
      <div class="auth-header__container container">
        <div class="auth-header__logo">
          <img src="../assets/images/logo.svg"/>
          <div class="auth-header__name">
            ADEX
          </div>
        </div>
      </div>
    </div>
    <div class="auth__content auth-content">
      <div class="auth-content__container container container_center">
        <div class="auth-content__body">
          <div class="auth-content__logo">
            <img src="../assets/images/logo.svg">
          </div>
          <div class="auth-content__title">
            Авторизация
          </div>
          <div class="auth-content__text">
            Авторизуйтесь и начните обмениваться рекламой
          </div>
          <form class="auth-content__form auth-form" @submit.prevent="moveToRegister">
            <div class="auth-form__inputs">
              <div class="auth-form__input">
                <input type="text" placeholder="Email">
              </div>
              <div class="auth-form__input">
                <input type="text" placeholder="Пароль">
              </div>
              <router-link class="auth-form__link" :to="'/register'">Уже есть аккаунт? Зарегистрируйтесь</router-link>
              <button class="auth-form__btn btn" type="submit">Авторизоваться</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
  methods:{
    moveToRegister(){
      this.$router.push('/register');
    }
  }
};
</script>
