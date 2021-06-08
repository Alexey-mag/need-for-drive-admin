<template>
  <el-container class="admin__container">
    <header-app />
    <nav-app />
    <el-main class="admin_main">
      <router-view />
    </el-main>
  </el-container>
</template>

<script>
  import NavApp from "@/components/Admin/NavApp";
  import HeaderApp from "@/components/Admin/HeaderApp";
  export default {
    name: "AdminPage",
    components: { HeaderApp, NavApp },
    data() {
      return {};
    },
    methods: {},
  };
</script>

<style lang="scss">
  .admin__container {
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-columns: repeat(45, 1fr);
    grid-template-rows: repeat(25, 1fr);
    grid-column-gap: 0;
    grid-row-gap: 0;
    background: $main-background;
  }
  .admin__header {
  }
  .admin_main {
    grid-area: 4 / 11 / 26 / 46;
  }
</style>
