import axios from "axios";

export default {
  namespaced: true,
  state: {
    cars: [],
    onePageCars: [],
    page: 0,
    pageSize: 8,
    rowsLimit: 8,
    rowCount: null,
    fields: [],
  },
  mutations: {
    setCars(state, payload) {
      state.cars = payload;
    },
    setOnePageCars(state, payload) {
      state.onePageCars = payload;
    },
    setPage(state, payload) {
      state.page = payload;
    },
    setRowCount(state, payload) {
      state.rowCount = payload;
    },
    setFields(state, payload) {
      state.fields = Object.keys(payload);
    },
  },
  actions: {
    async fetchCars({ commit }) {
      this.commit("shared/clearError");
      this.commit("shared/setLoading", true);
      try {
        const { data } = await axios({
          url: process.env.VUE_APP_API_PROD + "/car/",
          method: "get",
          headers: {
            "X-Api-Factory-Application-Id": `${process.env["VUE_APP_API_FACTORY_ID"]}`,
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token"),
          },
        });
        commit("setCars", data.data);
        this.commit("shared/setLoading", false);
      } catch (e) {
        this.commit("shared/setLoading", false);
        this.commit("shared/setError", e.message);
        throw e;
      }
    },
    async fetchPaginationCars(context) {
      this.commit("shared/clearError");
      this.commit("shared/setLoading", true);
      try {
        const { data } = await axios({
          url: process.env.VUE_APP_API_PROD + "/car/",
          method: "get",
          headers: {
            "X-Api-Factory-Application-Id": `${process.env["VUE_APP_API_FACTORY_ID"]}`,
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token"),
          },
          params: {
            page: context.state.page,
            limit: context.state.rowsLimit,
          },
        });
        context.commit("setRowCount", data.count);
        context.commit("setFields", data.fields);
        context.commit("setOnePageCars", data.data);
        this.commit("shared/setLoading", false);
      } catch (e) {
        this.commit("shared/setLoading", false);
        this.commit("shared/setError", e.message);
        throw e;
      }
    },
  },
  getters: {
    getCars(state) {
      return state.cars;
    },
    getOnePageCars(state) {
      return state.onePageCars;
    },
    getRowCount(state) {
      return state.rowCount;
    },
    getPageSize(state) {
      return state.pageSize;
    },
    getPage(state) {
      return state.page;
    },
  },
};
