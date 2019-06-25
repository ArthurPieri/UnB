<template>
  <q-page>
    <h4 class="no-margin">
      {{$route.name}}
    </h4>
    <br>
    <q-list bordered class="rounded-borders">
      <q-expansion-item
        expand-separator
        icon="perm_identity"
        label="Informações do Usuário"
        :caption="student.name"
      >
        <q-card>
          <q-card-section>
            <b>Nome:</b> {{student.name}}
            <br>
            <b>Email:</b> {{student.email}}
            <br>
            <b>Matrícula:</b> {{student.enrollment}}
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-expansion-item
        expand-separator
        icon="room"
        label="Presenças"
      >
        <q-card>
          <q-card-section>
            <q-expansion-item
              :key="key"
              v-for="(sub, key) in subjects"
              expand-separator
              :label="sub.name"
            >
              <q-card>
                <q-card-section v-if="sub.attendance.length > 0">
                  <p :key="att" v-for="att in sub.attendance"><b>Presença: </b>{{getFormattedDate(att)}}</p>
                  <br>
                  <p><b>Total: </b>{{sub.attendance.length}}</p>
                </q-card-section>
                <q-card-section v-else>
                  <p>Você ainda não foi a nenhuma aula de {{sub.name}}</p>
                </q-card-section>
              </q-card>
            </q-expansion-item>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-list>
    <br>
  </q-page>
</template>

<style>
</style>

<script>
import { mapGetters } from "vuex";
import { STUDENT_SUBJECTS, STUDENT } from "../store/getters";
import { getFormattedDate } from "../lib/util";
export default {
  name: "PageIndex",
  data () {
    return {
      loading: true,
      subjects: [],
      coordinates: {}
    };
  },
  async mounted () {
    await this.$store.dispatch("fetchStudent");
    await this.$store.dispatch("getStudentSubjects");
    this.loading = false;
    this.subjects = this.student.subjects.map((sub, i) => {
      const sbj = this.studentSubjects.find(s => s._id === sub._id);
      sbj.attendance = sub.attendance;
      return sbj;
    });
  },
  computed: {
    ...mapGetters([
      STUDENT_SUBJECTS,
      STUDENT
    ])
  },
  methods: {
    getFormattedDate
  }
};
</script>
<style scoped>
.my-card {
  width: 100%;
  max-width: 500px;
}
</style>
