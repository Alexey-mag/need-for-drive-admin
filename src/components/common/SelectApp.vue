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
      item: String,
      optionLabel: String,
      optionValue: String,
      selectClass: String,
      multiple: Boolean,
    },
    computed: {
      valueOption: {
        get() {
          return this.item;
        },
        set(val) {
          this.updateValue(val);
        },
      },
    },
    methods: {
      updateValue(val) {
        this.$emit("update", val);
      },
    },
  };
</script>

<style lang="scss"></style>
