<template>
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
    <form class="auth-content__form auth-form" @submit.prevent="validateForm">
      <div class="auth-form__inputs">
        <div class="auth-form__input" :class="v$.email.$error ? 'auth-form__input_error' : ''">
          <input type="text" placeholder="Email" v-model.trim="email">
          <div class="auth-form__error" v-if="v$.email.$error"> {{ v$.email.$errors[0].$message }} </div>
        </div>
        <div class="auth-form__input" :class="v$.password.$error ? 'auth-form__input_error' : ''">
          <input type="text" placeholder="Пароль" v-model.trim="password">
          <div class="auth-form__error" v-if="v$.password.$error"> {{ v$.password.$errors[0].$message }} </div>
        </div>
        <div class="auth-form__error" v-if="error !== ''"> {{ error }} </div>
        <router-link class="auth-form__link" :to="'/register'">Уже есть аккаунт? Зарегистрируйтесь</router-link>
        <button class="auth-form__btn btn" type="submit">Авторизоваться</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import useVuelidate from '@vuelidate/core'
import {required, email, minLength, helpers } from '@vuelidate/validators'
import {mapMutations, mapGetters} from 'vuex'

export default {
  name: "LoginPage",
  setup(){
    return {v$: useVuelidate()}
  },
  data(){
    return {
      email: null,
      password: null,
      BASE_URL: "http://127.0.0.1:8000/api",
      error:'',
    }
  },
  methods:{
    ...mapMutations({setToken: 'setToken'}),
    ...mapGetters({getToken: 'getToken'}),
    moveToRegister(){
      this.$router.push('/register');
    },
    validateForm(){
      this.v$.$touch();
      if (this.v$.password.$error || this.v$.email.$error){
        return;
      }
      this.login();
    },
    async login(){
      this.error = '';
      // axios.get(process.env.BASE_URL + "/tasks", {
      //   params:{
      //     categories: [1,2,3],
      //     price_start: 1,
      //     price_end: 2,
      //   }
      // });
      try{
        let res = await axios.post(this.BASE_URL + "/user/login", {
            email: this.email,
            password: this.password,
          },
          {
            headers:{
              'Accept': 'application/json',
            }
        });
        this.setToken(res.data.token);
        this.$router.push('/');
      } catch(error){
        const status = error.response.status;
        if(status === 400){
          this.error = 'Пользователя с таким email не существует';
          return;
        }
        if(status === 422){
          this.error = 'Пароль введён неверно'
          return;
        }
        if(status === 500){
          this.error = 'Ошибка сервера';
          return;
        }
      }

      // axios.post(process.env.BASE_URL + "/user/logout", { }, {
      //   headers:{
      //     'Accept': 'application/json',
      //     "Authorization": `Bearer ${token}`
      //   }
      // });
    }
  },
  validations () {
    return {
      email: { required: helpers.withMessage("Поле Email обязательно для заполнения", required), email: helpers.withMessage("Поле Email заполнено неверно", email), },
      password: { required: helpers.withMessage("Поле Пароль обязательно для заполнения", required), minLength: helpers.withMessage("Поле Пароль не должно быть меньше 6 символов", minLength(6)) },
    }
  }
};
</script>
