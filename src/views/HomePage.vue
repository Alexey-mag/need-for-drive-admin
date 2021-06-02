<template>
  <div class="homepage__container">
    <header class="homepage__header">
      <img class="header__img" :src="require('@/assets/logo.svg')" alt="" />
      <h1 class="header_title">Need for drive</h1>
    </header>
    <el-card class="homepage__card" shadow="always">
      <el-form label-position="top" ref="form" :model="form" :rules="rules">
        <p class="form__title">Вход</p>
        <input-app label="Почта" :item="login" />
        <input-app label="Пароль" :item="password" />
        <div class="form__footer">
          <a href="" class="form__footer_anchor">Запросить доступ</a>
          <button-app name="Войти" button-type="primary" @click="loginUser" />
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import InputApp from "@/components/common/InputApp";
  import ButtonApp from "@/components/common/ButtonApp";
  export default {
    name: "HomePage",
    data() {
      return {
        login: "",
        password: "",
      };
    },
    components: { ButtonApp, InputApp },
    methods: {
      loginUser() {
        console.log("login");
      },
    },
  };
</script>

<style lang="scss">
  .homepage__container {
    background: $main-background;
    width: 100vw;
    height: 100vh;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    grid-column-gap: 0;
    grid-row-gap: 0;
  }
  .homepage__card {
    grid-area: 2 / 2 / 3 / 3;
    min-width: 380px;
    min-height: 255px;
    height: fit-content;
    border-radius: 9px !important;
  }
  .homepage__header {
    grid-area: 1 / 2 / 2 / 3;
    display: flex;
    align-items: flex-end;
    justify-content: center;
  }
  .form__title {
    margin-left: auto;
    margin-bottom: 35px;
    font-size: 17.5px;
    line-height: 20px;
    text-align: center;
    letter-spacing: -0.4375px;
    color: $main-text-color;
  }
  .form__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .form__footer_anchor {
    text-decoration: none;
    font-size: 10.5px;
    line-height: 12px;
    color: $main-blue;
  }
  .header__img {
    width: 45px;
    height: 45px;
    margin-bottom: 17px;
  }
  .header_title {
    font-size: 24px;
    line-height: 28px;
    color: $main-text-color;
    margin-left: 12px;
    margin-bottom: 26px;
  }
</style>
