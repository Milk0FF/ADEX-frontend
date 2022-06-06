r<template>
  <div class="header">
    <div class="header__container container">
      <router-link :to="'/'" class="header__logo logo">
        <img src="../assets/images/logo-sm.svg"/>
        <div class="logo__name">
          ADEX
        </div>
      </router-link>
      <ul class="header__menu header-menu">
      </ul>
    </div>
  </div>

  <slot/>

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
  name: "NotFoundLayout",
};
</script>
