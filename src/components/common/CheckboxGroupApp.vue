<template>
  <el-checkbox-group v-model="model" @change="updateVal" text-color="danger" :class="classProp">
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
    props: {
      items: Array,
      classProp: String,
    },
    methods: {
      updateVal(val) {
        this.$emit("update", val);
      },
    },
  };
</script>

<style lang="scss"></style>
