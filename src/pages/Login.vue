<template>
  <div class="register-form">
    <show-error v-show="errorMessage.length > 0" :errorMessages="errorMessage" />
    <b-form @submit.prevent="onSubmit">
      <b-form-group id="email-group" label="Email address:" label-for="email">
        <b-form-input
          id="email"
          v-model="email"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="password-group" label="Password: " label-for="password">
        <b-form-input
          id="password"
          v-model="pwd"
          type="password"
          required
          placeholder="Enter password"
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Login</b-button>
    </b-form>
  </div>
</template>

<script>
import AuthService from "../services/AuthService.js";
import Error from '../components/Error.vue'
export default {
  components: {
    showError: Error
  },
  data() {
    return {
      email: "",
      pwd: "",
      errorMessage: [],
    };
  },
  methods: {
    async onSubmit() {
      try {
        await AuthService.login({
          email: this.email,
          password: this.pwd,
        });
      } catch (e) {
        this.errorMessage = e;
      }
    },
  },
};
</script>

<style></style>
