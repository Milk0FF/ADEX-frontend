<template>
  <div class="page__content">
    <section class="presentation">
      <div class="presentation__container container container_column">
        <div class="presentation__title">Все рекламные задачи на одной площадке</div>
        <div class="presentation__subtitle">Найдите исполнителей или начните сами выполнять задачи</div>
        <router-link :to="'/register'" class="presentation__btn btn btn_sm">Начать прямо сейчас</router-link>
        <div class="presentation__image">
          <img src="../assets/images/main-screen-example.png">
        </div>
      </div>
    </section>
    <section class="best">
      <div class="best__container container container_column">
        <div class="best__title">Лучшие исполнители</div>
        <hr/>
        <div class="best__persons">
          <div class="best__person person">
            
            <div class="person__avatar">
              <img src="../assets/images/user-logo.png" alt="user">
            </div>
            <div class="person__rating">
              <img src="../assets/images/like.svg">
              <div class="person__score">2</div>
            </div>
            <div class="person__name">Иван Иванов</div>
            <div class="person__text">Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. </div>
            <div class="person__status status status_green">Рекламные билборды</div>
          </div>
          <div class="best__person person">
            <div class="person__avatar">
              <img src="../assets/images/user-logo.png" alt="user">
            </div>
            <div class="person__rating">
              <img src="../assets/images/like.svg">
              <div class="person__score">2</div>
            </div>
            <div class="person__name">Иван Иванов</div>
            <div class="person__text">Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. </div>
            <div class="person__status status status_green">Рекламные билборды</div>
          </div>
          <div class="best__person person">
            <div class="person__avatar">
              <img src="../assets/images/user-logo.png" alt="user">
            </div>
            <div class="person__rating">
              <img src="../assets/images/like.svg">
              <div class="person__score">2</div>
            </div>
            <div class="person__name">Иван Иванов</div>
            <div class="person__text">Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. </div>
            <div class="person__status status status_green">Рекламные билборды</div>
          </div>
        </div>
      </div>
    </section>
    <section class="best">
      <div class="best__container container container_column">
        <div class="best__title">Лучшие заказчики</div>
        <hr/>
        <div class="best__persons">
          <div class="best__person person">
            
            <div class="person__avatar">
              <img src="../assets/images/user-logo.png" alt="user">
            </div>
            <div class="person__rating">
              <img src="../assets/images/like.svg">
              <div class="person__score">2</div>
            </div>
            <div class="person__name">Иван Иванов</div>
            <div class="person__text">Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. </div>
            <div class="person__status status status_green">Рекламные билборды</div>
          </div>
          <div class="best__person person">
            <div class="person__avatar">
              <img src="../assets/images/user-logo.png" alt="user">
            </div>
            <div class="person__rating">
              <img src="../assets/images/like.svg">
              <div class="person__score">2</div>
            </div>
            <div class="person__name">Иван Иванов</div>
            <div class="person__text">Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. </div>
            <div class="person__status status status_green">Рекламные билборды</div>
          </div>
          <div class="best__person person">
            <div class="person__avatar">
              <img src="../assets/images/user-logo.png" alt="user">
            </div>
            <div class="person__rating">
              <img src="../assets/images/like.svg">
              <div class="person__score">2</div>
            </div>
            <div class="person__name">Иван Иванов</div>
            <div class="person__text">Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. </div>
            <div class="person__status status status_green">Рекламные билборды</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "MainPage",
  data(){
    return {
    }
  },
  methods:{
  },
};
</script>
