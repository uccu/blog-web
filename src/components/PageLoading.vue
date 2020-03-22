<template>
  <div class="spinner" v-if="show">
    <div class="spinner-co">
      <div class="rect rect1" v-bind:style="{'background-color':color}"></div>
      <div class="rect rect2" v-bind:style="{'background-color':color}"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "PageLoading",
  props: {
    color: String,
    show: Boolean
  }
};
</script>


<style scoped>
.spinner {
  display: flex;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 20000;
  justify-content: center;
  align-items: center;
  animation: spinner 0.5s ease-in-out;
  background: rgba(0, 0, 0, 0.5);
}

@keyframes spinner {
  0%,
  20% {
    opacity: 0;
    transform: translateY(-100%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.spinner-co {
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  padding: 50px;
  box-shadow: 0 0 5px #000;
}

.spinner-co > div {
  height: 10px;
  width: 10px;
  border-radius: 50%;
  display: inline-block;
}
.spinner-co .rect1 {
  animation: stretchdelay1 0.5s infinite ease-in-out;
  position: relative;
  left: 2px;
}

.spinner-co .rect2 {
  animation: stretchdelay2 0.5s infinite ease-in-out;
  animation-delay: 0.25s;
  position: relative;
  left: -2px;
}

@keyframes stretchdelay1 {
  0% {
    transform: translateX(0);
  }
  13% {
    transform: translateX(-10px) translateY(-7px);
  }
  25% {
    transform: translateX(-20px);
  }
  38% {
    transform: translateX(-10px) translateY(-7px);
  }
  50% {
    transform: translateX(0px);
  }
}
@keyframes stretchdelay2 {
  0% {
    transform: translateX(0);
  }
  13% {
    transform: translateX(10px) translateY(7px);
  }
  25% {
    transform: translateX(20px);
  }
  38% {
    transform: translateX(10px) translateY(7px);
  }
  50% {
    transform: translateX(0px);
  }
}
</style>