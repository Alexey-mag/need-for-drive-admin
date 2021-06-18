import axios from "axios";

export default {
  namespaced: true,
  state: {
    car: {
      id: null,
      priceMin: null,
      priceMax: null,
      name: "",
      number: "",
      tank: null,
      description: "",
      categoryId: {},
      colors: [],
      thumbnail: {},
    },
    carCategory: null,
  },
  mutations: {
    setCar(state, payload) {
      state.car = payload;
    },
    setCarCategory(state, payload) {
      state.carCategory = payload;
    },
    setCarName(state, payload) {
      state.car.name = payload;
    },
    setCarNumber(state, payload) {
      state.car.number = payload;
    },
    setCarId(state, payload) {
      state.car.id = payload;
    },
    setCarPriceMin(state, payload) {
      state.car.priceMin = payload;
    },
    setCarPriceMax(state, payload) {
      state.car.priceMax = payload;
    },
    setCarDescription(state, payload) {
      state.car.description = payload;
    },
    setCarCategoryId(state, payload) {
      state.car.categoryId = payload;
    },
    setCarColors(state, payload) {
      state.car.colors = payload;
    },
    setCarThumbnail(state, payload) {
      state.car.thumbnail = payload;
    },
    setThumbnailPath(state, payload) {
      state.car.thumbnail.path = payload;
    },
    setCarTank(state, payload) {
      state.car.tank = payload;
    },
  },
  actions: {
    async fetchCarCategory({ commit }) {
      this.commit("shared/clearError");
      this.commit("shared/setLoading", true);
      try {
        const { data } = await axios({
          url: process.env.VUE_APP_API_PROD + "/category/",
          method: "get",
          headers: {
            "X-Api-Factory-Application-Id": `${process.env["VUE_APP_API_FACTORY_ID"]}`,
            "Content-Type": "application/json",
          },
        });
        commit("setCarCategory", data.data);
        this.commit("shared/setLoading", false);
      } catch (e) {
        this.commit("shared/setLoading", false);
        this.commit("shared/setError", e.message);
        throw e;
      }
    },
    async postCar({ state }, payload) {
      this.commit("shared/clearError");
      this.commit("shared/setLoading", true);
      const category = payload.categoryId;
      const catObj = state.carCategory.find(el => {
        return el.name === category;
      });
      state.car = payload;
      state.car.categoryId = catObj;
      try {
        await axios({
          url: process.env.VUE_APP_API_PROD + "/car/",
          method: "post",
          headers: {
            "X-Api-Factory-Application-Id": `${process.env["VUE_APP_API_FACTORY_ID"]}`,
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token"),
          },
          data: {
            id: state.car.id,
            name: state.car.name,
            number: state.car.number,
            description: state.car.description,
            colors: state.car.colors,
            priceMin: state.car.priceMin,
            priceMax: state.car.priceMax,
            categoryId: state.car.categoryId,
            thumbnail: state.car.thumbnail,
          },
        });
        this.commit("shared/setLoading", false);
      } catch (e) {
        this.commit("shared/setLoading", false);
        this.commit("shared/setError", e.message);
        throw e;
      }
    },
  },
  getters: {
    getCar(state) {
      return state.car;
    },
    getCarCategory(state) {
      return state.carCategory;
    },
    getCarName(state) {
      return state.car.name;
    },
    getCarId(state) {
      return state.car.id;
    },
    getCarPriceMin(state) {
      return state.car.priceMin;
    },
    getCarPriceMax(state) {
      return state.car.priceMax;
    },
    getCarDescription(state) {
      return state.car.description;
    },
    getCarCategoryId(state) {
      return state.car.categoryId;
    },
    getCarColors(state) {
      return state.car.colors;
    },
    getCarThumbnail(state) {
      return state.car.thumbnail;
    },
    getCarNumber(state) {
      return state.car.number;
    },
    getCarTank(state) {
      return state.car.tank;
    },
  },
};
