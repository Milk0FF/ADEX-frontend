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
       
      </div>
    </div>
  </div>
  <div class="profile">
    <div class="profile__container container">
      <div class="profile__sidebar profile-sidebar">
        <div class="profile-sidebar__avatar">
          <img src="../assets/images/user-logo.png"/>
          <div class="profile-sidebar__status status status_green">Свободен</div>
        </div>
        <div class="profile-sidebar__name">
          Иванов Иван
        </div>
        <div class="profile-sidebar__line profile-line">
          <div class="profile-line__title">Город</div>
          <div class="profile-line__name">Омск</div>
        </div>
        <div class="profile-sidebar__line profile-line">
          <div class="profile-line__title">Страна</div>
          <div class="profile-line__name">Россия</div>
        </div>
        <div class="profile-sidebar__line profile-line">
          <div class="profile-line__title">О себе</div>
          <div class="profile-line__name">Занимаюсь разработкой всяких штук! Делаю shit во всех осмыслениях этого смысла а у каждого смысл свой как ни как ни крути а делай то что тебе хочется иначе будет не так хорошо как могло бы быть на самом деле это так да ладно если не так то как, скажи пожалуйста!</div>
        </div>
        <div class="profile-sidebar__categories">
          <div class="profile-sidebar__category task-category task-category_red">YOUTUBE</div>
          <div class="profile-sidebar__category task-category task-category_blue">VK</div>
          <div class="profile-sidebar__category task-category task-category_purple">INSTAGRAM</div>
        </div>
      </div>
      <div class="profile__content">
        <div class="profile__cards">
          <div class="profile__card profile-card profile-card_green">
            <div class="profile-card__info">
              <div class="profile-card__number">0</div>
              <div class="profile-card__name">Рейтинг</div>
            </div>
            <div class="profile-card__statics">
              <div class="profile-card__column profile-card__column_start"></div>
              <div class="profile-card__column profile-card__column_middle"></div>
              <div class="profile-card__column profile-card__column_end"></div>
            </div>
          </div>
          <div class="profile__card profile-card profile-card_purple">
            <div class="profile-card__info">
              <div class="profile-card__number">0</div>
              <div class="profile-card__name">Одобрен</div>
            </div>
            <div class="profile-card__statics">
              <div class="profile-card__column profile-card__column_start"></div>
              <div class="profile-card__column profile-card__column_middle"></div>
              <div class="profile-card__column profile-card__column_end"></div>
            </div>
          </div>
          
          <div class="profile__card profile-card profile-card_red">
            <div class="profile-card__info">
              <div class="profile-card__number">0</div>
              <div class="profile-card__name">Отклонён</div>
            </div>
            <div class="profile-card__statics">
              <div class="profile-card__column profile-card__column_start"></div>
              <div class="profile-card__column profile-card__column_middle"></div>
              <div class="profile-card__column profile-card__column_end"></div>
            </div>
          </div>
        </div>
        <div class="profile__reviews profile-reviews">
          <h3 class="profile-reviews__title">Отзывы</h3>
          <div class="profile-reviews__user-types">
            <div class="profile-reviews__user-type profile-reviews__user-type_active">
              Исполнитель
            </div>
            <div class="profile-reviews__user-type">
              Заказчик
            </div>
          </div>
          <div class="profile-reviews__review review">
            <div class="review__score">
              <img src="../assets/images/like.svg">
            </div>
            <div class="review__content">
              <div class="review__header">
                <div class="review__user-info">
                  <div class="review__avatar">
                    <img src="../assets/images/user-logo.png">
                  </div>
                  <div class="review__name">Иванов Иван</div>
                </div>
                <div class="review__date">10.02.2020 г.</div>
              </div>
              <div class="review__text">
                Хороший адекватный заказчик. Всё норм!
              </div>
            </div>
          </div>
          <div class="profile-reviews__review review">
            <div class="review__score">
              <img src="../assets/images/like.svg">
            </div>
            <div class="review__content">
              <div class="review__header">
                <div class="review__user-info">
                  <div class="review__avatar">
                    <img src="../assets/images/user-logo.png">
                  </div>
                  <div class="review__name">Иванов Иван</div>
                </div>
                <div class="review__date">10.02.2020 г.</div>
              </div>
              <div class="review__text">
                Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.
              </div>
            </div>
          </div>
          <div class="profile-reviews__review review">
            <div class="review__score review__score_negative">
              <img src="../assets/images/like.svg">
            </div>
            <div class="review__content">
              <div class="review__header">
                <div class="review__user-info">
                  <div class="review__avatar">
                    <img src="../assets/images/user-logo.png">
                  </div>
                  <div class="review__name">Иванов Иван</div>
                </div>
                <div class="review__date">10.02.2020 г.</div>
              </div>
              <div class="review__text">
                Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.
              </div>
            </div>
          </div>
          <button class="profile-reviews__btn btn btn_primary">Загрузить ещё</button>
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
  name: "UserProfilePage",
  components: {
  },
};
</script>
