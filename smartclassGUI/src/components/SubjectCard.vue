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
      <q-btn v-if="$props.cardType === 'class'" flat>Confirmar Presença</q-btn>
      <q-btn @click="enroll" v-if="$props.cardType === 'enrollment'" flat>Matrícula</q-btn>
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
      daysOfWeek
    };
  },
  methods: {
    getTimeFromSeconds,
    async enroll () {
      const id = this.$props.subject._id;
      await this.$store.dispatch("enrollStudent", id);
      await this.$store.dispatch("fetchStudent");
    },
    confirmAttendance () {
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
