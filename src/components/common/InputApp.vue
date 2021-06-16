<template>
  <el-input v-model="model" size="medium" :type="type" :class="inputClass" @input="updateValue"></el-input>
</template>

<script>
  export default {
    name: "InputApp",
    props: ["item", "inputClass", "type"],
    //         {
    //   item: String || Number,
    //   type: String,
    //   inputClass: String,
    // },
    computed: {
      model: {
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
    mounted() {
      this.model = this.item;
    },
  };
</script>

<style scoped></style>
