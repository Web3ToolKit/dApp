<template>
  <v-app id="inspire">
    <v-main class="grey lighten-3">
      <v-container >
        <v-row align="center">
          <v-col>
            <Connect :state="state" @setState='setState' />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Connect from "./connect.vue";
import { getAccount } from "../web3";

export default {
  name: "LoginFlow",
  components: {
    Connect,
  },
  data: () => ({
    state: "NOT_CONNECTED",
  }),
  computed: {
    isLoggedIn() {
      return this.state === "LOGGED_IN";
    },
    user() {
      // if loggedIn  return user
      if(this.isLoggedIn) {

        // get user from localstorage
        const user = JSON.parse(localStorage.getItem("user"));

        // get account
        const account = getAccount();

        return {
          name: user.name,
          email: user.email,
          account: account,
        };

      }
      // else return null
      return null;
    },
  },
  methods:{
    setState( state) {
      console.log("Setting State to " + state)
      this.state = state;
    },
    restartLogin() {
      // clear local storage
      localStorage.removeItem("user");

      // clear session storage
      sessionStorage.removeItem("autoConnect");
      sessionStorage.removeItem("signature");
      sessionStorage.removeItem("nonce");

      this.state = "NOT_CONNECTED";

    },
    logout() {

      // clear session storage
      sessionStorage.removeItem("signature");
      sessionStorage.removeItem("nonce");

      this.state = "REGISTERED";
    },
  }
};
</script>
