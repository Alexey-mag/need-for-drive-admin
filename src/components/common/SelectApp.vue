<template>
  <el-select
    v-model="valueOption"
    multiple
    collapse-tags
    :placeholder="selectLabel"
    @change="updateValue"
  >
    <el-option
      v-for="item of items"
      :key="item.index"
      :label="item[optionLabel]"
      :value="item[optionValue]"
    ></el-option>
  </el-select>
</template>

<script>
  export default {
    name: "SelectApp",
    props: {
      selectLabel: String,
      items: Array,
      optionLabel: String,
      optionValue: String,
    },
    data() {
      return {
        valueOption: [],
      };
    },
    methods: {
      updateValue(val) {
        this.$emit("update", val);
      },
    },
  };
</script>

<style scoped></style>
