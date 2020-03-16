<template>
  <div>
    <div class="top"></div>

    <div class="slide-top"></div>

    <div class="side t" v-bind:class="{ show: showSide }">
      <div class="side-title">
        <span class="iconfont icon-home"></span>
        {{home}}
      </div>
      <ul class="side-list">
        <a v-for="m in menu" v-bind:key="m" href="#">
          <li class="t">{{ m }}</li>
        </a>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data: function() {
    return {
      showSide: true,
      home: "",
      menu: [2020, 2019]
    };
  },
  props: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@media (max-width: 1465px) {
  .side {
    left: -250px;
  }
}
@media (min-width: 1465px) {
  .side.show {
    left: 0;
  }
}
.side {
  left: -250px;
  position: fixed;
  width: 250px;
  height: 100%;
  box-shadow: 0 0 10px #ccc;
  z-index: 10000;
  background-color: #fff;
}
.side-title {
  width: 100%;
  text-align: center;
  font-size: 30px;
  cursor: pointer;
  padding: 0.5em 0;
  margin-bottom: 1em;
  border-bottom: 1px solid #f0f0f0;
}
.side-list {
  text-align: right;
  font-weight: bold;
  font-size: 20px;
  cursor: pointer;
}
.side-list li {
  padding: 0.2em 1.5em;
  position: relative;
  overflow: hidden;
  margin-left: 5em;
  transition: margin-left 0.8s ease-out, all 0.3s, transform 0.1s linear;
}

.side-list li:hover:active {
  background-color: #eeeeee;
  transform: scale(1.05);
}

.side-list li:hover {
  background-color: #f3f3f3;
  margin-left: 3em;
}
</style>
