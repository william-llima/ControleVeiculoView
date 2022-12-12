<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-btn to="/">Controle Grid</v-btn>
      </div>

      <v-spacer></v-spacer>
      
      <v-btn to="/motorista">Motorista</v-btn>
      <v-btn to="/veiculo">Veiculo</v-btn>
    </v-app-bar>

    <v-main>
      <Transition mode="out-in" 
       enter-active-class="animate__animated animate__backInLeft"
                   >
        <router-view></router-view>
      </Transition>
    
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
    //
  }),
};
</script>
<style>
:root {
    --animate-duration: 500ms;
    --animate-delay: 0.3s;
  }
</style>
