<template>
  <div class="auth-content__body">
    <div class="auth-content__logo">
      <img src="../assets/images/logo.svg">
    </div>
    <div class="auth-content__title">
      Регистрация
    </div>
    <div class="auth-content__text">
      Зарегистрируйтесь и начните обмениваться рекламой
    </div>
    <form class="auth-content__form auth-form" @submit.prevent="validateForm">
      <div class="auth-form__inputs">
        <div class="auth-form__input" :class="v$.email.$error ? 'auth-form__input_error' : ''">
          <input type="text" placeholder="Email" v-model.trim="email">
          <div class="auth-form__error" v-if="v$.email.$error"> {{ v$.email.$errors[0].$message }} </div>
        </div>
        <div class="auth-form__input" :class="v$.password.$error ? 'auth-form__input_error' : ''">
          <input type="password" placeholder="Пароль" v-model.trim="password">
          <div class="auth-form__error" v-if="v$.password.$error"> {{ v$.password.$errors[0].$message }} </div>
        </div>
        <div class="auth-form__input" :class="v$.repeatPassword.$error ? 'auth-form__input_error' : ''">
          <input type="password" placeholder="Подтверждение пароля" v-model.trim="repeatPassword">
          <div class="auth-form__error" v-if="v$.repeatPassword.$error"> {{ v$.repeatPassword.$errors[0].$message }} </div>
        </div>
        <div class="auth-form__error" v-if="error !== ''"> {{ error }} </div>
        <router-link class="auth-form__link" :to="'/login'">Уже есть аккаунт? Авторизуйтесь</router-link>
        <button class="auth-form__btn btn" type="submit">Зарегистрироваться</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import useVuelidate from '@vuelidate/core'
import {required, email, minLength, sameAs, helpers } from '@vuelidate/validators'
export default {
  name: "RegisterPage",
  setup(){
    return {v$: useVuelidate()}
  },
  data(){
    return {
      email: null,
      password: null,
      repeatPassword: null,
      error: '',
      BASE_URL: "http://127.0.0.1:8000/api",
    }
  },
  methods:{
    moveToLogin(){
      this.$router.push('/login');
    },
    validateForm(){
      this.v$.$touch();
      if (this.v$.password.$error || this.v$.email.$error || this.v$.repeatPassword.$error){
        return;
      }
      this.register();
    },
    async register(){
      this.error = '';
      try{
        let res = await axios.post(this.BASE_URL + "/user/register", {
            email: this.email,
            password: this.password,
            repeat_password: this.repeatPassword,
            user_type: "1",
          }, 
          {
            headers: {
              'Accept': 'application/json',
            }
        })
        localStorage.setItem("token", res.data.token);
        let userInfo = {
          user_type: res.data.user_type,
        }
        userInfo = JSON.stringify(userInfo);
        localStorage.setItem('userInfo', userInfo);
        this.$router.push('/');
      } catch (error){
        const status = error.response.status;
        if(status === 400){
          this.error = 'Пользователь с таким email уже существует!';
          return;
        }
        if(status === 500){
          this.error = 'Ошибка сервера';
          return;
        }
      }
    }
  },
  validations () {
    return {
      email: { required: helpers.withMessage("Поле Email обязательно для заполнения", required), email: helpers.withMessage("Поле Email заполнено неверно", email), },
      password: { required: helpers.withMessage("Поле Пароль обязательно для заполнения", required), minLength: helpers.withMessage("Поле Пароль не должно быть меньше 6 символов", minLength(6)) },
      repeatPassword: { required: helpers.withMessage("Поле Подтверждение пароля обязательно для заполнения", required), sameAs: helpers.withMessage("Пароли не совпадают", sameAs(this.password)) },
    }
  }
};
</script>
