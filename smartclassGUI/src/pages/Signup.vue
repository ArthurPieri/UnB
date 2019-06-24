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
            <q-input v-model="name" label="Seu Nome *"></q-input>
            <q-input
              class="text-white"
              v-model="enrollment"
              mask="#########"
              hint="Ex: 012345678"
              label="Sua matrícula *"/>
            <div v-if="password !== confirmPassword">As senhas não coincidem</div>
            <q-input v-model="password" type="password" label="Sua Senha *"/>
            <q-input v-model="confirmPassword" type="password" label="Confirme Sua Senha *"/>
            <q-input v-model="email" label="Seu E-mail *"/>
            <q-input
              v-if="signupMethod === 'signupProfessor'"
              v-model="code"
              label="Código de Cadastro *"/>
          </q-form>
        <q-separator dark />

        <q-card-actions>
          <q-btn color="white" text-color="primary" class="full-width" @click="validateSignup">Cadastro</q-btn>
          <q-btn flat class="full-width" @click="$router.push('/login')">Não tem conta? Login!</q-btn>
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
      confirmPassword: "",
      name: "",
      email: "",
      signupMethod: ""
    };
  },
  methods: {
    signup () {
      const student = {
        enrollment: this.enrollment,
        password: this.password,
        name: this.name,
        email: this.email
      };
      this.$store.dispatch(this.signupMethod, student).then(() => {
        this.$q.notify({
          message: "Cadastro Realizado com Sucesso!",
          color: "positive"
        });
      }).catch((error) => {
        this.$q.notify({
          message: error.response ? error.response.data.errmsg : error,
          color: "red"
        });
      });
    },
    validateSignup () {
      if (this.enrollment && this.name && this.password && this.email && this.confirmPassword) {
        this.signup();
      } else {
        this.$q.notify({
          message: "Todos os campos devem ser preenchidos",
          color: "red"
        });
      }
    }
  },
  mounted () {
    this.signupMethod = this.$route.path === "/professor/cadastro" ? "registerProfessor" : "registerStudent";
  }
};
</script>
