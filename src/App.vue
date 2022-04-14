<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-toolbar-title>
        <span class="headline">Notification Module dApp (Demo)</span>
      </v-toolbar-title>
    </v-app-bar>

    <v-main>
         <router-view></router-view>
      <!-- <LoginFlow/> -->
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {
  },

  data: () => ({
    //
  }),
};
</script>
