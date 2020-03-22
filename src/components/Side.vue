<template>
  <div>
    <div class="side t" v-bind:class="{ show: showSide }">
      <div class="side-title" v-on:click="gotoHome">
        <span class="iconfont icon-home"></span>
      </div>
      <ul class="side-list">
        <a v-for="m in menu" v-bind:key="m" v-on:click="gotoYear(m)">
          <li class="t">{{ m }}</li>
        </a>
      </ul>
      <div class="version">v{{version}}</div>
    </div>
    <div class="cover" v-on:click="$emit('click-cover')" v-bind:class="{ show: showSide }"></div>
  </div>
</template>

<script>
import { goto } from "../Service/tool";
import STATIC from "../Service/static";
export default {
  name: "Side",
  props: {
    showSide: Boolean,
    menu: Array
  },
  data() {
    return {
      version: STATIC.VERSION
    };
  },
  methods: {
    gotoHome() {
      goto("/");
    },
    gotoYear(m) {
      goto("/list/0/" + m);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@media (max-width: 1465px) {
  .side {
    left: -250px;
  }
  .side.show {
    left: 0px;
  }
}
@media (min-width: 1465px) {
  .side {
    left: 0;
  }
}
.cover {
  top: -100%;
  left: 0;
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: 0.1;
  z-index: 9999;
  transition: top 0.3s;
}
.cover.show {
  top: 0;
}
.side {
  top: 0;
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
.version {
  position: absolute;
  bottom: 10px;
  right: 10px;
  font-size: 0.8em;
  color: #ccc;
}
</style>
