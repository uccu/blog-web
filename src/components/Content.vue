<template>
  <div class="article-content" v-html="content"></div>
</template>

<script>
export default {
  name: "Content",
  props: {
    content: String
  }
};
</script>

<style>
.article-content {
  margin: 10px 20px;
  min-height: 500px;
  margin-bottom: 50px;
}
.article-content img {
  margin: auto;
}
.article-content a {
  color: #00bcd4 !important;
  transition: all 0.3s;
}
.article-content a:hover {
  color: #4dd0e1 !important;
}
.article-content code {
  font-family: "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
  color: #666;
  white-space: pre;
  padding: 16px;
  overflow: auto;
  font-size: 0.85rem;
  line-height: 1.6rem;
  -webkit-font-smoothing: initial;
  -moz-osx-font-smoothing: initial;
  background-color: #f6f8fa;
  border-radius: 3px;
  display: block;
}
.article-content p em {
  cursor: pointer;
  padding: 0 3px;
}
.article-content em {
  color: #00bcd4 !important;
  transition: all 0.3s;
}
.article-content em:hover {
  color: #4dd0e1 !important;
}
</style>
