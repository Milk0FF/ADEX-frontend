<template>
  <div class="personal-profile">
    <div class="personal-profile__container container container_sm ">
      <div class="personal-profile__body">
        <div class="personal-profile__header">
          <div class="personal-profile__avatar">
            <img class="personal-profile__img" v-if="userInfo.avatar == null" src="../assets/images/no-image.jpg"/>
            <img class="personal-profile__img" v-else :src="userInfo.avatar"/>
            <a class="personal-profile__edit" @click="openChooseImageModal">
              <img src="../assets/images/edit-pencil.svg"/>
              <input id="image" type="file" accept="image/jpeg,image/png,image/gif" @change="uploadImg($event)"/>
            </a>
          </div>
          <div v-if="userInfo.firstname && userInfo.lastname" class="personal-profile__name">{{userInfo.firstname + " " + userInfo.lastname}}</div>
          <div v-else class="personal-profile__name">Имя не указано</div>
        </div>
        <div class="personal-profile__content">
          <h3 class="personal-profile__title">Личная информация</h3>
          <div class="personal-profile__fields">
            <div class="personal-profile__field field field_sm">
              <div class="field__content">
                <div class="field__title">Имя</div>
                <input class="field__input" type="text" placeholder="Имя" v-model="name">
              </div>
              <div class="field__error" v-if="v$.name.$error">{{ v$.name.$errors[0].$message }}</div>
            </div>
            <div class="personal-profile__field field field_sm">
              <div class="field__content">
                <div class="field__title">Фамилия</div>
                <input class="field__input" type="text" placeholder="Фамилия" v-model="surname">
              </div>
              <div class="field__error" v-if="v$.surname.$error">{{ v$.surname.$errors[0].$message }}</div>
            </div>
            <div class="personal-profile__field field field_sm">
              <div class="field__content">
                <div class="field__title">Телефон</div>
                <input class="field__input" type="text" placeholder="Телефон" v-model="phone">
              </div>
              <div class="field__error" v-if="v$.phone.$error">{{ v$.phone.$errors[0].$message }}</div>
            </div>
            <div class="personal-profile__field field field_sm">
              <div class="field__content">
                <div class="field__title">Email</div>
                <input class="field__input" type="text" placeholder="Email" v-model="email">
              </div>
              <div class="field__error" v-if="v$.email.$error">{{ v$.email.$errors[0].$message }}</div>
            </div>
            <div class="personal-profile__field field">
              <div class="field__content">
                <div class="field__title">О себе</div>
                <input class="field__input" type="text" placeholder="О себе" v-model="about">
              </div>
              <div class="field__error" v-if="v$.about.$error">{{ v$.about.$errors[0].$message }}</div>
            </div>
            <div class="personal-profile__field field field_sm">
              <div class="field__content">
                <div class="field__title">Город</div>
                <input class="field__input" type="text" placeholder="Город" v-model="city">
              </div>
              <div class="field__error" v-if="v$.city.$error">{{ v$.city.$errors[0].$message }}</div>
            </div>
            <div class="personal-profile__field field field_sm">
              <div class="field__content">
                <div class="field__title">Страна</div>
                <input class="field__input" type="text" placeholder="Страна" v-model="country">
              </div>
              <div class="field__error" v-if="v$.country.$error">{{ v$.country.$errors[0].$message }}</div>
            </div>
            <div class="personal-profile__field field field_sm">
              <div class="field__content">
                <div class="field__title">Дата рождения</div>
                <input class="field__input" type="date" placeholder="Дата рождения" v-model="dateBirth">
              </div>
              <div class="field__error" v-if="v$.dateBirth.$error">{{ v$.dateBirth.$errors[0].$message }}</div>
            </div>
            <div class="personal-profile__field field field_sm">
              <div class="field__content">
                <div class="field__title">Статус</div>
                <multiselect v-model="selectEmploymentTypesValue"
                              :options="selectEmploymentTypesOptions"
                              :label="'name'"
                              :canClear="false"
                              :valueProp="'id'"
                              :placeholder="'Укажите статус занятости'"/>
              </div>
            </div>
            <div class="personal-profile__field field">
              <div class="field__content">
                <div class="field__title">Категории</div>
                <multiselect v-model="selectCategoriesValue"
                              :mode="'tags'"
                              :options="selectCategoriesOptions"
                              :label="'name'"
                              :valueProp="'id'"
                              :placeholder="'Укажите категории рекламы'"/>
              </div>
            </div>
          </div> 
        </div>
        <button @click="validateUserInfo" class="personal-profile__btn btn btn_primary">Сохранить</button>
      </div>
    </div>
  </div>
  <modal-component :text="modalText" 
                    :isShow="modalIsShow"
                    @close="modalIsShow = false"/>
</template>

<script>
import axios from 'axios';
import ModalComponent from '@/components/ModalComponent.vue';
import Multiselect from '@vueform/multiselect';
import useVuelidate from '@vuelidate/core'
import {required, email, helpers, integer, } from '@vuelidate/validators'

