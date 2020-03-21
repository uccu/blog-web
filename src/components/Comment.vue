<template>
  <div class="comment" id="comment">
    <div class="reply-box">
      <div class="df email-and-name">
        <div class="email f1">
          <label for="email">
            <span class="iconfont icon-mail"></span>邮箱：
          </label>
          <span>
            <input
              id="email"
              name="email"
              v-model="email"
              v-bind:class="{active:email}"
              type="text"
              placeholder="请填写邮箱地址"
            />
            <div class="input-bottom-bar"></div>
          </span>
        </div>
        <div class="name f1">
          <label for="name">
            <span class="iconfont icon-name"></span>名字：
          </label>
          <span>
            <input
              id="name"
              name="name"
              v-model="name"
              v-bind:class="{active:name}"
              type="text"
              placeholder="请填写名字"
            />
            <div class="input-bottom-bar"></div>
          </span>
        </div>
      </div>
      <div class="comment-area">
        <textarea
          name="comment"
          id="comment"
          cols="30"
          rows="4"
          v-bind:class="{active:comment}"
          v-on:keyup="inputKeyup($event)"
          v-on:mouseup="inputKeyup($event)"
          placeholder="请填写内容（审核后显示）"
        ></textarea>
      </div>
      <div class="reply">
        <span class="iconfont icon-fasong" v-on:click="reply"></span>
      </div>
    </div>

    <div class="replys">
      <div class="one-reply" v-for="r in replys" v-bind:key="r.id" v-bind:class="{self:r.self}">
        <div class="avatar">
          <img v-bind:src="r.avatar" />
        </div>
        <div class="icomment">
          <h5>{{r.name}}</h5>
          <p>{{r.comment}}</p>
          <div class="time">{{r.createTime}}</div>
          <div class="replyit" v-on:click="replyit(r.name)">回复</div>
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
  name: "Comment",
  data() {
    return {
      name: "",
      email: "",
      comment: "",
      replys: [],
      sending: false,
      loadingPage: false,
      noArticle: false,
      noArticleMsg: "下拉加载更多回复~",
      page: 0,
      replyNameList: new Set()
    };
  },
  components: {
    Loading
  },
  props: {
    id: String
  },
  methods: {
    inputKeyup() {
      const t = document.getElementsByTagName("textarea")[0];
      this.replyNameList.forEach(e => {
        if (t.value.search("@" + e + " ") === -1) {
          this.replyNameList.delete(e);
        }
      });
      this.comment = t.value;

      let arr = [],
        lens = 0;
      this.replyNameList.forEach(e => {
        let len = e.length;
        arr.push({ name: e, length: len, start: lens, end: lens + len + 2 });
        lens += len + 2;
      });

      for (let i = arr.length - 1; i >= 0; i--) {
        if (t.selectionStart > arr[i].start && t.selectionStart < arr[i].end) {
          t.selectionStart = arr[i].start;
        }
      }
      for (let i = 0; i < arr.length; i++) {
        if (t.selectionEnd > arr[i].start && t.selectionEnd < arr[i].end) {
          t.selectionEnd = arr[i].end;
        }
      }
    },
    replyit(name) {
      let len = 0;
      this.replyNameList.forEach(e => {
        len += e.length + 2;
      });
      if (name) {
        this.replyNameList.add(name.replace(" ", "-"));
        let names = "";
        this.replyNameList.forEach(e => {
          names += "@" + e + " ";
        });
        const t = document.getElementsByTagName("textarea")[0];
        this.comment = t.value = names + t.value.slice(len);
        len = 0;
        this.replyNameList.forEach(e => {
          len += e.length + 2;
        });
        document
          .getElementsByTagName("textarea")[0]
          .setSelectionRange(len - name.length - 2, len);
      }

      document.documentElement.scrollTop =
        document.getElementById("comment").getBoundingClientRect().top +
        document.documentElement.scrollTop -
        document.documentElement.clientHeight / 3;
      document.getElementsByTagName("textarea")[0].focus();
    },
    reply() {
      if (this.sending == true) return;
      this.sending = true;
      let { name, email, comment, id } = this;
      api(STATIC.API_LIST.REPLY, { name, email, comment, id })
        .then(() => {
          this.name = "";
          this.email = "";
          this.comment = "";
          document.getElementsByTagName("textarea")[0].value = '';
          this.sending = false;
          this.page = 0;
          this.noArticle = false;
          alert("回复成功");
          this.replys = [];
          window.removeEventListener("scroll", this.handleScroll);
          window.addEventListener("scroll", this.handleScroll);
          this.getReply();
        })
        .catch(e => {
          this.sending = false;
          alert(e);
        });
    },
    handleScroll() {
      const {
        offsetHeight,
        scrollTop,
        clientHeight
      } = document.documentElement;

      if (clientHeight + scrollTop + 100 > offsetHeight) {
        this.getReply();
      }
    },
    getReply() {
      if (this.noArticle) return;
      if (this.loadingPage) return;
      this.page++;
      this.loadingPage = true;
      let data = { page: this.page, id: this.id };
      api(STATIC.API_LIST.REPLYS, data)
        .then(data => {
          this.replys.push(...data.list);
          if (!data.list.length) {
            this.noArticle = true;
            this.noArticleMsg = "没有更多回复了~";
            window.removeEventListener("scroll", this.handleScroll);
          }
          this.loadingPage = false;
        })
        .catch(() => {
          this.noArticle = true;
          this.noArticleMsg = "没有更多回复了~";
          window.removeEventListener("scroll", this.handleScroll);
          this.loadingPage = false;
        });
    }
  },
  mounted() {
    console.log(this.id);
    window.addEventListener("scroll", this.handleScroll);
    this.getReply();
  }
};
</script>

