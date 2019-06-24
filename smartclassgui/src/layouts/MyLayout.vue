<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated color="primary">
      <q-toolbar>
        <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
        <q-toolbar-title>{{$route.name}}</q-toolbar-title>
        <q-btn flat round dense>
          <q-icon @click="logout" name="exit_to_app" />
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      :width="200"
      :breakpoint="500"
      show-if-above
      bordered
      content-class="bg-grey-3"
    >
      <q-scroll-area class="fit">
        <q-list padding>
          <q-item
            clickable
            :active="$route.name === 'Home'"
            @click="$router.replace('/')"
            v-ripple
          >
            <q-item-section avatar>
              <q-icon name="home" />
            </q-item-section>
            <q-item-section>
              Home
            </q-item-section>
          </q-item>
          <q-item
            clickable
            @click="$router.replace('/matricula')"
            :active="$route.name === 'Matrícula'"
            v-ripple
          >
            <q-item-section avatar>
              <q-icon name="assignment_turned_in" />
            </q-item-section>
            <q-item-section>
              Matrícula
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <q-page padding>
        <router-view/>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data () {
    return {
      drawer: true,
      miniState: true
    };
  },
  methods: {
    async logout () {
      await this.$store.dispatch("logoutStudent");
      this.$router.replace("/login");
    }
  },
  async mounted () {
    await this.$store.dispatch("fetchStudent");
  }
};
</script>

<style></style>
