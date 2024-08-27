import { checkPasswordOnServerAsync, logOutUserAsync } from "@/api/userAPI";

export default {
  state: {
    isAuthorized: false,
    token: null, // To store JWT token
  },
  mutations: {
    SET_IS_AUTHORIZED(state, payload) {
      state.isAuthorized = payload;
    },
    SET_TOKEN(state, payload) {
      state.token = payload;
    },
  },
  actions: {
    async checkPasswordAsync({ commit, dispatch }, password) {
      dispatch("setLoading", true, { root: true });
      try {
        const response = await checkPasswordOnServerAsync(password);
        if (response.data.token) {
          commit("SET_IS_AUTHORIZED", true);
          commit("SET_TOKEN", response.data.token);
          return "PasswordOk";
        } else {
          alert("Wrong password, please try again.");
          return "PasswordIncorrect";
        }
      } catch (error) {
        console.error(error);
        throw error;
      } finally {
        dispatch("setLoading", false, { root: true });
      }
    },
    async logOutAsync({ commit, dispatch }) {
      dispatch("setLoading", true, { root: true });
      try {
        const response = await logOutUserAsync();
        if (
          response.data === "userLoggedOut" ||
          response.data === "userAlreadyLoggedOut"
        ) {
          commit("SET_IS_AUTHORIZED", false);
          commit("SET_TOKEN", null);
          return "userLoggedOut";
        } else {
          alert(`Unexpected server response: ${response.data}`);
          return "Error";
        }
      } catch (error) {
        console.error(error);
        throw error;
      } finally {
        dispatch("setLoading", false, { root: true });
      }
    },
  },
};
