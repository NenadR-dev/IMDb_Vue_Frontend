<template>
  <div>
    <div v-if="$route.meta.guest">
      <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand @click="redirect('home')">IMDb</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item @click="redirect('register')">Register</b-nav-item>
            <b-nav-item @click="redirect('login')">Login</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <div v-else>
      <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand @click="redirect('movielist')">IMDb</b-navbar-brand>
        <b-navbar-nav class="ml-auto">
          <b-nav-item @click="redirect('addMoviePage')">Add movie</b-nav-item>
          <b-nav-item @click="redirect('watchlist')">Watchlist</b-nav-item>
        </b-navbar-nav>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item @click="logout">Logout</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
  </div>
</template>

<script>
import AuthService from "../services/AuthService.js";
export default {
  methods: {
    async logout() {
      await AuthService.logout();
    },
    redirect(route) {
      this.$router.push({ name: route });
    },
  },
};
</script>

<style></style>