<style scoped>
@media (max-width: 660px) {
  label {
    display: none;
  }
  .email-and-name {
    display: block;
  }
  .icomment {
    margin-left: 0 !important;
    width: 90% !important;
  }
  .avatar {
    display: none;
  }
}
.comment {
  width: 800px;
  max-width: 90%;
  opacity: 0;
  text-align: left;
  margin: auto;
}
.reply-box {
  box-shadow: 0 0 10px #ccc;
}
.replys {
  padding: 20px 20px;
}
.comment.show {
  opacity: 1;
}
.email-and-name {
  padding: 20px 0;
  position: relative;
}
.email-and-name > div {
  padding: 10px 20px;
  color: #666;
  max-width: 50%;
  position: relative;
}
.email-and-name > div input {
  margin-left: 20px;
  padding: 10px;
}
.email-and-name span {
  position: relative;
}
.comment-area {
  padding: 0 20px;
}
.comment-area textarea {
  resize: none;
  width: calc(100% - 20px);
  padding: 10px;
  line-height: 24px;
  outline: none;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: all 0.3s;
}
.comment-area textarea:focus {
  border: 1px solid #4dd0e1;
  box-shadow: 0 0 5px #4dd0e1;
}
.comment-area textarea.active {
  border: 1px solid #4dd0e1;
}
input {
  outline: none;
  border: none;
  border-bottom: 1px solid #ccc;
  box-shadow: inset 0 0 0 1000px #fff !important;
}
input ~ .input-bottom-bar {
  position: absolute;
  bottom: -10px;
  left: 20px;
  width: 0;
  height: 4px;
  background-color: #4dd0e1;
  transition: width 0.3s;
}
input:focus ~ .input-bottom-bar,
input.active ~ .input-bottom-bar {
  width: calc(100% - 20px);
}
label span {
  font-size: 1.1em;
}
.reply {
  text-align: right;
  padding-right: 20px;
}
.reply span {
  color: #00bcd4;
  cursor: pointer;
  font-size: 2em;
  transition: all 0.3s;
}
.reply span:hover {
  color: #4dd0e1;
}
.replys {
  text-align: center;
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
.one-reply {
  position: relative;
  text-align: left;
  padding-bottom: 15px;
  margin-bottom: 20px;
}
.one-reply.self {
  text-align: right;
}
.one-reply .avatar img {
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: 0;
  width: 48px;
  height: 48px;
}
.one-reply.self .avatar img {
  right: 0;
  left: auto;
}
.one-reply .icomment {
  padding: 20px;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2);
  background: #fff;
  width: 70%;
  margin: auto;
  margin-left: 70px;
  position: relative;
  border-radius: 2px;
  word-wrap: break-word;
  border-top-left-radius: 0px;
  top: 15px;
  text-align: left;
}
.one-reply.self .icomment {
  margin-left: auto;
  margin-right: 80px;
}
.icomment::before {
  content: "";
  width: 0;
  height: 0;
  border-style: solid;
  border-color: transparent #fff transparent transparent;
  position: absolute;
  top: 0;
  left: -14px;
  border-width: 0 14px 14px 0;
  filter: drop-shadow(-2px 0px 1px rgba(0, 0, 0, 0.2));
}
.one-reply.self .icomment::before {
  left: auto;
  right: -14px;
  border-width: 14px 14px 14px 14px;
  border-color: #fff transparent transparent transparent;
  filter: drop-shadow(2px -1px 1px rgba(0, 0, 0, 0.1));
}
h5 {
  color: #00bcd4;
  cursor: pointer;
  transition: all 0.3s;
  padding: 0;
  margin: auto;
  display: inline-block;
}
h5:hover {
  color: #4dd0e1;
}
.time {
  position: absolute;
  right: 5px;
  bottom: 5px;
  font-size: 0.5em;
  color: #ccc;
  cursor: default;
}
.replyit {
  position: absolute;
  right: 7px;
  top: 5px;
  font-size: 0.5em;
  color: #00bcd4;
  cursor: pointer;
  transition: color 0.3s;
}
.replyit:hover {
  color: #4dd0e1;
}
</style>
