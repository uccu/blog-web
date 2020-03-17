<template>
  <div class="slide-top-bar" v-bind:class="{ show: showSlideTopBar }">
    <span class="iconfont icon-menu" v-on:click="$emit('click-menu')"></span>
    <span class="top-bar-title">{{siteName}}</span>
  </div>
</template>

<script>
export default {
  name: "SlideTopBar",
  props: {
    siteName: String
  },
  data: function() {
    return { showSlideTopBar: false };
  },
  methods: {
    handleScroll() {
      let scrollTop = document.documentElement.scrollTop;
      if (scrollTop > 250) {
        this.showSlideTopBar = true;
      } else {
        this.showSlideTopBar = false;
      }
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll, true);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@media (max-width: 1465px) {
  .slide-top-bar {
    padding-left: 0;
  }
}
@media (min-width: 1465px) {
  .slide-top-bar {
    padding-left: 200px;
  }
}
.slide-top-bar {
  position: fixed;
  top: -50px;
  left: 0;
  height: 50px;
  width: 100%;
  background-color: #00bcd4;
  color: #fff;
  box-shadow: 0 0 10px #ccc;
  transition: all 0.3s;
}
.slide-top-bar.show {
  top: 0;
}

.slide-top-bar .icon-menu {
  position: relative;
  font-size: 20px;
  line-height: 50px;
  transition: left 0.3s;
  margin-left: 20px;
  cursor: pointer;
}
.slide-top-bar .top-bar-title {
  margin-left: 20px;
  font-size: 20px;
  line-height: 50px;
  transition: left 0.3s;
  cursor: default;
}
</style>
