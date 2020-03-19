<template>
  <div class="top-bar">
    <span class="iconfont icon-menu" v-on:click="$emit('click-menu')"></span>
    <span class="top-bar-title">{{siteName}}</span>
  </div>
</template>

<script>
export default {
  name: "TopBar",
  props: {
    siteName: String
  },
  methods: {
    
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@media (max-width: 1465px) {
  .top-bar {
    padding-left: 0px;
  }
  .top-bar .icon-menu {
    left: 30px;
    cursor: pointer;
  }
  .top-bar .top-bar-title {
    left: 10%;
  }
}
@media (min-width: 1465px) {
  .top-bar {
    padding-left: 250px;
  }
  .top-bar .icon-menu {
    left: -100px;
  }
  .top-bar .top-bar-title {
    left: 320px;
  }
}

.top-bar {
  box-shadow: 0 0 10px #ccc;
  transition: padding-left 0.3s;
  background-color: #00bcd4;
  color: #fff;
  position: relative;
  height: 250px;
}
.top-bar .icon-menu {
  top: 1em;
  font-size: 20px;
  position: absolute;
  transition: left 0.3s;
}
.top-bar .top-bar-title {
  cursor: default;
  bottom: 1.3em;
  font-size: 50px;
  position: absolute;
  transition: left 0.3s;
}
</style>
