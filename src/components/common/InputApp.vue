<template>
  <el-input :value="value" size="medium" :type="type" :class="inputClass" @input="updateValue"></el-input>
</template>

<script>
  export default {
    name: "InputApp",
    props: ["value", "inputClass", "type"],
    methods: {
      updateValue(val) {
        this.$emit("input", val);
      },
    },
  };
</script>

<style scoped></style>
