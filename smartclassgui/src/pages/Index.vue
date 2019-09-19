<template>
  <q-page>
    <h4 class="no-margin">
      Página Inicial
    </h4>
    <br>
    <div v-if="!loading">
      <div v-if="subjects.length > 0">
        <subject-card
          v-for="(subject, i) of studentSubjects"
          :key="i"
          :subject="subject"
          :enrolled="true"
          :coordinates="coordinates"
          cardType="class"
          :attendance="getAttendance(subject)"
          :classtoday="getClassToday(subject)"
        />
      </div>
      <div v-else>
        Você ainda não se matriculou em nenhuma disciplina!
        <br/>
        <q-btn @click="$router.replace('/matricula')"> Matricular em uma Disciplina </q-btn>
      </div>
    </div>
  </q-page>
</template>
<script>
import { mapGetters } from "vuex";
// import { daysOfWeek } from "../lib/util";
import { STUDENT_SUBJECTS, STUDENT } from "../store/getters";
import SubjectCard from "../components/SubjectCard";
export default {
  name: "PageIndex",
  components: {
    SubjectCard
  },
  data () {
    return {
      loading: true,
      subjects: [],
      coordinates: {}
    };
  },
  async mounted () {
    await this.$store.dispatch("getStudentSubjects");
    this.subjects = this.studentSubjects || [];
    this.loading = false;
  },
  methods: {
    getAttendance (subject) {
      if (this.student.subjects) {
        let att = this.student.subjects.filter(x => x._id === subject._id)[0];
        att = att.attendance[att.attendance.length - 1];
        if (att) {
          const d = new Date(att);
          const now = new Date();
          return now.getDay() === d.getDay();
        }
      }
      return false;
    },
    getClassToday (subject) {
      const d = new Date();
      let x = subject.days.some(x => {
        if (typeof x === "string") {
          x = parseInt(x);
        }
        return x === d.getDay();
      });
      return x;
    }
  },
  computed: {
    ...mapGetters([
      STUDENT_SUBJECTS,
      STUDENT
    ])
  }
};
</script>
<style scoped>
.my-card {
  width: 100%;
  max-width: 500px;
}
</style>
