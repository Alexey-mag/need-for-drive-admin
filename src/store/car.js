import axios from "axios";

export default {
  namespaced: true,
  state: {
    car: {
      priceMin: null,
      priceMax: null,
      name: "",
      description: "",
      categoryId: {},
      colors: [],
      thumbnail: {},
    },
    carCategory: null,
  },
  mutations: {
    setCarCategory(state, payload) {
      state.carCategory = payload;
    },
    setCarModel(state, payload) {
      state.car.name = payload;
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
            name: state.car.name,
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
    getCarCategory(state) {
      return state.carCategory;
    },
    getCarModel(state) {
      return state.car.name;
    },
  },
};
