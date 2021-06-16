<template>
  <div class="car__container">
    <h1 class="car__title">Карточка Автомобиля</h1>
    <el-form label-position="top" ref="formCar" :model="formCar" :rules="rules" class="car__card_form">
      <el-card class="car__small_card">
        <p class="card__car_model">{{ formCar.carModel }}</p>
        <p class="card__car_category" v-if="formCar.carCategory">{{ formCar.carCategory }}</p>
        <el-form-item prop="thumbnail">
          <dropdown-app @update="setImage" />
        </el-form-item>
        <div class="car__progress">
          <p class="car__progress_title">Заполнено</p>
          <el-progress :percentage="percentageLoader"></el-progress>
        </div>
        <div class="car__description">
          <el-form-item label="Описание" prop="carDescription">
            <el-input type="textarea" :rows="4" v-model="formCar.carDescription" @input="testCarDescription"></el-input>
          </el-form-item>
        </div>
      </el-card>
      <el-card class="car__large_card" :body-style="{ height: '100%' }"
        ><div class="large__card_title">Настройки автомобиля</div>
        <div class="large__card_block1">
          <div class="card__input_block">
            <el-form-item label="Модель автомобиля" prop="carModel">
              <input-app :item="formCar.carModel" input-class="car__input" @update="setCarModel" />
            </el-form-item>
          </div>
          <div class="card__input_block">
            <el-form-item label="Тип автомобиля" prop="carCategory">
              <select-app
                v-if="getCarCategory"
                select-class="car__input"
                :items="getCarCategory"
                :item="formCar.carCategory"
                option-label="name"
                option-value="name"
                :multiple="false"
                :select-label="''"
                @update="setCategory"
              />
            </el-form-item>
          </div>
        </div>
        <div class="large__card_block2">
          <div class="card__input_block">
            <div class="car__input_and_button">
              <el-form-item label="Доступные цвета">
                <input-app :item="color" input-class="car__input" @update="carColor" />
              </el-form-item>
              <el-button class="car__card_input_button" type="default" @click="addColor"
                ><i class="el-icon-plus card__plus_icon"></i
              ></el-button>
            </div>
          </div>
          <el-form-item prop="carColors">
            <checkbox-group-app
              :items="formCar.carColors"
              :item="formCar.selectedColors"
              @update="setSelectedColors"
              class-prop="car__card__checkbox"
            />
          </el-form-item>
          <div class="car__input__price_block">
            <el-form-item label="Цена от" prop="priceMin">
              <input-app :item="formCar.priceMin" input-class="car__input_price" type="number" @update="setPriceMin" />
            </el-form-item>
            <el-form-item label="Цена до" prop="priceMax">
              <input-app :item="formCar.priceMax" input-class="car__input_price" type="number" @update="setPriceMax" />
            </el-form-item>
          </div>
        </div>
        <div class="large__card_footer">
          <div class="card_footer_confirm">
            <button-app button-type="primary" name="Сохранить" @click="submitForm('formCar')" />
            <button-app button-type="default" name="Отменить" @click="clearForm('formCar')" />
          </div>
          <div class="card_footer_cancel">
            <button-app button-type="danger" name="Удалить" />
          </div>
        </div>
      </el-card>
    </el-form>
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
      const checkPrice = (rule, value, callback) => {
        if (!value) {
          return callback(new Error("Пожалуйста, введите цену автомобиля"));
        }
        if (value <= 0) {
          callback(new Error("Цена должна быть положительным числом больше 0"));
        } else {
          callback();
        }
      };
      const checkThumbnail = (rule, value, callback) => {
        if (Object.keys(value).length === 0) {
          return callback(new Error("Пожалуйста, загрузите изображение автомобиля"));
        } else {
          callback();
        }
      };
      return {
        formCar: {
          carDescription: "",
          carModel: "",
          thumbnail: {},
          carCategory: "",
          priceMin: null,
          priceMax: null,
          carColors: [],
          selectedColors: [],
        },
        rules: {
          carModel: [{ required: true, message: "Пожалуйста, введите модель автомобиля", trigger: "blur" }],
          carDescription: [{ required: true, message: "Пожалуйста, введите описание автомобиля", trigger: "blur" }],
          priceMin: [{ validator: checkPrice, trigger: "blur" }],
          priceMax: [{ validator: checkPrice, trigger: "blur" }],
          thumbnail: [{ validator: checkThumbnail, trigger: "blur" }],
          carCategory: [{ required: true, message: "Пожалуйста, выберите категорию автомобиля", trigger: "blur" }],
        },
        color: "",
        clear: false,
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
        this.formCar.carModel = model;
        this.percentage.carModel = this.formCar.carModel !== "";
      },
      setSelectedColors(colors) {
        this.formCar.selectedColors = colors;
      },
      testCarDescription() {
        this.percentage.carDescription = this.formCar.carDescription !== "";
      },
      setImage(file) {
        this.formCar.thumbnail.size = file.size;
        this.formCar.thumbnail.mimetype = file.raw.type;
        this.formCar.thumbnail.path = file.raw;
        this.formCar.thumbnail.originalname = file.raw.name;
        this.percentage.dropdown = true;
      },
      carColor(color) {
        this.color = color;
      },
      addColor() {
        if (this.color) {
          this.percentage.carColors = true;
          if (this.formCar.carColors.includes(this.color)) {
            return this.formCar.carColors;
          } else {
            this.formCar.carColors.push(this.color);
          }
        }
        this.color = "";
      },
      clearOff() {
        this.clear = false;
      },
      setCategory(val) {
        this.formCar.carCategory = val;
        this.percentage.carCategory = this.formCar.carCategory !== "";
      },
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            const car = {
              name: this.formCar.carModel,
              description: this.formCar.carDescription,
              priceMin: this.formCar.priceMin,
              priceMax: this.formCar.priceMax,
              colors: this.formCar.selectedColors.length > 0 ? this.selectedColors : this.carColors,
              categoryId: this.formCar.carCategory,
              thumbnail: this.formCar.thumbnail,
            };
            this.postCar(car);
            this.$message.success("Успех! Машина сохранена.");
          } else {
            this.$notify.error({
              title: "Ошибка заполнения формы",
              message: "Пожалуйста, заполните все поля корректно",
            });
          }
        });
      },
      clearForm(formName) {
        this.$refs[formName].resetFields();
        //TODO отрефакторить!
        this.percentage.dropdown = false;
        this.percentage.carDescription = false;
        this.percentage.carCategory = false;
        this.percentage.carColors = false;
        this.percentage.carModel = false;
        this.percentage.priceMax = false;
        this.percentage.priceMin = false;
      },
      setPriceMin(val) {
        this.formCar.priceMin = Number(val);
        this.percentage.priceMin = this.formCar.priceMin !== 0;
      },
      setPriceMax(val) {
        this.formCar.priceMax = Number(val);
        this.percentage.priceMax = this.formCar.priceMax !== 0;
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
    width: inherit;
    height: inherit;
  }
  .car__card_form {
    display: flex;
    flex-flow: row;
  }
  .car__small_card {
    position: relative;
    display: flex;
    flex-flow: column;
    justify-content: flex-end;
    width: 335px;
    min-width: 335px;
    height: 550px;
    margin-top: 90px;
    margin-right: 20px;
  }
  .car__large_card {
    display: flex;
    flex-flow: column;
    position: relative;
    margin-top: 90px;
    width: 700px;
    height: 860px;
    min-width: 500px;
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
    margin-bottom: -12px;
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
    align-items: center;
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
  }
  .large__card_footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 90%;
    position: absolute;
    bottom: 20px;
  }
  .car__column {
    display: flex;
    flex-flow: column;
  }

  // --------------------------------1100------------------------------------
  @media screen and (max-width: $tablet) {
    .car__card_form {
      flex-flow: column;
      align-items: center;
    }
  }
</style>
