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
  <div class="tasks">
    <div class="tasks__container container">
      <div class="tasks__sidebar tasks-sidebar">
        <h3 class="tasks-sidebar__title">Создать задачу</h3>
        <form class="tasks-sidebar__form">
          <div class="tasks-sidebar__field field">
            <div class="field__content">
              <div class="field__title">Название</div>
              <input class="field__input" type="text" placeholder="Название">
            </div>
            <div class="field__error">Поле должно быть заполнено</div>
          </div>
          <div class="tasks-sidebar__field field">
            <div class="field__content">
              <div class="field__title">Цена (можно не указывать)</div>
              <input class="field__input" type="text" placeholder="Цена">
            </div>
            <div class="field__error">Поле должно быть заполнено</div>
          </div>
          <div class="tasks-sidebar__field field">
            <div class="field__content">
              <div class="field__title">Описание</div>
              <input class="field__input" type="text" placeholder="Описание">
            </div>
            <div class="field__error">Поле должно быть заполнено</div>
          </div>
          <div class="tasks-sidebar__field field">
            <div class="field__content">
              <div class="field__title">Дата окончания</div>
              <input class="field__input" type="text" placeholder="Название">
            </div>
            <div class="field__error">Поле должно быть заполнено</div>
          </div>
          <div class="tasks-sidebar__field field">
            <div class="field__content">
              <div class="field__title">Категории</div>
              <input class="field__input" type="text" placeholder="Выбрать категории">
            </div>
            <div class="field__error">Поле должно быть заполнено</div>
          </div>
          <!-- <div class="tasks-sidebar__categories">
            <div class="tasks-sidebar__category task-category task-category_red">
              YOUTUBE
              <div class="task-category__delete"></div>
            </div>
            <div class="tasks-sidebar__category task-category task-category_blue">
              VK
              <div class="task-category__delete"></div>
            </div>
            <div class="tasks-sidebar__category task-category task-category_purple">
              INSTAGRAM
              <div class="task-category__delete"></div>
            </div>
          </div> -->
          <button class="tasks-sidebar__btn btn btn_primary">Создать</button>
        </form>
        
      </div>
      <div class="tasks__content tasks-content">
        <h3 class="tasks-content__title">Текущие задачи</h3>
        <div class="tasks-content__tasks">
          <div class="tasks-content__task main-task main-task_full">
           <div class="main-task__header">
             <div class="main-task__name">Make YouTube Video</div>
             <div class="main-task__categories">
               <div class="main-task__category task-category task-category_red">Youtube</div>
               <div class="main-task__category task-category task-category_blue">VK</div>
               <div class="main-task__category task-category task-category_green">VK</div>
             </div>
             <div class="main-task__price">10 000 ₽</div>
           </div>
           <div class="main-task__content">
             <div class="main-task__description">Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem ...</div>
             <div class="main-task__status">Исполнитель выбран</div>
           </div>
          </div>
          <div class="tasks-content__task main-task main-task_full">
           <div class="main-task__header">
             <div class="main-task__name">Make YouTube Video</div>
             <div class="main-task__categories">
               <div class="main-task__category task-category task-category_red">Youtube</div>
               <div class="main-task__category task-category task-category_blue">VK</div>
               <div class="main-task__category  task-category task-category_green">VK</div>
             </div>
             <div class="main-task__price">10 000 ₽</div>
           </div>
           <div class="main-task__content">
             <div class="main-task__description">Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem ...</div>
           </div>
          </div>
         <div class="tasks-content__task main-task main-task_full">
           <div class="main-task__header">
             <div class="main-task__name">Make YouTube Video</div>
             <div class="main-task__categories">
               <div class="main-task__category task-category task-category_red">Youtube</div>
               <div class="main-task__category task-category task-category_blue">VK</div>
               <div class="main-task__category  task-category task-category_green">VK</div>
             </div>
             <div class="main-task__price">10 000 ₽</div>
           </div>
           <div class="main-task__content">
             <div class="main-task__description">Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.</div>
             <div class="main-task__status">Исполнитель выбран</div>
           </div>
           <form class="main-task__form">
              <h3 class="main-task__title">Редактирование задачи</h3>
              <div class="main-task__fields">
                <div class="main-task__field field field_sm">
                  <div class="field__title">Название</div>
                  <input class="field__input" type="text" placeholder="Название">
                </div>
                <div class="main-task__field field field_sm">
                  <div class="field__title">Цена (можно не указывать)</div>
                  <input class="field__input" type="text" placeholder="Цена">
                </div>
                <div class="main-task__field field">
                  <div class="field__title">Описание</div>
                  <input class="field__input" type="text" placeholder="Описание">
                </div>
                <div class="main-task__field field field_sm">
                  <div class="field__title">Дата окончания</div>
                  <input class="field__input" type="text" placeholder="Дата окончания">
                </div>
                <div class="main-task__field field field_sm">
                  <div class="field__title">Статус задачи</div>
                  <input class="field__input" type="text" placeholder="Выбрать статус">
                </div>
                <div class="main-task__field field">
                  <div class="field__title">Категории</div>
                  <input class="field__input" type="text" placeholder="Выбрать категорию">
                </div>
              </div>
              <div class="main-task__categories">
                <div class="main-task__category task-category task-category_red">
                  YOUTUBE
                  <div class="task-category__delete"></div>
                </div>
                <div class="main-task__category task-category task-category_blue">
                  VK
                  <div class="task-category__delete"></div>
                </div>
                <div class="main-task__category task-category task-category_purple">
                  INSTAGRAM
                  <div class="task-category__delete"></div>
                </div>
              </div>
             <button class="main-task__btn btn btn_primary">Изменить</button>
           </form>
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
  name: "CustomerTasksPage",
  data(){
    return{
      isOpenDropMenu: false,
    }
  },
  methods:{
    openDropMenu(){
      if(this.isOpenDropMenu)
        this.isOpenDropMenu = false;
      else
        this.isOpenDropMenu = true;
    }
  },
};
</script>
