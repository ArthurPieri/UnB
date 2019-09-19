import Vue from "vue";
import Vuex from "vuex";
import student from "./modules/student";
import professor from "./modules/professor";
import subject from "./modules/subject";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    student,
    professor,
    subject
  }
});
