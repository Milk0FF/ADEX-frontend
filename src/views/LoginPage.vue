<template><div class="auth">
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
    <login-form />
  </div>
</template>

<script>
import LoginForm from "@/components/auth/LoginForm.vue";

export default {
  name: "LoginPage",
  components: {
    LoginForm,
  },
};
</script>
