export default {
  namespaced: true,
  state: {
    loading: false,
    error: null,
    windowWidth: null,
    mobile: 568,
    tablet: 1100,
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    clearError(state) {
      state.error = null;
    },
    setWindowWidth(state, payload) {
      state.windowWidth = payload;
    },
  },
  actions: {},
  getters: {
    loading(state) {
      return state.loading;
    },
    error(state) {
      return state.error;
    },
    mobile(state) {
      return state.mobile;
    },
    tablet(state) {
      return state.tablet;
    },
    getWindowWidth(state) {
      return state.windowWidth;
    },
  },
};
