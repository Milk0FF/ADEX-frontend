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
        <div class="header-profile__name">
          Иванов Иван
        </div>
        <div class="header-profile__img">
          <img src="../assets/images/user-logo.png">
        </div>
        <div class="header-profile__dropmenu header-dropmenu">
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
    <div class="personal-profile__container container container_column">
      <div class="personal-profile__header">
        <div class="personal-profile__avatar">
          <img src="../assets/images/user-logo.png"/>
          <div class="personal-profile__edit"></div>
        </div>
        <div class="personal-profile__name">Иванов Иван</div>
      </div>
      <div class="personal-profile__content">
        <h3 class="personal-profile__title"></h3>
        <div class="personal-profile__field field">
          <div class="field__title">Имя</div>
          <input type="text" placeholder="Имя">
        </div>
        <div class="personal-profile__field field">
          <div class="field__title">Фамилия</div>
          <input type="text" placeholder="Фамилия">
        </div>
        <div class="personal-profile__field field">
          <div class="field__title">О себе</div>
          <input type="text" placeholder="О себе">
        </div>
        <div class="personal-profile__field field">
          <div class="field__title">Город</div>
          <input type="text" placeholder="Город">
        </div>
        <div class="personal-profile__field field">
          <div class="field__title">Страна</div>
          <input type="text" placeholder="Страна">
        </div>
        <div class="personal-profile__field field">
          <div class="field__title">Дата рождения</div>
          <input type="text" placeholder="Дата рождения">
        </div>
        <div class="personal-profile__field field">
          <div class="field__title">Категории</div>
          <input type="text" placeholder="Категории">
        </div>
        <div class="personal-profile__categories">
          <div class="personal-profile__category task-category__red">
            YOUTUBE
            <div class="task-category__delete"></div>
          </div>
          
          <div class="personal-profile__category task-category__blue">
            VK
            <div class="task-category__delete"></div>
          </div>
          
          <div class="personal-profile__category task-category__purple">
            INSTAGRAM
            <div class="task-category__delete"></div>
          </div>
        </div>
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

export default {
  name: "PersonalUserProfilePage",
  components: {
  },
};
</script>
