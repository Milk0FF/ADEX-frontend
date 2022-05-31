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
                              @select="getSelectedItems"
                              :label="'name'"
                              :canClear="false"
                              :valueProp="'id'"
                              :placeholder="'Укажите статус занятости'"/>
              </div>
            </div>
            <div class="personal-profile__field field">
              <div class="field__content">
                <div class="field__title">Категории</div>
                <!-- <input class="field__input" type="text" placeholder="Категории"> -->
                <multiselect v-model="selectCategoriesValue"
                              :mode="'tags'"
                              @select="getSelectedItems"
                              :options="selectCategoriesOptions"
                              :label="'name'"
                              :valueProp="'id'"
                              :placeholder="'Укажите категории рекламы'"/>
              </div>
            </div>
            <!-- <div class="personal-profile__categories">
              <div class="personal-profile__category task-category task-category_red">
                YOUTUBE
                <div class="task-category__delete"></div>
              </div>
              
              <div class="personal-profile__category task-category task-category_blue">
                VK
                <div class="task-category__delete"></div>
              </div>
              
              <div class="personal-profile__category task-category task-category_purple">
                INSTAGRAM
                <div class="task-category__delete"></div>
              </div>
            </div> -->
          </div> 
        </div>
        <button @click="validateUserInfo" class="personal-profile__btn btn btn_primary">Сохранить</button>
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
import Multiselect from '@vueform/multiselect';
import useVuelidate from '@vuelidate/core'
import {required, email, helpers, integer, } from '@vuelidate/validators'

export default {
  name: "PersonalUserProfilePage",
  setup(){
    return {v$: useVuelidate()}
  },
  mounted(){
    this.getCategoryWorks();
    this.getUserEmploymentTypes();
    this.getUserInfo();
  },
  data(){
    return{
      isOpenDropMenu: false,
      BASE_URL: "http://127.0.0.1:8000/api",
      // token: "2|fsIfNetkvCNSZwFUp02iiPNS9kqd9IiPdhVtylRa",
      token: "3|Zq7tS37BmKd85eBgp0fZWNl2BsCBLQmyaI9E4Ijd",
      
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
  },
  methods:{
    openDropMenu(){
      if(this.isOpenDropMenu)
        this.isOpenDropMenu = false;
      else
        this.isOpenDropMenu = true;
    },
    getSelectedItems(){
      console.log('Categories', this.selectCategoriesValue);
      console.log('Employment Types', this.selectEmploymentTypesValue);
    },
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
        // console.log(error.response.data);
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
          console.log(res);
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
        birth_date: this.birth_date,
        categories: this.selectCategoriesValue,
        employment_type: this.selectEmploymentTypesValue, 
      }
      if(this.userInfo.email != this.email)
        params.email = this.email;

      try{
          const res = await axios.put(this.BASE_URL + "/user", params,
            {
              headers:{
                'Accept': 'application/json',
                'Authorization': `Bearer ${this.token}`,
              }
          });
          console.log("Вроде как всё заебись ёбана рот!");
          console.log(res);
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
      const res = await axios.get(this.BASE_URL + '/user/employment-types',
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