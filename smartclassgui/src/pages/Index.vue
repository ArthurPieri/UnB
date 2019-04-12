<template>
  <q-page>
    <h4 class="no-margin">
      Página Inicial
    </h4>
    <br>
    <q-card class="my-card">
      <q-item>
        <q-item-section avatar>
          <q-avatar>
            <img src="https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=Sistemas de Informação">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>Sistemas de Informação</q-item-label>
          <q-item-label caption>Prof: Fernanda Lima</q-item-label>
        </q-item-section>
      </q-item>
      <q-card-section>
        <p>
          Aula de Sistemas de Informação
        </p>
        <p>
          (AQUI SERÃO COLOCADAS AS INFORMAÇÕES SOBRE O CURSO)
        </p>
      </q-card-section>
      <q-card-actions>
        <q-btn flat>Confirmar Presença</q-btn>
        <q-btn flat>Mais Informações</q-btn>
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: "PageIndex"
};
</script>
<style scoped>
.my-card {
  width: 100%;
  max-width: 500px;
}
</style>
