import * as act from "../actions";
import * as getr from "../getters";
import * as mut from "../mutations";
import { setOnStorage, getFromStorage } from "../../lib/storage";
import * as api from "../../lib/api/modules/aluno";
const state = {
  aluno: {},
  alunos: []
};

const actions = {
  // login student
  [act.LOGIN_ALUNO]: async ({ commit }, { matricula, password }) => {
    try {
      // api call
      let response = await api.loginAluno(matricula, password);
      // mutate the state
      commit(mut.STORE_ALUNO, response.data);
    } catch (error) {
      throw error;
    }
  },
  // stutent signup
  [act.REGISTER_ALUNO]: async ({ commit }, aluno) => {
    try {
      // api call
      let response = await api.newAluno(aluno);
      // mutate the state
      commit(mut.STORE_ALUNO, response.data);
    } catch (error) {
      throw error;
    }
  },
  // list all student
  [act.FETCH_ALUNOS]: async ({ commit }, query = "") => {
    try {
      let response = await api.getAlunos(query);
      commit(mut.STORE_ALUNOS, response.data);
    } catch (error) {
      throw error;
    }
  }
};

// state mutations
const mutations = {
  [mut.STORE_ALUNO]: (state, aluno) => {
    setOnStorage("aluno", aluno);
    state.aluno = aluno;
  },
  [mut.STORE_ALUNOS]: (state, alunos) => {
    setOnStorage("alunos", alunos);
    state.alunos = alunos;
  }
};

// state getters
const getters = {
  [getr.ALUNO]: () => {
    let aluno = state.aluno;
    if (aluno === null) {
      aluno = getFromStorage("aluno");
    }
    return aluno;
  },
  [getr.ALUNOS]: () => {
    let alunos = state.alunos;
    if (alunos === null) {
      alunos = getFromStorage("alunos");
    }
    return alunos;
  }
};

export default {
  actions,
  getters,
  mutations,
  state
};
