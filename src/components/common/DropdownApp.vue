<template>
  <div>
    <el-upload
      ref="upload"
      :auto-upload="false"
      :on-change="setCarImage"
      action="https://jsonplaceholder.typicode.com/posts/"
      accept="image/png, image/jpeg, image/jpg"
      list-type="picture-card"
      :limit="1"
      class="dropdown__input"
    >
      <div class="dropdown__image_name">{{ imgName }}</div>
      <el-button slot="trigger" type="default" plain class="dropdown__button">Обзор</el-button>
    </el-upload>
  </div>
</template>

<script>
  export default {
    name: "DropdownApp",
    data() {
      return {
        imgName: "",
      };
    },
    methods: {
      setCarImage(file) {
        console.log(file);
        this.imgName = file.name;
        this.$emit("update", file);
      },
    },
  };
</script>

<style lang="scss">
  .dropdown__input {
    margin-bottom: 22px;
  }
  .dropdown__image_name {
    position: absolute;
    top: 0;
    left: 10px;
    z-index: 50;
    width: 170px;
    overflow: hidden;
  }
  .dropdown__input:hover {
    .dropdown__button {
      border-bottom: 0.5px solid $main-blue;
      border-left: 0.5px solid $main-blue;
    }
  }
  .dropdown__button {
    height: 39px !important;
    position: absolute;
    right: 0;
    border: white;
    border-left: 0.5px solid #becad6;
    border-bottom: 0.5px solid #becad6;
    background: #e9ecef;
    z-index: 20;
  }
</style>
