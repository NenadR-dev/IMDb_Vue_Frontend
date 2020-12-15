<template>
  <div>
    <div v-if="!isLoggedIn">
      <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand href="/">IMDb</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item href="/register">Register</b-nav-item>
            <b-nav-item href="/login">Login</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <div v-else>
      <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand href="/">IMDb</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item @click="logout">logout</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
  </div>
</template>

<script>
import { getToken, Logout } from "../services/AuthService.js";
export default {
  data() {
    return {
      isLoggedIn: false,
    };
  },
  watch: {
    $route: "loggedIn",
  },
  methods: {
    async logout() {
      Logout();
    },
    loggedIn(){
        this.isLoggedIn = getToken()
    }
  }
};
</script>

<style>
</style>