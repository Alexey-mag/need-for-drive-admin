<template>
  <el-button size="small" :type="buttonType" :class="buttonClass" @click="doAction">{{ name }}</el-button>
</template>

<script>
  export default {
    name: "ButtonApp",
    props: {
      name: String,
      buttonType: String,
      buttonClass: String,
    },
    methods: {
      doAction() {
        this.$emit("click");
      },
    },
  };
</script>

<style scoped></style>
