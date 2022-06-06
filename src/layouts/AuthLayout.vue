<template>
  <div class="auth">
    <div class="auth-header">
      <div class="auth-header__container container">
        <div class="auth-header__logo">
          <img src="../assets/images/logo.svg"/>
          <div class="auth-header__name">
            ADEX
          </div>
        </div>
      </div>
    </div>
    <div class="auth__content auth-content">
      <div class="auth-content__container container container_center">
        <slot/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AuthLayout",
  data(){
    return {
    }
  },
  methods:{
  },
};
</script>
