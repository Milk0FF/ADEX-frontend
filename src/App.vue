<template>
  <component :is="layout">
    <router-view/>
  </component>
</template>
<script>
export default {
  computed: {
    layout(){
        return this.$route.meta.layout || "main-layout" 
    }
  }
}
</script>
<style lang="scss">
  @import './assets/css/main/general.scss';
  #app, .container{
    height: 100%;
  }
</style>
