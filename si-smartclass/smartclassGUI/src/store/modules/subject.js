import * as act from "../actions";
import * as getr from "../getters";
import * as mut from "../mutations";
import { setOnStorage, getFromStorage } from "../../lib/storage";
import * as api from "../../lib/api/modules/subject";
const state = {
  subject: {},
  subjects: [],
  authToken: ""
};

const actions = {
  // list all subject
  [act.FETCH_SUBJECTS]: async ({ commit }) => {
    try {
      let response = await api.getSubjects();
      commit(mut.STORE_SUBJECTS, response.data);
    } catch (error) {
      throw error;
    }
  }
};

// state mutations
const mutations = {
  [mut.STORE_SUBJECT]: (state, { subject, token }) => {
    setOnStorage("subject", subject);
    setOnStorage("authToken", token);
    state.subject = subject;
  },
  [mut.STORE_SUBJECTS]: (state, subjects) => {
    setOnStorage("subjects", subjects);
    state.subjects = subjects;
  }
};

// state getters
const getters = {
  [getr.SUBJECTS]: () => {
    let subjects = state.subjects;
    if (subjects === null) {
      subjects = getFromStorage("subjects");
    }
    return subjects;
  }
};

export default {
  actions,
  getters,
  mutations,
  state
};
