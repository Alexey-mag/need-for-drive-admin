<template>
  <el-checkbox-group v-model="model" @change="updateValue" :class="classProp">
    <el-checkbox v-for="item of items" :key="item.index" :label="item" checked></el-checkbox>
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
    // computed: {
    //   model: {
    //     get() {
    //       return this.item;
    //     },
    //     set(val) {
    //       this.updateValue(val);
    //     },
    //   },
    // },
    props: {
      items: Array,
      classProp: String,
    },
    methods: {
      updateValue(val) {
        this.$emit("update", val);
      },
    },
  };
</script>

<style lang="scss"></style>
