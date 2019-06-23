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
          cardType="class"
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

<style>
</style>

<script>
import { mapGetters } from "vuex";
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
      subjects: []
    };
  },
  async mounted () {
    await this.$store.dispatch("getStudentSubjects");
    console.log("STUDENT SUBJECTS", this.studentSubjects);
    this.subjects = this.studentSubjects || [];
    this.loading = false;
  },
  computed: {
    ...mapGetters([
      STUDENT_SUBJECTS,
      STUDENT
    ])
  },
  watch: {
    student () {
      console.log("Student", this.student);
    }
  }
};
</script>
<style scoped>
.my-card {
  width: 100%;
  max-width: 500px;
}
</style>
