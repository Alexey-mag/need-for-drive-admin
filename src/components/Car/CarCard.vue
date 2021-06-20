<template>
  <div class="car__container">
    <h1 class="car__title">Карточка Автомобиля</h1>
    <el-form label-position="top" ref="formCar" :model="formCar" :rules="rules" class="car__card_form">
      <el-card class="car__small_card">
        <img v-if="formCar.id" :src="imgPath()" class="car__img" />
        <img v-else :src="formCar.thumbnail.path" class="car__img" />
        <p class="card__car_model">{{ formCar.name }}</p>
        <p class="card__car_category">{{ formCar.categoryId }}</p>
        <el-form-item prop="thumbnail">
          <input type="file" size="medium" @change="setImage" accept="image/png, image/jpeg, image/jpg" />
        </el-form-item>
        <div class="car__progress">
          <p class="car__progress_title">Заполнено</p>
          <el-progress :percentage="percentageLoader"></el-progress>
        </div>
        <div class="car__description">
          <el-form-item label="Описание" prop="description">
            <el-input type="textarea" :rows="4" v-model="formCar.description"></el-input>
          </el-form-item>
        </div>
      </el-card>
      <el-card class="car__large_card" :body-style="{ height: '100%' }"
        ><div class="large__card_title">Настройки автомобиля</div>
        <div class="large__card_block1">
          <div class="card__input_block">
            <el-form-item label="Модель автомобиля" prop="name">
              <input-app :item="formCar.name" input-class="car__input" @update="setFormCarModel" />
            </el-form-item>
          </div>
          <div class="card__input_block">
            <el-form-item label="Тип автомобиля" prop="categoryId">
              <select-app
                v-if="getCarCategory"
                select-class="car__input"
                :items="getCarCategory"
                :item="formCar.categoryId"
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
          <el-form-item prop="colors">
            <checkbox-group-app :items="formCar.colors" @update="setSelectedColors" class-prop="car__card__checkbox" />
          </el-form-item>
          <div class="car__input__price_block">
            <el-form-item label="Цена от" prop="priceMin">
              <input-app :item="formCar.priceMin" input-class="car__input_price" type="number" @update="setPriceMin" />
            </el-form-item>
            <el-form-item label="Цена до" prop="priceMax">
              <input-app :item="formCar.priceMax" input-class="car__input_price" type="number" @update="setPriceMax" />
            </el-form-item>
          </div>
          <el-form-item label="Номер" prop="number">
            <input-app :item="formCar.number" input-class="car__input_price" @update="setFormCarNumber" />
          </el-form-item>
          <el-form-item label="Бензин" prop="tank">
            <input-app :item="formCar.tank" input-class="car__input_price" type="number" @update="setFormCarTank" />
          </el-form-item>
        </div>
        <div class="large__card_footer">
          <div class="card_footer_confirm">
            <button-app
              button-type="primary"
              button-class="card_footer_confirm_button"
              name="Сохранить"
              @click="submitForm('formCar')"
            />
            <button-app button-type="info" name="Отменить" @click="clearForm('formCar')" />
          </div>
          <div class="card_footer_cancel">
            <button-app button-type="danger" name="Удалить" @click="deleteSelectedCar" />
          </div>
        </div>
      </el-card>
    </el-form>
  </div>
</template>

