import Vue from "vue";
import Vuex from "vuex";
import aluno from "./modules/aluno";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    aluno
  }
});
