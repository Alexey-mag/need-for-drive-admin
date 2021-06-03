import axios from "axios";

// class User {
//   constructor(email, password, token) {
//     this.email = email;
//     this.password = password;
//     this.token = token;
//   }
// }

export default {
  namespaced: true,
  state: {
    user: {},
  },
  mutations: {
    setUser(state, payload) {
      state.user.token = payload["access_token"];
      state.user.id = payload["user_id"];
    },
  },
  actions: {
    async loginUser({ commit }, { email, password }) {
      let r = Math.random().toString(36).substring(2);
      const token = r + ":" + process.env.VUE_APP_API_KEY;
      const base64 = btoa(token);
      this.commit("shared/clearError");
      this.commit("shared/setLoading", true);
      try {
        const { data } = await axios({
          url: process.env.VUE_APP_API_AUTH + "/auth/login",
          method: "post",
          headers: {
            "X-Api-Factory-Application-Id": process.env.VUE_APP_API_FACTORY_ID,
            "Content-type": "application/json",
            "Authorization": "Basic " + base64,
          },
          data: {
            username: email,
            password: password,
          },
        });
        commit("setUser", data);
        localStorage.setItem("token", data["access_token"]);
        localStorage.setItem("user", data["user_id"]);
        this.commit("shared/setLoading", false);
      } catch (e) {
        this.commit("shared/setLoading", false);
        this.commit("shared/setError", e.message);
        throw e;
      }
    },
  },
  getters: {},
};
