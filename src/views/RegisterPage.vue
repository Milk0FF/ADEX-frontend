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
    <register-form />
  </div>
</template>

<script>
import RegisterForm from "@/components/auth/RegisterForm.vue";

export default {
  name: "RegisterPage",
  components: {
    RegisterForm,
  },
};
</script>