<script>
  import InputApp from "@/components/common/InputApp";
  import CheckboxGroupApp from "@/components/common/CheckboxGroupApp";
  import { mapActions, mapGetters, mapMutations } from "vuex";
  import SelectApp from "../common/SelectApp";
  import ButtonApp from "../common/ButtonApp";

  export default {
    name: "CarCard",
    components: { ButtonApp, SelectApp, CheckboxGroupApp, InputApp },
    data() {
      const checkTank = (rule, value, callback) => {
        if (value < 0 || value > 100) {
          callback(new Error("Кол-во бензина должно быть от 0 до 100"));
        } else {
          callback();
        }
      };
      const checkPrice = (rule, value, callback) => {
        if (!value) {
          return callback(new Error("Пожалуйста, введите цену автомобиля"));
        }
        if (value < 0) {
          callback(new Error("Цена должна быть положительным числом больше 0"));
        } else {
          callback();
        }
      };
      const checkThumbnail = (rule, value, callback) => {
        if (value.path === undefined) {
          return callback(new Error("Пожалуйста, загрузите изображение автомобиля"));
        } else {
          callback();
        }
      };
      return {
        formCar: {
          id: "",
          number: "",
          tank: 0,
          description: "",
          name: "",
          thumbnail: {},
          categoryId: "",
          priceMin: 0,
          priceMax: 0,
          colors: [],
          selectedColors: [],
        },
        rules: {
          name: [{ required: true, message: "Пожалуйста, введите модель автомобиля", trigger: "blur" }],
          description: [{ required: true, message: "Пожалуйста, введите описание автомобиля", trigger: "blur" }],
          priceMin: [{ validator: checkPrice, trigger: "blur" }],
          priceMax: [{ validator: checkPrice, trigger: "blur" }],
          thumbnail: [{ validator: checkThumbnail, trigger: "blur" }],
          tank: [{ validator: checkTank, trigger: "blur" }],
          categoryId: [{ required: true, message: "Пожалуйста, выберите категорию автомобиля", trigger: "blur" }],
          number: [{ max: 6, message: "Длина номера не должна превышать 6 символов", trigger: "blur" }],
        },
        color: "",
      };
    },
    computed: {
      ...mapGetters("car", ["getCarCategory", "getCar", "isNewCar"]),
      percentageLoader() {
        let fieldsToValidate;
        let validatedFields = 0;
        let colors = 0;
        this.formCar.id ? (fieldsToValidate = 10) : (fieldsToValidate = 9);
        const percent = Object.values(this.formCar);
        percent.forEach(el => {
          if (typeof el === "string") {
            el === "" ? (validatedFields += 0) : (validatedFields += 1);
          }
          if (typeof el === "number") {
            el <= 0 ? (validatedFields += 0) : (validatedFields += 1);
          }
          if (typeof el === "object") {
            if (el.length && el.length !== 0) {
              colors = 1;
            }
            el.path ? (validatedFields += 1) : (validatedFields += 0);
          }
        });
        validatedFields += colors;
        const result = (validatedFields / fieldsToValidate) * 100;
        return Math.ceil(result);
      },
    },
    methods: {
      ...mapActions("car", ["fetchCarCategory", "postCar", 'deleteCar']),
      ...mapMutations("car", ["setNewCar"]),
      setFormCarModel(val) {
        this.formCar.name = val;
      },
      setSelectedColors(colors) {
        this.formCar.selectedColors = colors;
      },
      setImage(event) {
        const image = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = e => {
          this.formCar.thumbnail = {
            size: image.size,
            originalname: image.name,
            mimetype: image.type,
            path: e.target.result,
          };
        };
      },
      carColor(color) {
        this.color = color;
      },
      addColor() {
        if (this.color) {
          if (this.formCar.colors.includes(this.color)) {
            return this.formCar.colors;
          } else {
            this.formCar.colors.push(this.color);
          }
        }
        this.color = "";
      },
      setCategory(val) {
        this.formCar.categoryId = val;
      },
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            if (this.formCar.selectedColors.length === 0) {
              delete this.formCar.selectedColors;
            } else {
              this.formCar.colors = this.formCar.selectedColors;
              delete this.formCar.selectedColors;
            }
            this.postCar(this.formCar);
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
      },
      deleteSelectedCar() {
          this.$confirm('Вы точно хотите удалить выбранную машину?', 'Внимание', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Отмена',
            type: 'warning'
          }).then(() => {
            this.deleteCar(this.formCar)
            this.$message({
              type: 'success',
              message: 'Машина удалена'
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: 'Удаление отменено'
            });
          });
      },
      setPriceMin(val) {
        this.formCar.priceMin = Number(val);
      },
      setPriceMax(val) {
        this.formCar.priceMax = Number(val);
      },
      setFormCarNumber(val) {
        this.formCar.number = val;
      },
      setFormCarTank(val) {
        this.formCar.tank = Number(val);
      },
      imgPath() {
        return `${process.env.VUE_APP_API_IMG}${this.formCar.thumbnail.path}`;
      },
    },
    updated() {
      if (this.isNewCar) {
        this.formCar.name = this.getCar.name;
        this.formCar.description = this.getCar.description;
        this.formCar.id = this.getCar.id;
        this.formCar.number = this.getCar.number;
        this.formCar.name = this.getCar.name;
        this.formCar.priceMin = this.getCar.priceMin;
        this.formCar.priceMax = this.getCar.priceMax;
        this.formCar.priceMax = this.getCar.priceMax;
        this.formCar.thumbnail = this.getCar.thumbnail;
        this.formCar.categoryId = this.getCar.categoryId.name;
        this.formCar.colors = this.getCar.colors;
        this.formCar.tank = this.getCar.tank;
        this.setNewCar(false);
      }
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
    border-radius: 9px;
  }
  .car__large_card {
    display: flex;
    flex-flow: column;
    position: relative;
    margin-top: 90px;
    width: 700px;
    height: auto;
    min-height: 860px;
    min-width: 500px;
    border-radius: 9px;
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
  .card_footer_confirm_button {
    margin-right: 7px;
  }
  .car__img {
    width: 245px;
    height: 110px;
    position: absolute;
    top: 35px;
    left: 45px;
    object-fit: cover;
  }
  // --------------------------------1100------------------------------------
  @media screen and (max-width: $tablet) {
    .car__card_form {
      flex-flow: column;
      align-items: center;
    }
  }
</style>
