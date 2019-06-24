<template>
  <div>
    <h4 class="no-margin">
      {{$route.name}}
    </h4>
    <subject-card
      v-for="(subject, i) of subjects"
      :key="i"
      :subject="subject"
      :enrolled="studentSubjects.filter(x => x._id === subject._id).length > 0"
      card-type="enrollment"
    />
  </div>
</template>
<script>
import SubjectCard from "../components/SubjectCard";
import { mapGetters } from "vuex";
import { STUDENT_SUBJECTS } from "../store/getters";
export default {
  components: {
    SubjectCard
  },
  data () {
    return {
      subjects: []
    };
  },
  async mounted () {
    await this.$store.dispatch("fetchSubjects");
    this.subjects = this.$store.getters.subjects;
  },
  methods: {},
  computed: {
    ...mapGetters([
      STUDENT_SUBJECTS
    ])
  }
};
</script>
<style scoped>
</style>
