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
              <div class="field__title">Имя</div>
              <input class="field__input" type="text" placeholder="Имя" v-model="name">
            </div>
            <div class="personal-profile__field field field_sm">
              <div class="field__title">Фамилия</div>
              <input class="field__input" type="text" placeholder="Фамилия" v-model="surname">
            </div>
            <div class="personal-profile__field field field_sm">
              <div class="field__title">Телефон</div>
              <input class="field__input" type="text" placeholder="Телефон" v-model="phone">
            </div>
            <div class="personal-profile__field field field_sm">
              <div class="field__title">Email</div>
              <input class="field__input" type="text" placeholder="Email" v-model="email">
            </div>
            <div class="personal-profile__field field">
              <div class="field__title">О себе</div>
              <input class="field__input" type="text" placeholder="О себе" v-model="about">
            </div>
            <div class="personal-profile__field field field_sm">
              <div class="field__title">Город</div>
              <input class="field__input" type="text" placeholder="Город" v-model="city">
            </div>
            <div class="personal-profile__field field field_sm">
              <div class="field__title">Страна</div>
              <input class="field__input" type="text" placeholder="Страна" v-model="country">
            </div>
            <div class="personal-profile__field field field_sm">
              <div class="field__title">Дата рождения</div>
              <input class="field__input" type="date" placeholder="Дата рождения" v-model="dateBirth">
            </div>
            <div class="personal-profile__field field field_sm">
              <div class="field__title">Статус</div>
              <select class="field__select" placeholder="Статус">
                <option>fdsklfj,dsjfdlk</option>
                <option>2</option>
                <option>3</option>
              </select>
            </div>
            <div class="personal-profile__field field">
              <div class="field__title">Категории</div>
              <input class="field__input" type="text" placeholder="Категории">
            </div>
            <div class="personal-profile__categories">
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
            </div>
          </div>
        </div>
        <button class="personal-profile__btn btn btn_primary">Сохранить</button>
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
  name: "PersonalUserProfilePage",
  mounted(){
    this.getUserInfo();
    this.getCategoryWorks();
  },
  data(){
    return{
      isOpenDropMenu: false,
      BASE_URL: "http://127.0.0.1:8000/api",
      token: "1|yZwLvytMTyry2fCisN7xAFNkFOzSqcxviQUdUnte",
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
      categoryWorks: [],
    }
  },
  methods:{
    openDropMenu(){
      if(this.isOpenDropMenu)
        this.isOpenDropMenu = false;
      else
        this.isOpenDropMenu = true;
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
      // let reader = new FileReader();
      // reader.readAsDataURL(file);
      // const that = this;
      // reader.onload = (e) => {
      //   url
      // }

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
      } catch(error){
        console.log(error.response.data);
      }
    },
    async changeAvatar(formData){
      try{
          const res = await axios.post(this.BASE_URL + "/user/avatar", formData,
            {
              headers:{
                'Accept': 'application/json',
                "Authorization": `Bearer ${this.token}`
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
    async getCategoryWorks(){
      const res = await axios.get(this.BASE_URL + '/category-works',
        {
          headers:{
            'Accept': 'application/json',
            'Authorization': `Bearer ${this.token}`,
            'Content-Type': 'multipart/form-data',
          }
      });
      this.categoryWorks = res.data;
    },
    
  },
};
</script>
