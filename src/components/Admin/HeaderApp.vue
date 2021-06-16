<template>
  <el-header class="admin__header">
    <div class="header__search">
      <i class="el-icon-search admin__search_icon" />
      <span class="admin__header__search_text">Поиск ...</span>
    </div>
    <div class="header_notification">
      <i class="icon-notification"></i>
      <div class="header_notification_number">2</div>
    </div>
    <el-dropdown trigger="click" class="header__dropdown" @command="logout">
      <div>
        <el-avatar class="header__dropdown_avatar" :size="42" :src="require('@/assets/user-avatar.jpg')" />
        <span class="header__dropdown_title">Admin</span>
        <i class="el-icon-arrow-down header__dropdown_arrow"></i>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-close">Выйти</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-header>
</template>

<script>
  import { mapActions } from "vuex";

  export default {
    name: "HeaderApp",
    methods: {
      ...mapActions("user", ["logoutUser"]),
      logout() {
        this.logoutUser();
      },
    },
  };
</script>

<style lang="scss">
  .admin__header {
    grid-area: 1 / 9 / 4 / 46;
    background: white;
    height: $header-height !important;
    display: flex;
    flex-wrap: wrap;
    flex-flow: row;
    z-index: 100;
  }
  .header__search {
    display: flex;
    height: 100%;
    width: 65%;
    align-items: center;
  }
  .admin__header__search_text {
    font-size: 13px;
    line-height: 15px;
    color: #767f9d;
  }
  .admin__search_icon {
    font-size: 18px;
    color: #cacedb;
    margin-right: 15px;
  }
  .header_notification {
    position: relative;
    width: 68px;
    box-shadow: 0.5px 0 0 #cacedb, -0.5px 0px 0px #cacedb;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .icon-notification {
    font-size: 18px;
    color: #818ea3;
  }
  .header_notification_number {
    background: #c4183c;
    width: 14px;
    height: 14px;
    position: absolute;
    bottom: 18px;
    right: 18px;
    border-radius: 50%;
    color: white;
    font-size: 9px;
    line-height: 13px;
    text-align: center;
  }
  .header__dropdown {
    width: 180px;
    cursor: pointer;
    display: flex;
    align-items: center;
  }
  .header__dropdown_arrow {
    margin-left: 30px;
  }
  .header__dropdown_title {
    margin-left: 15px;
  }
  .header__dropdown_avatar {
    margin-left: 25px;
  }
  .el-dropdown-selfdefine {
    display: flex;
    align-items: center;
  }
</style>
