<template>
  <div class="message" v-if="show">
    <div
      class="text"
      v-bind:style="{color:data.color,'background-color':data.background}"
    >{{data.value}}</div>
  </div>
</template>
<script>
export default {
  name: "Tips",
  inject: ["tips"],
  props: {
    data: Object
  },
  data() {
    return {
      show: false
    };
  },
  watch: {
    data(val) {
      this.data = val;
      this.show = true;
      setTimeout(() => {
        this.show = false;
      }, 5000);
    }
  }
};
</script>


<style scoped>
.message {
  display: flex;
  position: fixed;
  left: 0;
  top: 0;
  transform: translateY(-100%);
  width: 100%;
  padding: 30px 0;
  z-index: 20001;
  justify-content: center;
  align-items: center;
  animation: spinner 5s ease-in-out;
}
.text {
  padding: 10px 100px;
  border-radius: 10px;
  box-shadow: 0 0 5px #000;
}
@keyframes spinner {
  0% {
    opacity: 0;
    transform: translateY(-100%);
  }
  10% {
    opacity: 1;
    transform: translateY(0);
  }
  90% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 1;
    transform: translateY(-100%);
  }
}
</style>