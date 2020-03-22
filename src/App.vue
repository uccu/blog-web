<template>
  <div>
    <Header />
    <Article v-if="article" :key="article" />
    <Detail v-if="detail" v-on:operationloading="pageLoading" />
    <PageLoading v-bind:show="pageLoadingShow" color="white" />
    <Tips v-bind:data="tip" />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Article from "./components/Article.vue";
import Detail from "./components/Detail.vue";
import PageLoading from "./components/PageLoading.vue";
import Tips from "./components/Tips.vue";
import "./assets/css/m.css";
import "./assets/css/iconfont/iconfont.css";
import { goto } from "./Service/tool";
export default {
  name: "App",
  provide() {
    return {
      tips: (value, type = "info") => {
        let arr = {
          error: ["#721c24", "#f8d7da"],
          success: ["#155724", "#d4edda"],
          warn: ["#856404", "#fff3cd"],
          info: ["#004085", "#cce5ff"]
        };
        this.tip = { value, color: arr[type][0], background: arr[type][1] };
      }
    };
  },
  data: function() {
    return {
      detail: false,
      article: true,
      pageLoadingShow: false,
      tip: {}
    };
  },
  components: {
    Header,
    Article,
    Detail,
    PageLoading,
    Tips
  },
  methods: {
    async pageLoading(e) {
      this.pageLoadingShow = true;
      await e();
      this.pageLoadingShow = false;
    },
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
  mounted() {
  }
};
</script>

<style>
</style>
