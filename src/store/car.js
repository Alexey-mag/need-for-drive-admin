import axios from "axios";

export default {
  namespaced: true,
  state: {
    car: {
      id: '',
      name: "",
      description: "",
      number: "",
      tank: 0,
      thumbnail: {},
      categoryId: {},
      priceMin: 0,
      priceMax: 0,
      colors: [],
    },
    isNewCar: false,
    carCategory: null,
  },
  mutations: {
    setCar(state, payload) {
      state.car = payload;
      console.log(state.car);
      state.isNewCar = true
    },
    setNewCar(state, payload) {
      state.isNewCar = payload
    },
    setCarCategory(state, payload) {
      state.carCategory = payload;
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
      } catch (e) {
        this.commit("shared/setError", e.message);
        throw e;
      } finally {
        this.commit("shared/setLoading", false);
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
      let method
      let url
       if (state.car.id) {
         method = 'put'
         url = process.env.VUE_APP_API_PROD + "/car/" + state.car.id
       } else {
         method = 'post'
         url =process.env.VUE_APP_API_PROD + "/car/"
       }
      try {
        await axios({
          url: url,
          method: method,
          headers: {
            "X-Api-Factory-Application-Id": `${process.env["VUE_APP_API_FACTORY_ID"]}`,
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token"),
          },
          data: { ...state.car }
        });
      } catch (e) {
        this.commit("shared/setError", e.message);
        throw e;
      } finally {
        this.commit("shared/setLoading", false);
      }
    },
    async deleteCar({state}, payload) {
      this.commit("shared/clearError");
      this.commit("shared/setLoading", true);
      state.car = payload;
      try {
        await axios({
          url: process.env.VUE_APP_API_PROD + "/car/" + state.car.id,
          method: 'delete',
          headers: {
            "X-Api-Factory-Application-Id": `${process.env["VUE_APP_API_FACTORY_ID"]}`,
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token"),
          },
        });
      } catch (e) {
        this.commit("shared/setError", e.message);
        throw e;
      } finally {
        this.commit("shared/setLoading", false);
      }
    }
  },
  getters: {
    getCar(state) {
      return state.car;
    },
    isNewCar(state) {
      return state.isNewCar
    },
    getCarCategory(state) {
      return state.carCategory;
    },
  },
};
