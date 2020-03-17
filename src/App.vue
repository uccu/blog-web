<template>
  <div>
    <Header />

    <Article />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Article from "./components/Article.vue";
import "./assets/css/m.css";
import "./assets/css/iconfont/iconfont.css";
export default {
  name: "App",
  components: {
    Header,
    Article
  }
};
</script>

<style>
</style>
