<template>
  <div class="car__container">
    <h1 class="car__title">Карточка Автомобиля</h1>
    <el-card class="car__small_card">
      <p class="card__car_model">{{ carModel }}</p>
      <p class="card__car_category" v-if="carCategory">{{ carCategory }}</p>
      <dropdown-app @update="setImage" />
      <div class="car__progress">
        <p class="car__progress_title">Заполнено</p>
        <el-progress :percentage="percentageLoader"></el-progress>
      </div>
      <div class="car__description">
        <h3 class="car__description_title">Описание</h3>
        <el-input type="textarea" :rows="6" v-model="carDescription" @input="testCarDescription"></el-input>
      </div>
    </el-card>
    <el-card class="car__large_card" :body-style="{ height: '100%' }"
      ><div class="large__card_title">Настройки автомобиля</div>
      <div class="large__card_block1">
        <div class="card__input_block">
          <span class="car__card_input_label">Модель автомобиля</span>
          <input-app input-class="car__input" @update="setCarModel" />
        </div>
        <div class="card__input_block">
          <span class="car__card_input_label">Тип автомобиля</span>
          <select-app
            v-if="getCarCategory"
            select-class="car__input"
            :items="getCarCategory"
            option-label="name"
            option-value="name"
            :multiple="false"
            :select-label="''"
            @update="setCategory"
          />
        </div>
      </div>
      <div class="large__card_block2">
        <div class="card__input_block">
          <span class="car__card_input_label">Доступные цвета</span>
          <div class="car__input_and_button">
            <input-app input-class="car__input" @update="carColor" :input-clear="clear" @clear="clearOff" />
            <el-button class="car__card_input_button" type="default" @click="addColor"
              ><i class="el-icon-plus card__plus_icon"></i
            ></el-button>
          </div>
        </div>
        <checkbox-group-app :items="carColors" @update="setSelectedColors" class-prop="car__card__checkbox" />
        <div class="car__input__price_block">
          <div class="car__column">
            <span class="car__card_input_label">Цена от</span>
            <input-app input-class="car__input_price" type="number" @update="setPriceMin" />
          </div>
          <div class="car__column">
            <span class="car__card_input_label">Цена до</span>
            <input-app input-class="car__input_price" type="number" @update="setPriceMax" />
          </div>
        </div>
      </div>
      <div class="large__card_footer">
        <div class="card_footer_confirm">
          <button-app button-type="primary" name="Сохранить" @click="saveCar" />
          <button-app button-type="default" name="Отменить" />
        </div>
        <div class="card_footer_cancel">
          <button-app button-type="danger" name="Удалить" />
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
  import DropdownApp from "@/components/common/DropdownApp";
  import InputApp from "@/components/common/InputApp";
  import CheckboxGroupApp from "@/components/common/CheckboxGroupApp";
  import { mapActions, mapGetters } from "vuex";
  import SelectApp from "../common/SelectApp";
  import ButtonApp from "../common/ButtonApp";

  export default {
    name: "CarCard",
    components: { ButtonApp, SelectApp, CheckboxGroupApp, DropdownApp, InputApp },
    data() {
      return {
        carDescription: "",
        carModel: "",
        color: "",
        carColors: [],
        selectedColors: [],
        thumbnail: {},
        carCategory: "",
        clear: false,
        priceMin: null,
        priceMax: null,
        percentage: {
          dropdown: false,
          carDescription: false,
          carModel: false,
          carCategory: false,
          carColors: false,
          priceMin: false,
          priceMax: false,
        },
      };
    },
    computed: {
      ...mapGetters("car", ["getCarCategory"]),
      percentageLoader() {
        let validatedFields = 0;
        const percent = Object.values(this.percentage);
        percent.forEach(el => {
          if (el === true) {
            validatedFields += 1;
          }
        });
        const result = (100 / 7) * validatedFields;
        return Math.ceil(result);
      },
    },
    methods: {
      ...mapActions("car", ["fetchCarCategory", "postCar"]),
      setCarModel(model) {
        this.carModel = model;
        if (this.carModel !== "") {
          this.percentage.carModel = true;
        }
      },
      setSelectedColors(colors) {
        if (colors.length > 0) {
          this.selectedColors = colors;
        }
      },
      testCarDescription() {
        if (this.carDescription !== "") {
          this.percentage.carDescription = true;
        }
      },
      setImage(file) {
        this.thumbnail.originalname = file.name;
        this.thumbnail.size = file.size;
        this.thumbnail.mimetype = file.raw.type;
        this.thumbnail.path = file.url;
        console.log(this.thumbnail);
        this.percentage.dropdown = true;
      },
      carColor(color) {
        this.color = color;
      },
      addColor() {
        this.percentage.carColors = true;
        if (this.carColors.includes(this.color)) {
          return this.carColors;
        } else {
          this.carColors.push(this.color);
        }
        this.clear = true;
      },
      clearOff() {
        this.clear = false;
      },
      setCategory(val) {
        this.carCategory = val;
        if (this.carCategory !== "") {
          this.percentage.carCategory = true;
        }
      },
      saveCar() {
        const car = {
          name: this.carModel,
          description: this.carDescription,
          priceMin: this.priceMin,
          priceMax: this.priceMax,
          colors: this.selectedColors.length > 0 ? this.selectedColors : this.carColors,
          categoryId: this.carCategory,
          thumbnail: this.thumbnail,
        };
        this.postCar(car);
      },
      setPriceMin(val) {
        this.priceMin = Number(val);
        this.percentage.priceMin = true;
      },
      setPriceMax(val) {
        this.priceMax = Number(val);
        this.percentage.priceMax = true;
      },
    },
    mounted() {
      this.fetchCarCategory();
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
    width: 45%;
  }
  .car__input__price_block {
    display: flex;
    flex-flow: row;
    margin-top: 15px;
    min-width: 200px;
    width: 45%;
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
    width: 100%;
  }
  .car__input_price {
    width: 100px;
    margin-right: 15px;
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
  .car__card__checkbox {
    display: flex;
    flex-flow: column;
    margin-top: 15px;
  }
  .large__card_footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 100px;
  }
  .car__column {
    display: flex;
    flex-flow: column;
  }
</style>
