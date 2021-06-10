<template>
  <div class="car__container">
    <h1 class="car__title">Карточка Автомобиля</h1>
    <el-card class="car__small_card">
      <p class="card__car_model">{{ carModel }}</p>
      <p class="card__car_category">{{ carCategory }}</p>
      <dropdown-app />
      <div class="car__progress">
        <p class="car__progress_title">Заполнено</p>
        <el-progress :percentage="50"></el-progress>
      </div>
      <div class="car__description">
        <h3 class="car__description_title">Описание</h3>
        <el-input type="textarea" :rows="6" v-model="carDescription"></el-input>
      </div>
    </el-card>
    <el-card class="car__large_card"
      ><div class="large__card_title">Настройки автомобиля</div>
      <div class="large__card_block1">
        <div class="card__input_block">
          <span class="car__card_input_label">Модель автомобиля</span>
          <input-app input-class="car__input" @update="setCarModel" />
        </div>
        <div class="card__input_block">
          <span class="car__card_input_label">Тип автомобиля</span>
          <input-app input-class="car__input" />
        </div>
      </div>
      <div class="large__card_block2">
        <div class="card__input_block">
          <span class="car__card_input_label">Доступные цвета</span>
          <div class="car__input_and_button">
            <input-app input-class="car__input" @update="carColor" />
            <el-button class="car__card_input_button" type="default"
              ><i class="el-icon-plus card__plus_icon"></i
            ></el-button>
          </div>
        </div>
        <checkbox-group-app :items="carColors" />
      </div>
    </el-card>
  </div>
</template>

<script>
  import DropdownApp from "@/components/common/DropdownApp";
  import InputApp from "@/components/common/InputApp";
  import CheckboxGroupApp from "@/components/common/CheckboxGroupApp";

  export default {
    name: "CarCard",
    components: { CheckboxGroupApp, DropdownApp, InputApp },
    data() {
      return {
        carDescription: "",
        carModel: "",
        carColors: [],
        carCategory: "",
      };
    },
    methods: {
      setCarModel(model) {
        this.carModel = model;
      },
      setCarColors(colors) {
        this.carColors = colors;
      },
      carColor(color) {
        this.carColors.push(color);
      },
    },
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
    position: relative;
    display: flex;
    flex-flow: column;
    justify-content: flex-end;
    width: 470px;
    min-height: 400px;
    height: auto;
    margin-top: 90px;
    margin-right: 20px;
  }
  .car__large_card {
    margin-top: 90px;
    width: 100%;
    height: 860px;
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
  .car__description_title {
    font-weight: 500;
    font-size: 13px;
    line-height: 15px;
    letter-spacing: -0.408571px;
    color: #868e96;
    margin-bottom: 14px;
  }
  .car__progress {
    height: 60px;
    width: 100%;
    box-shadow: 0px -1px 0px rgba(0, 0, 0, 0.12), 0px 1px 0px rgba(0, 0, 0, 0.12);
    margin-bottom: 22px;
  }
  .car__progress_title {
    padding-top: 14px;
    font-size: 13px;
    line-height: 15px;
    color: #868e96;
  }
  .el-upload-list--picture-card .el-upload-list__item {
    position: absolute;
    top: 35px;
    right: 45px;
  }
  .large__card_title {
    font-weight: 500;
    font-size: 17.5px;
    line-height: 21px;
    letter-spacing: -0.4375px;
    color: #3d5170;
    padding-bottom: 43px;
  }
  .card__input_block {
    display: flex;
    flex-flow: column;
    min-width: 200px;
    flex-shrink: 0;
  }
  .large__card_block1 {
    display: flex;
    flex-flow: row;
    margin-bottom: 30px;
    justify-content: space-between;
  }
  .large__card_block2 {
    display: flex;
    flex-flow: column;
  }
  .car__card_input_button {
    display: flex;
    justify-content: center;
    width: 30px !important;
    height: 36px;
    margin-left: 8px;
  }
  .card__plus_icon {
    font-size: 25px;
    line-height: 10px;
    color: #becad6;
  }
  .car__card_input_label {
    font-size: 10.5px;
    line-height: 12px;
    letter-spacing: -0.18421px;
    color: #495057;
  }
  .car__input_and_button {
    display: flex;
    flex-flow: row;
  }
  .car__input {
    min-width: 200px;
    width: 320px;
  }
  .card__car_model {
    align-self: center;
    justify-self: center;
    text-align: center;
    font-size: 24.5px;
    line-height: 28px;
    letter-spacing: -0.6125px;
    color: #3d5170;
    margin-bottom: 5px;
    margin-top: 10px;
  }
  .card__car_category {
    font-size: 12.5px;
    line-height: 14px;
    text-align: center;
    letter-spacing: -0.3125px;
    color: #818ea3;
    margin-bottom: 10px;
  }
</style>
