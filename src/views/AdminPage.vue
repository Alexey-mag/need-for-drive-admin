<template>
  <el-container class="admin__container">
    <el-header class="admin__header"></el-header>
    <el-aside class="admin_nav"></el-aside>
    <el-main class="admin_main">
      <router-view />
    </el-main>
  </el-container>
</template>

<script>
  export default {
    name: "AdminPage",
    components: {},
    data() {
      return {};
    },
    methods: {},
  };
</script>

<style lang="scss">
  .admin__container {
    display: grid;
    grid-template-columns: repeat(45, 1fr);
    grid-template-rows: repeat(25, 1fr);
    grid-column-gap: 0;
    grid-row-gap: 0;
  }
  .admin__header {
    grid-area: 1 / 8 / 4 / 46;
  }
  .admin_nav {
    grid-area: 1 / 1 / 26 / 8;
  }
  .admin_main {
    grid-area: 4 / 8 / 26 / 46;
  }
</style>
