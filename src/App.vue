<template>
  <div>
    <Header />
    <Article v-if="article" :key="article" />
    <Detail v-if="detail" />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Article from "./components/Article.vue";
import Detail from "./components/Detail.vue";
import "./assets/css/m.css";
import "./assets/css/iconfont/iconfont.css";
import { goto } from "./Service/tool";
export default {
  name: "App",
  data: function() {
    return { detail: false, article: true };
  },
  components: {
    Header,
    Article,
    Detail
  },
  methods: {
    goto() {
      let paths = location.pathname.split("/");
      if (location.pathname == "/") {
        this.detail = false;
        this.article = location.pathname;
      }
      if (paths[1] == "article") {
        this.detail = true;
        this.article = false;
      }
      if (paths[1] == "list") {
        this.detail = false;
        this.article = location.pathname;
      }
    }
  },
  beforeMount() {
    window.addEventListener("popstate", this.goto);
    goto(location.pathname);
  },
  mounted() {}
};
</script>

<style>
</style>
