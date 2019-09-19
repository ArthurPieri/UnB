<template>
  <div class="row full-page">
    <div class="absolute-center">
      <q-card class="login-card bg-primary text-white" >
        <q-card-section>
          <div class="text-h6">{{$route.name}}</div>
        </q-card-section>
        <q-card-section>
        </q-card-section>
          <q-form style="padding: 10px;">
            <q-input
              v-model="enrollment"
              mask="#########"
              hint="Ex: 012345678"
              label="Sua matrícula *"/>
            <q-input v-model="password" type="password" label="Sua Senha *"></q-input>
          </q-form>
        <q-separator dark />

        <q-card-actions>
          <q-btn color="white" text-color="primary" class="full-width" @click="login">Login</q-btn>
          <q-btn flat class="full-width" @click="$router.push('/cadastro')">Cadastro</q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      enrollment: "",
      password: "",
      loginMethod: ""
    };
  },
  methods: {
    async login () {
      const { enrollment, password, loginMethod } = this.$data;
      try {
        await this.$store.dispatch(loginMethod, { enrollment, password });
        this.$router.replace("/");
      } catch (error) {
        this.$q.notify({
          message: error.response ? error.response.data.errmsg : "Erro de Login",
          color: "red"
        });
      }
    }
  },
  mounted () {
    this.loginMethod = this.$route.path === "/professor/login" ? "loginProfessor" : "loginStudent";
  }
};
</script>
<style scoped>
.full-page {
  height: 750px;
}
.login-card {
  max-width: 700px;
  min-width:400px;
}
</style>
