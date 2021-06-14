<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  import { mapGetters, mapMutations, mapActions } from "vuex";

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
      ...mapMutations("user", ["createBase64Token"]),
      ...mapActions("user", ["refreshToken", "logoutUser"]),
    },
    mounted() {
      if (localStorage.getItem("tokenCreated")) {
        const tokenAge = Date.now() - localStorage.getItem("tokenCreated");
        if (tokenAge < 86100000) {
          this.refreshToken();
        } else {
          this.logoutUser();
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
