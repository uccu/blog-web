<template>
  <div>
    <TopBar v-bind:siteName="siteName" v-on:click-menu="showSide = true" />
    <SlideTopBar v-bind:siteName="siteName" v-on:click-menu="showSide = true" />
    <Side v-bind:showSide="showSide" v-bind:menu="menu" v-on:click-cover="showSide = false" />
  </div>
</template>

<script>
import { api } from "../Service/tool";
import STATIC from "../Service/static";
import Side from "./Side.vue";
import TopBar from "./TopBar.vue";
import SlideTopBar from "./SlideTopBar.vue";
export default {
  name: "Header",
  data: function() {
    return {
      siteName: "Y4",
      showSide: false,
      menu: [2020, 2019]
    };
  },
  watch: {
    showSide: function(showSide, oldVal) {
      if (showSide == oldVal) return showSide;
      if (showSide) {
        document.styleSheets[0].addRule("body", "overflow:hidden !important");
      } else {
        document.styleSheets[0].deleteRule(
          document.styleSheets[0].rules.length - 1
        );
      }
      return showSide;
    }
  },
  components: {
    Side,
    TopBar,
    SlideTopBar
  },
  props: {},
  methods: {
    openSlide() {
      console.log("emit openSide");
      this.showSide = true;
    }
  },
  mounted() {
    api(STATIC.API_LIST.MENU).then(data => {
      this.menu = data.list;
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
