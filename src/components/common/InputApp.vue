<template>
  <el-form-item :label="label" :prop="item">
    <el-input v-model="model" size="medium" @input="updateValue"></el-input>
  </el-form-item>
</template>

<script>
  export default {
    name: "InputApp",
    props: {
      label: String,
      item: String,
    },
    data() {
      return {
        model: "",
      };
    },
    methods: {
      updateValue() {
        this.$emit("value", this.model);
      },
    },
  };
</script>

<style scoped></style>
