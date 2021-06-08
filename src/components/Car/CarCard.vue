<template>
  <div class="car__container">
    <h1 class="car__title">Карточка Автомобиля</h1>
    <el-card class="car__small_card"> car </el-card>
    <el-card class="car__large_card"><div>Настройки автомобиля</div></el-card>
  </div>
</template>

<script>
  export default {
    name: "CarCard",
  };
</script>

<style lang="scss">
  .car__container {
    display: flex;
    flex-flow: row;
    position: relative;
    width: 100%;
    height: calc(100% - 90px);
  }
  .car__small_card {
    display: flex;
    flex-flow: column;
    width: 500px;
    min-height: 400px;
    height: auto;
    margin-top: 90px;
    margin-right: 20px;
  }
  .car__large_card {
    margin-top: 90px;
    width: 100%;
    height: 100%;
  }
  .car__title {
    position: absolute;
    left: 0;
    top: 0;
    font-size: 29px;
    line-height: 33px;
    letter-spacing: -0.725px;
    color: #3d5170;
  }
</style>
