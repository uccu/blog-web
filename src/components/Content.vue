<template>
  <div class="article-content" v-html="content"></div>
</template>

<script>
// import hljs from "highlight.js";
import "../assets/css/highlight/vs2015.css";
export default {
  name: "Content",
  props: {
    content: String
  },
  updated() {
    this.$el.querySelectorAll("pre code").forEach(block => {
      window.hljs.highlightBlock(block);
    });
  }
};
</script>

<style>
.article-content {
  margin: 10px 20px;
  min-height: 500px;
  margin-bottom: 50px;
  padding-bottom: 20px;
}
</style>
