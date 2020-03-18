<template>
  <div class="one-article-tags">
    <span class="iconfont icon-date">{{data.createTime}}</span>
    <span class="iconfont icon-menu">
      <a class="t">{{data.categoryName}}</a>
    </span>
    <span class="iconfont icon-view">{{data.view}}</span>
    <span class="iconfont icon-reply">{{data.reply}}</span>
  </div>
</template>

<script>
export default {
  name: "Tag",
  props: {
    data: Object
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
</style>
