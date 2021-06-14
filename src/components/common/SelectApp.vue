<template>
  <el-select
    v-model="valueOption"
    :multiple="multiple"
    collapse-tags
    :placeholder="selectLabel"
    :class="selectClass"
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
      selectClass: String,
      multiple: Boolean
    },
    data() {
      return {
        valueOption: [],
      };
    },
    methods: {
      updateValue() {
        this.$emit("update", this.valueOption);
      },
    },
  };
</script>

<style lang="scss"></style>
