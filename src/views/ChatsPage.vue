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
  <div class="chats">
    <div class="chats__container container">
        <div class="chats__sidebar chats-sidebar">
          <div class="chats-sidebar__chat chats-sidebar__chat_active">
            <div class="chats-sidebar__user-info chat-user-info">
              <div class="chat-user-info__avatar">
                <img src="../assets/images/user-logo.png">
              </div>
              <div class="chat-user-info__info">
                <div class="chat-user-info__name">Иванов Иван</div>
                <div class="chat-user-info__task-name">Название задачи</div>
              </div>
            </div>
            <div class="chats-sidebar__date">
              10.02.2020 г.
            </div>
          </div>
          <div class="chats-sidebar__chat">
            <div class="chats-sidebar__user-info chat-user-info">
              <div class="chat-user-info__avatar">
                <img src="../assets/images/user-logo.png">
              </div>
              <div class="chat-user-info__info">
                <div class="chat-user-info__name">Иванов Иван</div>
                <div class="chat-user-info__task-name">Название задачи</div>
              </div>
            </div>
            <div class="chats-sidebar__date">
              10.02.2020 г.
            </div>
          </div>
        </div>
        <div class="chats__chat chat">
            <div class="chat__header">
                <div class="chat__user-info chat-user-info">
                    <a href="#" class="chat-user-info__avatar">
                      <img src="../assets/images/user-logo.png">
                    </a>
                    <div class="chat-user-info__info">
                      <a href="#" class="chat-user-info__name">Иванов Иван</a>
                      <div class="chat-user-info__task-name">Название задачи</div>
                    </div>
                </div>
                <div class="chat__settings">
                    <div class="chat__settings-content" @click="openChatDropMenu">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <div class="chat__dropmenu chat-dropmenu" v-if="isOpenChatDropMenu">
                        <ul class="chat-dropmenu__list">
                            <li>
                                <a class="chat-dropmenu__link">Назначить исполнителем</a>
                            </li>
                            <li>
                                <a class="chat-dropmenu__link">Завершить задачу</a>
                            </li>
                            <li>
                                <a class="chat-dropmenu__link">Выход</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="chat__content">
              <div class="chat__message chat__message_another">
                  <div class="chat__text">Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.</div>
                  <div class="chat__date">12 апреля 2021 г. 12:00</div>
              </div>
              <div class="chat__message chat__message_owner">
                  <div class="chat__text">Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.</div>
                  <div class="chat__date">12 апреля 2021 г. 12:00</div>
              </div>
              <div class="chat__message chat__message_another">
                  <div class="chat__text">Как дела обстоят с проектом?</div>
                  <div class="chat__date">12 апреля 2021 г. 12:00</div>
              </div>
              <div class="chat__message chat__message_owner">
                  <div class="chat__text">Всё хорошо, делается по-тихоньку</div>
                  <div class="chat__date">12 апреля 2021 г. 12:00</div>
              </div>
              <div class="chat__message chat__message_another">
                  <div class="chat__text">Как дела обстоят с проектом?</div>
                  <div class="chat__date">12 апреля 2021 г. 12:00</div>
              </div>
              <div class="chat__message chat__message_owner">
                  <div class="chat__text">Всё хорошо, делается по-тихоньку</div>
                  <div class="chat__date">12 апреля 2021 г. 12:00</div>
              </div>
            </div>
            <div class="chat__footer">
                <textarea class="chat__field" placeholder="Напишите сообщение ..."></textarea>
                <button class="chat__btn btn">Отправить</button>
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
  name: "ChatsPage",
  data(){
    return{
      isOpenDropMenu: false,
      isOpenChatDropMenu: false,
    }
  },
  methods:{
    openDropMenu(){
      if(this.isOpenDropMenu)
        this.isOpenDropMenu = false;
      else
        this.isOpenDropMenu = true;
    },
    openChatDropMenu(){
      if(this.isOpenChatDropMenu)
        this.isOpenChatDropMenu = false;
      else
        this.isOpenChatDropMenu = true;

    }
  },
};
</script>
