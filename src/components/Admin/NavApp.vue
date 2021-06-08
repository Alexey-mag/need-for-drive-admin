<template>
  <el-aside class="admin_nav">
    <div class="menu__header">
      <img class="admin__nav_header" :src="require('@/assets/logo.svg')" alt="" />
      <span class="admin__nav_text">Need for car</span>
    </div>
    <el-menu class="admin__menu">
      <el-menu-item class="admin__menu_item" @click="openComp('Car')" index="1">
        <i class="icon-pen admin__menu_icon" />
        <span slot="title">Карточка автомобиля</span>
      </el-menu-item>
      <el-menu-item class="admin__menu_item" @click="openComp('CarList')" index="2">
        <i class="icon-auto_list admin__menu_icon" />
        <span slot="title">Список авто</span>
      </el-menu-item>
      <el-menu-item class="admin__menu_item" @click="openComp('Orders')" index="3">
        <i class="icon-orders admin__menu_icon" />
        <span slot="title">Заказы</span>
      </el-menu-item>
      <el-menu-item class="admin__menu_item" index="4">
        <i class="icon-menu_4 admin__menu_icon" />
        <span slot="title">Menu 4</span>
      </el-menu-item>
      <el-menu-item class="admin__menu_item" index="5">
        <i class="icon-menu_5 admin__menu_icon" />
        <span slot="title">Menu 5</span>
      </el-menu-item>
      <el-menu-item class="admin__menu_item" index="6">
        <i class="icon-menu_6 admin__menu_icon" />
        <span slot="title">Menu 6</span>
      </el-menu-item>
      <el-menu-item index="7">
        <i class="el-icon-warning" />
        <span slot="title">Menu 7</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script>
  export default {
    name: "NavApp",
    methods: {
      openComp(name) {
        this.$router.push({ name: name });
      },
    },
  };
</script>

<style lang="scss">
  .admin_nav {
    grid-area: 1 / 1 / 26 / 11;
    z-index: 100;
    box-shadow: 0 1px 75px rgba(90, 97, 105, 0.11), 0 2px 4px rgba(90, 97, 105, 0.12),
      0 7.5px 11px rgba(90, 97, 105, 0.1), 0 3.5px 17.5px rgba(165, 182, 201, 0.1);
    width: 100% !important;
    min-width: 200px;
  }
  .el-menu {
    height: calc(100vh - 68px);
  }
  .admin__menu_icon {
    font-size: 18px;
    margin-right: 5px;
  }
  .el-menu-item {
    color: $main-text-color;
    box-shadow: inset 0px -1px 0px #e1e5eb;
  }
  .el-menu-item.is-active {
    box-shadow: inset 0px -1px 0px #e1e5eb, inset 4px 0px 0px $main-blue;
  }
  .menu__header {
    display: flex;
    align-items: center;
    width: 100%;
    height: $header-height;
    background: white;
    box-shadow: inset 0px -1px 0px #e1e5eb;
  }
  .admin__nav_header {
    height: 22px;
    width: 22px;
    margin-left: 50px;
    margin-right: 7px;
  }
  .admin__nav_text {
    font-size: 16px;
    line-height: 18px;
    color: $main-text-color;
  }
</style>
