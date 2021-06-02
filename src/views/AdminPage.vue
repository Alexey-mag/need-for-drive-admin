<template>
  <div class="home">
    <button-set-app />
    <br />
    <button-app
      button-type="primary"
      name="DO IT!"
      button-event="action"
      @action="doThis"
    />
    <el-form>
      <input-app label="Tag name" :item="inputData" @value="doThis" />
    </el-form>
    <select-app
      :items="cars"
      select-label="Select car"
      option-label="name"
      option-value="year"
      @update="doThis"
    />
    <checkbox-group-app :items="cars" checkbox-label="name" />
    <dropdown-app />
  </div>
</template>

<script>
  import ButtonSetApp from "@/components/common/ButtonGroupApp";
  import ButtonApp from "@/components/common/ButtonApp";
  import InputApp from "@/components/common/InputApp";
  import SelectApp from "@/components/common/SelectApp";
  import CheckboxGroupApp from "@/components/common/CheckboxGroupApp";
  import DropdownApp from "@/components/common/DropdownApp";
  export default {
    name: "AdminPage",
    components: {
      DropdownApp,
      CheckboxGroupApp,
      SelectApp,
      InputApp,
      ButtonApp,
      ButtonSetApp,
    },
    data() {
      return {
        inputData: "",
        cars: [
          {
            name: "Lada",
            year: 2010,
            price: "30 000",
          },
          {
            name: "Mazda",
            year: 2015,
            price: "870 000",
          },
          {
            name: "Jeep",
            year: 2018,
            price: "930 000",
          },
          {
            name: "Nissan",
            year: 1999,
            price: "80 000",
          },
        ],
      };
    },
    methods: {
      doThis(val) {
        console.log("cars", val);
      },
    },
  };
</script>

<style scoped></style>
