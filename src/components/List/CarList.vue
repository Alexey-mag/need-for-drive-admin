<template>
  <div class="car-list__container">
    <el-card class="car-list__card">
      <div slot="header" class="car-list__header">
        <div class="car-list__filters">
          <select-app select-class="car-list__select" />
          <select-app select-class="car-list__select" />
          <select-app select-class="car-list__select" />
        </div>
        <div class="car-list__filter_buttons">
          <button-app
            button-type="danger"
            name="Сбросить"
            button-class="car-list__header_button"
            @click="resetFilters"
          />
          <button-app
            button-type="primary"
            name="Принять"
            button-class="car-list__header_button"
            @click="applyFilters"
          />
        </div>
      </div>
      <el-table
        ref="cars"
        v-if="getOnePageCars.length"
        :data="getOnePageCars"
        stripe
        fit
        row-class-name="car-list__table_row"
        class="car-list__table"
        max-height="700"
        @row-click="editCar"
      >
        <el-table-column prop="name" label="Модель" />
        <el-table-column prop="number" label="Номер" />
        <el-table-column prop="tank" label="Топливо" />
        <el-table-column prop="description" label="Описание" />
        <el-table-column prop="categoryId.name" label="Категория" />
        <el-table-column prop="priceMin" label="Мин. цена" />
        <el-table-column prop="priceMax" label="Макс. цена" />
      </el-table>
      <el-pagination
        class="car-list__card_pagination"
        :page-size="getPageSize"
        layout="prev, pager, next"
        :total="getRowCount"
        @current-change="setCurrentPage"
        :current-page.sync="compPage"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
  import { mapActions, mapGetters, mapMutations } from "vuex";
  import SelectApp from "@/components/common/SelectApp";
  import ButtonApp from "@/components/common/ButtonApp";

  export default {
    name: "CarList",
    components: { ButtonApp, SelectApp },
    computed: {
      ...mapGetters("cars", ["getCars", "getOnePageCars", "getRowCount", "getPageSize", "getPage"]),
      ...mapGetters("car", ["getCar"]),
      compPage: {
        get() {
          return this.getPage + 1;
        },
        set(val) {
          this.setCurrentPage(val);
        },
      },
    },
    methods: {
      ...mapActions("cars", ["fetchCars", "fetchPaginationCars"]),
      ...mapMutations("cars", ["setPage"]),
      ...mapMutations("car", ["setCar"]),
      async editCar(row) {
        await this.setCar(row);
        await this.$router.push({ name: "Car" });
      },
      deleteCar(row) {
        console.log(row);
      },
      setCurrentPage(val) {
        const page = val - 1;
        this.setPage(page);
        this.fetchPaginationCars();
      },
      applyFilters() {
        console.log("apply");
        console.log(this.getPage);
      },
      resetFilters() {
        console.log("reset");
      },
    },
    mounted() {
      this.fetchPaginationCars();
    },
  };
</script>

<style lang="scss">
  .car-list__table {
    width: 100%;
    overflow-y: visible;
  }
  .table__button_edit {
    margin-bottom: 7px;
  }
  .car-list__card {
    border-radius: 9px;
  }
  .car-list__card_pagination {
    margin-right: auto;
    margin-left: 30%;
  }
  .car-list__select {
    width: 150px;
    margin-right: 7px;
  }
  .car-list__header_button {
    margin-right: 7px;
  }
  .car-list__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .car-list__table_row {
    cursor: pointer;
  }
</style>
