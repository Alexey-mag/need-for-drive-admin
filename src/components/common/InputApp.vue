<template>
  <el-input v-model="model" size="medium" :type="type" :class="inputClass" @input="updateValue"></el-input>
</template>

<script>
  export default {
    name: "InputApp",
    props: {
      item: String,
      type: String,
      inputClass: String,
      inputClear: Boolean,
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
    updated() {
      if (this.inputClear) {
        this.model = "";
        this.$emit("clear");
      }
    },
    mounted() {
      this.model = this.item;
    },
  };
</script>

<style scoped></style>
