<template>
  <el-checkbox-group v-model="model" @change="updateValue" :class="classProp">
    <el-checkbox v-for="item of value" :key="item.index" :label="item" checked></el-checkbox>
  </el-checkbox-group>
</template>

<script>
  export default {
    name: "CheckboxGroupApp",
    data() {
      return {
        model: [],
      };
    },
    props: {
      value: Array,
      classProp: String,
    },
    methods: {
      updateValue() {
        this.$emit("input", this.model);
      },
    },
  };
</script>

<style lang="scss"></style>
