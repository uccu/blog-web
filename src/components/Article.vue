<template>
  <div class="article-container">
    <div class="article-blank"></div>
    <div class="article-list">
      <div class="one-article" v-for="a in articles" v-bind:key="a.id">
        <div
          v-if="a.thumb"
          class="one-article-picture"
          v-bind:style="{'background-image':'url(\''+a.thumb+'\')','background-color':'#f0f0f0'}"
        ></div>
        <div v-if="a.title" class="one-article-title">
          <a class="t">{{a.title}}</a>
        </div>
        <div v-if="a.description" class="one-article-description">{{a.description}}</div>
        <div class="one-article-hr"></div>
        <div class="one-article-tags">
          <span class="iconfont icon-date">{{a.createTime}}</span>
          <span class="iconfont icon-menu">
            <a class="t">{{a.categoryName}}</a>
          </span>
          <span class="iconfont icon-view">{{a.view}}</span>
          <span class="iconfont icon-reply">{{a.reply}}</span>
        </div>
      </div>
      <div class="article-bottom">
        <Loading color="#00bcd4" v-bind:show="loadingPage" />
        <div class="no-article" v-bind:class="{show:!loadingPage}">{{noArticleMsg}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { api } from "../Service/tool";
import STATIC from "../Service/static";
import Loading from "./Loading.vue";
export default {
  name: "Article",
  data: function() {
    return {
      articles: [],
      page: 0,
      loadingPage: false,
      noArticle: false,
      noArticleMsg: "下拉加载更多~"
    };
  },
  components: {
    Loading
  },
  props: {},
  methods: {
    handleScroll() {
      console.log(1);
      const {
        offsetHeight,
        scrollTop,
        clientHeight
      } = document.documentElement;

      if (clientHeight + scrollTop + 100 > offsetHeight) {
        this.getArticle();
      }
    },
    getArticle() {
      console.log(2);
      if (this.noArticle) return;
      if (this.loadingPage) return;
      console.log(3);
      this.page++;
      this.loadingPage = true;
      api(STATIC.API_LIST.ARTICLES, { page: this.page }).then(data => {
        this.articles.push(...data.list);
        if (!data.list.length) {
          this.noArticle = true;
          this.noArticleMsg = "没有更多文章了~";
          window.removeEventListener("scroll", this.handleScroll);
        }
        this.loadingPage = false;
      });
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    this.getArticle();
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
}
.article-list {
  flex: 1;
  text-align: center;
  padding-top: 20px;
}
.one-article {
  margin: 40px auto;
  width: 600px;
  text-align: left;
  box-shadow: 0 0 10px #ccc;
}
.one-article-title {
  color: #00bcd4;
  font-size: 1.5em;
  margin: auto 20px;
  margin-bottom: 10px;
  padding-top: 10px;
}
.one-article-description {
  margin: 10px 20px;
  padding-top: 10px;
  cursor: default;
}
.one-article-picture {
  height: 300px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
  transition: background-size 0.2s linear;
}
.one-article-hr {
  height: 1px;
  border-bottom: 1px solid #f0f0f0;
  margin: 10px 20px;
}
.one-article-picture:hover {
  background-size: 110%;
}
.one-article-tags {
  margin: 10px 20px;
  padding-bottom: 10px;
}
.one-article-tags .iconfont {
  font-size: 14px;
  color: #999;
  margin-right: 20px;
  cursor: default;
}
.article-bottom {
  height: 200px;
}
.no-article {
  color: #ccc;
  opacity: 0;
  height: 0px;
  transition: all 0.3s;
}
.no-article.show {
  opacity: 1;
  height: 30px;
}
</style>
