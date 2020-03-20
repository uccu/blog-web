<template>
  <div class="article-container">
    <div class="article-blank t"></div>
    <div class="article-box">
      <Loading color="#00bcd4" v-bind:show="loading" />
      <div class="article" v-bind:class="{show:!loading}">
        <div class="article-title">{{info.title}}</div>
        <Tag v-bind:data="info" />
        <div class="article-hr"></div>
        <Content v-bind:content="info.content" />
      </div>
      <Comment v-bind:class="{show:!loading}" v-bind:id="info.id" v-if="!loading" />
    </div>
  </div>
</template>

<script>
import { api } from "../Service/tool";
import STATIC from "../Service/static";
import Loading from "./Loading.vue";
import Content from "./Content.vue";
import Comment from "./Comment.vue";
import { markdown } from "markdown";
import Tag from "./Tag.vue";
export default {
  name: "Detail",
  data: function() {
    return {
      info: {},
      loading: true
    };
  },
  components: { Tag, Loading, Content, Comment },
  props: {},
  methods: {},
  mounted() {
    this.loading = true;
    api(STATIC.API_LIST.ARTICLE, { id: location.pathname.split("/")[2] })
      .then(data => {
        data.info.content = markdown.toHTML(data.info.content);
        this.info = data.info;
        this.loading = false;
      })
      .catch(() => {
        this.loading = false;
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@media (max-width: 1465px) {
  .article-blank {
    width: 0;
  }
}
@media (min-width: 1465px) {
  .article-blank {
    width: 250px;
  }
}
.article-container {
  display: flex;
  max-width: 100%;
}
.article-box {
  flex: 1;
  text-align: center;
  padding-top: 20px;
  max-width: 100%;

  min-height: 300px;
}
.article {
  width: 800px;
  max-width: 90%;
  opacity: 0;
  text-align: left;
  margin: auto;
  box-shadow: 0 0 10px #ccc;
}
.article.show {
  opacity: 1;
}
.article-title {
  font-size: 2em;
  padding-top: 20px;
  margin: 10px 20px;
}
.article-hr {
  height: 1px;
  border-bottom: 1px solid #f0f0f0;
  margin: 10px 20px;
}
</style>
