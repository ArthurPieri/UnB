<template>
  <q-card class="my-card">
    <q-item>
      <q-item-section avatar>
        <q-avatar>
          <img :src="imgUrl">
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label>{{subject.name}}</q-item-label>
        <!-- <q-item-label caption>Prof: <span v-for="professor in subject.professor">{{professor}}</span></q-item-label>-->
        <q-chip v-if="enrolled" icon="check">Matriculado</q-chip>
      </q-item-section>
    </q-item>
    <q-card-section>
      <p>
        Dias: | <span v-for="i in subject.days" :key="i"> {{daysOfWeek[i]}} | </span>
        <br>
        Horário: {{getTimeFromSeconds(subject.startHour)}} - {{getTimeFromSeconds(subject.endHour)}}
      </p>
    </q-card-section>
    <q-card-actions>
      <q-btn @click="prompt" v-if="$props.cardType === 'class'" flat>Confirmar Presença</q-btn>
      <q-btn @click="enroll" :disable="enrolled" v-if="$props.cardType === 'enrollment'" flat>Matrícula</q-btn>
    </q-card-actions>
  </q-card>
</template>
<script>
import {
  // getSecondsFromDay,
  getTimeFromSeconds,
  daysOfWeek
} from "../lib/util";
export default {
  props: {
    subject: {
      type: Object,
      required: true
    },
    enrolled: {
      type: Boolean,
      default: false
    },
    cardType: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      imgUrl: `https://ui-avatars.com/api/?background=E2B7E2&color=fff&name=${this.$props.subject.name}`,
      daysOfWeek,
      coordinates: {}
    };
  },
  methods: {
    getTimeFromSeconds,
    async enroll () {
      const id = this.$props.subject._id;
      await this.$store.dispatch("enrollStudent", id);
      await this.$store.dispatch("fetchStudent");
      this.$q.notify({
        message: "Matricula Realizada com Sucesso!",
        color: "positive"
      });
      this.$router.replace("/");
    },
    async confirmAttendance () {
      this.$store.dispatch("registerAttendance", this.$props.subject._id);
    },
    prompt () {
      this.$q.dialog({
        message: "Informe o código da Aula",
        prompt: {
          model: "",
          type: "text" // optional
        },
        cancel: true,
        persistent: true
      }).onOk(async data => {
        let x = {
          id: this.$props.subject._id,
          code: data
        };
        try {
          await this.$store.dispatch("registerAttendance", x);
          this.$q.notify({
            message: "Presença Confirmada!",
            color: "green"
          });
        } catch (error) {
          this.$q.notify({
            message: error.response ? error.response.data : "Erro ao confirmar presença",
            color: "red"
          });
        }
      });
    }
  }
};
</script>
<style scoped>
.my-card {
  margin-top: 1em;
  width: 100%;
  max-width: 500px;
}
</style>
