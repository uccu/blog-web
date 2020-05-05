<template>
  <div>
    <div @click="ss">{{text}}</div>
    <input type="file" />
  </div>
</template>

<script>
~(function(w) {
  var A = function(f) {
    if (!w[f])
      ["", "webkit", "moz", "ms"].forEach(function(d) {
        if (w[d + f]) w[f] = w[d + f];
      });
    return w[f];
  };

  w.PlayPrompt = function(url) {
    this.ac = new (A("AudioContext"))();
    this.source = null;
    this.audioBuffer = null;
    this.times = 0;
    this.loadAudioFile(url);
  };

  w.PlayPrompt.prototype.play = function() {
    if (this.audioBuffer) this.playSound();
    else this.times++;
  };

  w.PlayPrompt.prototype.playSound = function() {
    delete this.source;
    this.source = this.ac.createBufferSource();
    this.source.buffer = this.audioBuffer;
    this.source.connect(this.ac.destination);
    this.source.start(0, 0);
  };
  w.PlayPrompt.prototype.initSound = function(arrayBuffer) {
    var that = this;
    that.ac.decodeAudioData(
      arrayBuffer,
      function(buffer) {
        that.audioBuffer = buffer;
        for (; that.times > 0; ) {
          that.times--;
          that.playSound();
        }
      },
      function(e) {
        console.log("Error decoding file", e);
      }
    );
  };

  w.PlayPrompt.prototype.loadAudioFile = function(url) {
    var xhr;
    if (w.XMLHttpRequest) xhr = new w.XMLHttpRequest();
    else if (w.ActiveXObject) {
      try {
        xhr = new w.ActiveXObject("Msxml2.HTTP");
      } catch (e) {
        try {
          xhr = new w.ActiveXObject("microsoft.HTTP");
        } catch (e) {
          alert("请升级你的浏览器");
        }
      }
    }
    var that = this;
    xhr.open("GET", url, true);
    xhr.responseType = "arraybuffer";
    xhr.onload = function() {
      that.initSound(this.response);
    };
    xhr.send();
  };
})(window);

export default {
  name: "Test",
  data() {
    return {
      text: 123
    };
  },
  mounted() {
    window.z = new window.PlayPrompt("http://static.baka");
  },
  methods: {
    ss() {
      window.z.play();
    }
  }
};
</script>

<style>
</style>
