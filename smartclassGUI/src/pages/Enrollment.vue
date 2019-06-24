<template>
  <div>
    <h4 class="no-margin">
      {{$route.name}}
    </h4>
    <subject-card
      v-for="(subject, i) of subjects"
      :key="i"
      :subject="subject"
      :enrolled="isEnrolled(subject)"
      card-type="enrollment"
    />
  </div>
</template>
<script>
import SubjectCard from "../components/SubjectCard";
import { mapGetters } from "vuex";
import { STUDENT_SUBJECTS, SUBJECTS } from "../store/getters";
export default {
  components: {
    SubjectCard
  },
  async mounted () {
    await this.$store.dispatch("fetchSubjects");
  },
  methods: {
    isEnrolled (subject) {
      const enrolled = this.studentSubjects.filter(x => x._id === subject._id).length > 0;
      return enrolled;
    }
  },
  computed: {
    ...mapGetters([
      STUDENT_SUBJECTS,
      SUBJECTS
    ])
  }
};
</script>
<style scoped>
</style>
