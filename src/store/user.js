import axios from "axios";

export default {
  namespaced: true,
  state: {
    user: {},
    base64Token: "",
  },
  mutations: {
    setUser(state, payload) {
      state.user.token = payload["access_token"];
      state.user.id = payload["user_id"];
      state.user.refreshToken = payload["refresh_token"];
    },
    createBase64Token(state) {
      let r = Math.random().toString(36).substring(2);
      const token = r + ":" + process.env.VUE_APP_API_KEY;
      localStorage.setItem("token64", btoa(token));
      state.base64Token = btoa(token);
    },
  },
  actions: {
    async loginUser({ commit }, { email, password }) {
      this.commit("shared/clearError");
      this.commit("shared/setLoading", true);
      try {
        const { data } = await axios({
          url: process.env.VUE_APP_API_AUTH + "/auth/login",
          method: "post",
          headers: {
            "X-Api-Factory-Application-Id": `${process.env["VUE_APP_API_FACTORY_ID"]}`,
            "Content-Type": "application/json",
            "Authorization": "Basic " + localStorage.getItem("token64"),
          },
          data: {
            username: email,
            password: password,
          },
        });
        commit("setUser", data);
        localStorage.setItem("token", data["access_token"]);
        localStorage.setItem("refresh_token", data["refresh_token"]);
        localStorage.setItem("user", data["user_id"]);
        const now = Date.now();
        localStorage.setItem("tokenCreated", now);
        this.commit("shared/setLoading", false);
        return true;
      } catch (e) {
        this.commit("shared/setLoading", false);
        this.commit("shared/setError", e.message);
        throw e;
      }
    },
    async refreshToken({ commit }) {
      this.commit("shared/clearError");
      try {
        const { data } = await axios({
          url: process.env.VUE_APP_API_AUTH + "/auth/refresh",
          method: "post",
          headers: {
            "X-Api-Factory-Application-Id": `${process.env["VUE_APP_API_FACTORY_ID"]}`,
            "Content-Type": "application/json",
            "Authorization": "Basic " + localStorage.getItem("token64"),
          },
          data: {
            refresh_token: localStorage.getItem("refresh_token"),
            client_id: localStorage.getItem("user"),
            client_secret: process.env.VUE_APP_API_KEY,
          },
        });
        commit("setUser", data);
        localStorage.setItem("token", data["access_token"]);
        localStorage.setItem("refresh_token", data["refresh_token"]);
        const now = Date.now();
        localStorage.setItem("tokenCreated", now);
        this.commit("shared/clearError");
      } catch (e) {
        this.commit("shared/setError", e.message);
        throw e;
      }
    },
  },
  getters: {
    base64Token(state) {
      return state.base64Token;
    },
  },
};
