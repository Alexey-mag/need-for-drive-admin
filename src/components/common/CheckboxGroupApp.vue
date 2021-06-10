<template>
  <el-checkbox-group v-model="model" @change="updateVal" text-color="danger">
    <el-checkbox v-for="item of items" :key="item.index"></el-checkbox>
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
    },
    methods: {
      updateVal(val) {
        this.$emit("update", val);
      },
    },
  };
</script>

<style scoped></style>
