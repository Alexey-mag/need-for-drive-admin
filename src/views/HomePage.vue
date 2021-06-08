<template>
  <div class="homepage__container">
    <div class="form__container">
      <header class="homepage__header">
        <img class="header__img" :src="require('@/assets/logo.svg')" alt="" />
        <h1 class="header_title">Need for drive</h1>
      </header>
      <el-card class="homepage__card" shadow="always">
        <el-form label-position="top" ref="form" :model="form" :rules="rules">
          <p class="form__title">Вход</p>
          <input-app label="Почта" :item="form.email" prop-name="email" @update="updateEmail" />
          <input-app
            label="Пароль"
            :item="form.password"
            prop-name="password"
            type="password"
            @update="updatePassword"
          />
          <div class="form__footer">
            <el-link class="form__footer_anchor" type="primary" @click="clearToken">Запросить доступ</el-link>
            <button-app name="Войти" button-type="primary" @click="submitForm('form')" />
          </div>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
  import InputApp from "@/components/common/InputApp";
  import ButtonApp from "@/components/common/ButtonApp";
  import { mapActions } from "vuex";

  export default {
    name: "HomePage",
    data() {
      return {
        form: {
          email: "intern",
          password: "intern-S!",
        },
        rules: {
          email: [{ required: true, message: "Пожалуйста, введите email", trigger: "blur" }],
          password: [
            { required: true, message: "Пожалуйста, введите пароль", trigger: "blur" },
            { min: 8, message: "Длина пароля должна быть не менее 8 символов", trigger: "blur" },
          ],
        },
      };
    },
    components: { ButtonApp, InputApp },
    methods: {
      ...mapActions("user", ["loginUser"]),
      submitForm(formName) {
        this.$refs[formName].validate(async valid => {
          if (valid) {
            const user = {
              email: this.form.email,
              password: this.form.password,
            };
            let res = await this.loginUser(user);
            if (res) {
              this.$router.push("/admin");
            }
          } else {
            return false;
          }
        });
      },
      updateEmail(val) {
        this.form.email = val;
      },
      updatePassword(val) {
        this.form.password = val;
      },
      clearToken() {
        localStorage.removeItem("token");
        localStorage.removeItem("refresh_token");
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
    grid-template-columns: repeat(9, 1fr);
    grid-template-rows: repeat(5, 1fr);
    grid-column-gap: 0;
    grid-row-gap: 0;
  }
  .form__container {
    grid-area: 2 / 4 / 5 / 7;
    align-self: center;
    justify-self: center;
  }
  .homepage__card {
    min-width: 380px;
    min-height: 255px;
    height: fit-content;
    border-radius: 9px !important;
  }
  .homepage__header {
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
  // --------------------------------1023------------------------------------
  @media screen and (max-width: $tablet) {
    .form__container {
      grid-area: 2 / 2 / 5 / 9;
    }
  }
  // --------------------------------568------------------------------------
  @media screen and (max-width: $mobile) {
    .form__container {
      grid-area: 1 / 1 / 6 / 10;
    }
    .form__container {
      justify-self: stretch;
      align-self: center;
    }
    .homepage__card {
      min-width: 320px;
    }
  }
</style>
