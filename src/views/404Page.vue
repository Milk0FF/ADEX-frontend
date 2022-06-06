<template>
  <div class="not-found">
    <div class="not-found__container container">
      <div class="not-found__title">404</div>
      <div class="not-found__text">Мы не смогли найти данную страницу ...</div>
      <button @click="goToMainPage" class="not-found__btn btn btn_primary">Вернуться на главную</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "404Page",
  data(){
    return {
      isShowModal: false,
    }
  },
  methods:{
   goToMainPage(){
     this.$router.push('/');
   }
  },
};
</script>
