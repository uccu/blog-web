<template>
  <div class="spinner" v-bind:class="{show:show}">
    <div class="rect rect1" v-bind:style="{'background-color':color}"></div>
    <div class="rect rect2" v-bind:style="{'background-color':color}"></div>
    <div class="rect rect3" v-bind:style="{'background-color':color}"></div>
    <div class="rect rect4" v-bind:style="{'background-color':color}"></div>
    <div class="rect rect5" v-bind:style="{'background-color':color}"></div>
  </div>
</template>
<script>
export default {
  name: "Loading",
  props: {
    color: String,
    show: Boolean
  }
};
</script>


<style>
.spinner {
  margin: 0px auto;
  width: 50px;
  height: 0px;
  text-align: center;
  font-size: 10px;
  transition: all .3s;
  opacity: 0;
}

.spinner.show {
  opacity: 1;
  height: 60px;
}

.spinner > div {
  height: 100%;
  width: 6px;
  display: inline-block;
  -webkit-animation: stretchdelay 1.2s infinite ease-in-out;
  animation: stretchdelay 1.2s infinite ease-in-out;
}
.spinner .rect {
  margin: 2px;
}

.spinner .rect2 {
  -webkit-animation-delay: -1.1s;
  animation-delay: -1.1s;
}

.spinner .rect3 {
  -webkit-animation-delay: -1s;
  animation-delay: -1s;
}

.spinner .rect4 {
  -webkit-animation-delay: -0.9s;
  animation-delay: -0.9s;
}

.spinner .rect5 {
  -webkit-animation-delay: -0.8s;
  animation-delay: -0.8s;
}

@-webkit-keyframes stretchdelay {
  0%,
  40%,
  100% {
    -webkit-transform: scaleY(0.4);
  }
  20% {
    -webkit-transform: scaleY(1);
  }
}

@keyframes stretchdelay {
  0%,
  40%,
  100% {
    transform: scaleY(0.4);
    -webkit-transform: scaleY(0.4);
  }
  20% {
    transform: scaleY(1);
    -webkit-transform: scaleY(1);
  }
}
</style>