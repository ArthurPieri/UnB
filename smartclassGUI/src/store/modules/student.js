import * as act from "../actions";
import * as getr from "../getters";
import * as mut from "../mutations";
import { setOnStorage, getFromStorage } from "../../lib/storage";
import * as api from "../../lib/api/modules/student";
const state = {
  student: {},
  students: [],
  studentSubjects: [],
  authToken: ""
};

const actions = {
  // login student
  [act.LOGIN_STUDENT]: async ({ commit }, { enrollment, password }) => {
    try {
      // api call
      let response = await api.loginStudent(enrollment, password);
      // mutate the state
      commit(mut.STORE_STUDENT_LOGIN, response.data);
    } catch (error) {
      throw error;
    }
  },
  [act.LOGOUT_STUDENT]: async ({ commit }) => {
    try {
      // api call
      let response = await api.logoutStudent();
      // mutate the state
      commit(mut.STORE_STUDENT_LOGIN, response.data);
    } catch (error) {
      throw error;
    }
  },
  // stutent signup
  [act.REGISTER_STUDENT]: async ({ commit }, student) => {
    try {
      // api call
      let response = await api.newStudent(student);
      // mutate the state
      commit(mut.STORE_STUDENT, response.data);
    } catch (error) {
      throw error;
    }
  },
  // list all student
  [act.FETCH_STUDENTS]: async ({ commit }, query = "") => {
    try {
      let response = await api.getStudents(query);
      commit(mut.STORE_STUDENTS, response.data);
    } catch (error) {
      throw error;
    }
  },
  // list all student
  [act.FETCH_STUDENT]: async ({ commit }) => {
    try {
      let response = await api.getStudent();
      commit(mut.STORE_STUDENT, response.data);
    } catch (error) {
      throw error;
    }
  },
  [act.ENROLL_STUDENT]: async ({ commit }, id) => {
    try {
      await api.enrollStudent(id);
    } catch (error) {
      throw error;
    }
  },
  [act.GET_STUDENT_SUBJECTS]: async ({ commit }) => {
    try {
      let response = await api.getStudentSubjects();
      commit(mut.STORE_STUDENT_SUBJECTS, response.data);
    } catch (error) {
      throw error;
    }
  }
};

// state mutations
const mutations = {
  [mut.STORE_STUDENT]: (state, student) => {
    setOnStorage("student", student);
    state.student = student;
  },
  [mut.STORE_STUDENT_LOGIN]: async (state, { student, token }) => {
    await setOnStorage("student", student);
    await setOnStorage("authToken", token);
    state.student = student;
  },
  [mut.STORE_STUDENT_SUBJECTS]: (state, studentSubjects) => {
    setOnStorage("studentSubjects", studentSubjects);
    state.studentSubjects = studentSubjects;
  },
  [mut.STORE_STUDENTS]: (state, students) => {
    setOnStorage("students", students);
    state.students = students;
  }
};

// state getters
const getters = {
  [getr.STUDENT]: () => {
    let student = state.student;
    console.log("Student", student);
    if (!student) {
      student = getFromStorage("student");
    }
    return student;
  },
  [getr.STUDENT_SUBJECTS]: () => {
    let studentSubjects = state.studentSubjects;
    if (studentSubjects === null) {
      studentSubjects = getFromStorage("studentSubjects");
    }
    return studentSubjects;
  },
  [getr.STUDENTS]: () => {
    let students = state.students;
    if (students === null) {
      students = getFromStorage("students");
    }
    return students;
  }
};

export default {
  actions,
  getters,
  mutations,
  state
};
