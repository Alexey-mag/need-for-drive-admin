import Vue from "vue";
import Vuex from "vuex";
import user from "@/store/user";
import shared from "@/store/shared";
import car from "@/store/car";
import cars from "@/store/cars";
import orders from "@/store/orders";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    shared,
    car,
    cars,
    orders,
  },
});
