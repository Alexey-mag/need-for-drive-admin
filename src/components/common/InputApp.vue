<template>
  <el-form-item :label="label" :prop="propName">
    <el-input v-model="model" size="medium" :type="type" @input="updateValue"></el-input>
  </el-form-item>
</template>

<script>
  export default {
    name: "InputApp",
    props: {
      label: String,
      item: String,
      propName: String,
      type: String,
    },
    data() {
      return {
        model: "",
      };
    },
    methods: {
      updateValue() {
        this.$emit("update", this.model);
      },
    },
    mounted() {
      this.model = this.item;
    },
  };
</script>

<style scoped></style>
