<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from "vuex";

  export default {
    name: "App",
    data() {
      return {
        windowWidth: window.innerWidth,
      };
    },
    computed: {
      ...mapGetters("shared", ["error"]),
    },
    watch: {
      error() {
        if (this.error) {
          this.$notify.error({
            title: "Ошибка",
            message: this.error,
          });
        }
      },
    },
    methods: {
      ...mapMutations("shared", ["setWindowWidth"]),
      ...mapMutations("user", ["createBase64Token", "refreshToken"]),
    },
    mounted() {
      if (localStorage.getItem("tokenCreated")) {
        const tokenAge = localStorage.getItem("tokenCreated") - Date.now();
        if (tokenAge > 21600000 && tokenAge < 86100000) {
          this.refreshToken();
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("refresh_token");
          localStorage.removeItem("tokenCreated");
        }
      } else {
        this.createBase64Token();
      }
      this.setWindowWidth(this.windowWidth);
      window.onresize = () => {
        this.windowWidth = window.innerWidth;
        this.setWindowWidth(this.windowWidth);
      };
    },
  };
</script>

<style lang="scss">
  #app {
  }

  #nav {
    padding: 30px;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
</style>
