<template>
  <div class="modal" :class="showModal === true ? 'modal_active' : ''">
    <div class="modal__container">
      <div class="modal__text">{{text}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalComponent",
  data(){
    return {
      showModal: false,
    }
  },
  methods:{
  },
  props:{
    text:{
      type:String,
      default: '',
    },
    isShow:{
      type:Boolean,
      default: false,
    },
  },
  watch:{
    isShow(){
      this.showModal = true;
      setTimeout(() => {
        this.showModal = false;
      }, 2500)
      this.$emit('close');
    }
  }
};
</script>
