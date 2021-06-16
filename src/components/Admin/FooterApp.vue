<template>
  <el-footer class="admin__footer">
    <div class="admin__footer_links">
      <div class="footer_left">
        <span class="footer_left_text">Главная страница</span>
        <span class="footer_left_text">Ссылка</span>
      </div>
      <span class="footer_right">Copyright © 2020 Simbirsoft</span>
    </div>
  </el-footer>
</template>

<script>
  export default {
    name: "FooterApp",
  };
</script>

<style lang="scss">
  .admin__footer {
    grid-area: 23 / 9 / 26 / 46;
    background: white;
    height: $header-height !important;
    display: flex;
    flex-wrap: wrap;
    flex-flow: row;
    align-self: flex-end;
    align-items: center;
  }
  .admin__footer_links {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
  .footer_left_text {
    font-size: 14px;
    line-height: 16px;
    color: $main-blue;
    margin-right: 16px;
    cursor: pointer;
  }
  .footer_right {
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    color: $main-text-color;
  }
</style>
