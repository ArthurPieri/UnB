import * as act from "../actions";
import * as getr from "../getters";
import * as mut from "../mutations";
import { setOnStorage, getFromStorage } from "../../lib/storage";
import * as api from "../../lib/api/modules/professor";
const state = {
  professor: {},
  authTokenProfessor: ""
};

const actions = {
  // login professor
  [act.LOGIN_PROFESSOR]: async ({ commit }, { enrollment, password }) => {
    try {
      // api call
      let response = await api.loginProfessor(enrollment, password);
      // mutate the state
      commit(mut.STORE_PROFESSOR, response.data);
    } catch (error) {
      throw error;
    }
  },
  // logout professor
  [act.LOGOUT_PROFESSOR]: async ({ commit }) => {
    try {
      // mutate the state
      commit(mut.STORE_PROFESSOR, { professor: null, token: null });
    } catch (error) {
      throw error;
    }
  },
  // stutent signup
  [act.REGISTER_PROFESSOR]: async ({ commit }, professor) => {
    try {
      // api call
      let response = await api.newProfessor(professor);
      // mutate the state
      commit(mut.STORE_PROFESSOR, response.data);
    } catch (error) {
      throw error;
    }
  },
  // list all professor
  [act.FETCH_PROFESSORS]: async ({ commit }, query = "") => {
    try {
      let response = await api.getProfessors(query);
      commit(mut.STORE_PROFESSORS, response.data);
    } catch (error) {
      throw error;
    }
  }
};

// state mutations
const mutations = {
  [mut.STORE_PROFESSOR]: (state, { professor, token }) => {
    setOnStorage("professor", professor);
    setOnStorage("authToken", token);
    state.professor = professor;
  }
};

// state getters
const getters = {
  [getr.PROFESSOR]: () => {
    let professor = state.professor;
    if (professor === null) {
      professor = getFromStorage("professor");
    }
    return professor;
  }
};

export default {
  actions,
  getters,
  mutations,
  state
};