export default {
  name: "PersonalUserProfilePage",
  setup(){
    return {v$: useVuelidate()}
  },
  mounted(){
    this.token = localStorage.getItem('token');
    this.getCategoryWorks();
    this.getUserEmploymentTypes();
    this.getUserInfo();
  },
  data(){
    return{
      BASE_URL: "http://127.0.0.1:8000/api",
      token: null,
      
      userInfo: {},
      name: null,
      surname: null,
      email: null,
      phone: null,
      about: null,
      city: null,
      country: null,
      dateBirth: null,
      avatar: null,

      modalText: null,
      modalIsShow: false,

      userCategoryWorks: [],
      userEmploymentType: {},

      selectEmploymentTypesValue: 0,
      selectEmploymentTypesOptions: [],
      selectCategoriesValue: [],
      selectCategoriesOptions: [],
    }
  },
  components:{
    Multiselect,
    ModalComponent
  },
  methods:{
    openChooseImageModal(){
      const imageModal = document.getElementById("image");
      imageModal.click();
    },
    uploadImg(e){
      const image = e.target.files[0];
      const imgBody = new FormData();
      imgBody.append('image', image);
      
      this.changeAvatar(imgBody);
    },
    validateUserInfo(){
      this.v$.$touch();
      if (this.v$.name.$error || this.v$.surname.$error || this.v$.email.$error || this.v$.phone.$error || this.v$.about.$error || this.v$.city.$error || this.v$.country.$error || this.v$.dateBirth.$error ){
        return;
      }
      this.changeUserInfo();
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
        this.name = this.userInfo.firstname;
        this.surname = this.userInfo.lastname;
        this.about = this.userInfo.about;
        this.phone = this.userInfo.phone;
        this.city = this.userInfo.city;
        this.email = this.userInfo.email;
        this.country = this.userInfo.country;
        this.dateBirth = this.userInfo.birth_date;
        this.userCategoryWorks = this.userInfo.categories;
        this.userEmploymentType = this.userInfo.employment_type;

        if(this.userCategoryWorks !== null)
          this.userCategoryWorks.forEach(category => {
            this.selectCategoriesValue.push(category.id);
          });
        
        if(this.userEmploymentType !== null)
          this.selectEmploymentTypesValue = this.userEmploymentType.id;

      } catch(error){
        console.log(error);
      }
    },
    async changeAvatar(formData){
      try{
          const res = await axios.post(this.BASE_URL + "/user/avatar", formData,
            {
              headers:{
                'Accept': 'application/json',
                'Authorization': `Bearer ${this.token}`,
                'Content-Type': 'multipart/form-data',
              }
          });
          this.userInfo.avatar = res.data.avatar;
          this.modalText = 'Аватар успешно изменён!';
          this.modalIsShow = true;
      } catch(error){
          console.log(error.response.data);
          // const status = error.response.status;
          // if(status === 400){
          //   this.error = 'Пользователя с таким email не существует';
          //   return;
          // }
          // if(status === 422){
          //   this.error = 'Пароль введён неверно'
          //   return;
          // }
          // if(status === 500){
          //   this.error = 'Ошибка сервера';
          //   return;
          // }
      }
    } ,
    
    async changeUserInfo(){
      const params = {
        firstname: this.name,
        lastname: this.surname,
        about: this.about,
        phone: this.phone,
        city: this.city,
        country: this.country,
        birth_date: this.dateBirth,
        categories: this.selectCategoriesValue,
        employment_type: this.selectEmploymentTypesValue, 
      }
      if(this.userInfo.email != this.email)
        params.email = this.email;

      try{
          await axios.put(this.BASE_URL + "/user", params,
            {
              headers:{
                'Accept': 'application/json',
                'Authorization': `Bearer ${this.token}`,
              }
          });
          this.userInfo.firstname = this.name;
          this.userInfo.lastname = this.surname;
          this.modalText = 'Профиль успешно изменён!';
          this.modalIsShow = true;
      } catch(error){
          console.log(error.response.data);
          // const status = error.response.status;
          // if(status === 400){
          //   this.error = 'Пользователя с таким email не существует';
          //   return;
          // }
          // if(status === 422){
          //   this.error = 'Пароль введён неверно'
          //   return;
          // }
          // if(status === 500){
          //   this.error = 'Ошибка сервера';
          //   return;
          // }
      }
    } ,
    async getCategoryWorks(){
      const res = await axios.get(this.BASE_URL + '/category-works',
        {
          headers:{
            'Accept': 'application/json',
            'Authorization': `Bearer ${this.token}`,
          }
      });
      this.selectCategoriesOptions = res.data;
    },
    async getUserEmploymentTypes(){
      const res = await axios.get(this.BASE_URL + '/employment-types',
        {
          headers:{
            'Accept': 'application/json',
            'Authorization': `Bearer ${this.token}`,
          }
      });
      this.selectEmploymentTypesOptions = res.data;
    },
       
  },
  validations () {
    return {
      name: { required: helpers.withMessage("Поле Имя обязательно для заполнения", required),},
      surname: { required: helpers.withMessage("Поле Фамилия обязательно для заполнения", required)},
      email: { required: helpers.withMessage("Поле Email обязательно для заполнения", required), email: helpers.withMessage("Поле Email заполнено неверно", email), },
      phone: { required: helpers.withMessage("Поле Телефон обязательно для заполнения", required), integer: helpers.withMessage("Поле Телефон заполнено неверно", integer)  },
      about: { required: helpers.withMessage("Поле О себе обязательно для заполнения", required)},
      city: { required: helpers.withMessage("Поле Город обязательно для заполнения", required) },
      country: { required: helpers.withMessage("Поле Страна обязательно для заполнения", required)},
      dateBirth: { required: helpers.withMessage("Поле Дата рождения обязательно для заполнения", required) },
    }
  }
};
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
<style src="@/assets/css/select-styling.scss" lang="scss"></style>