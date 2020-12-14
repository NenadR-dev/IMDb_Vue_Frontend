<template>
  <div class="register-form">
    <b-form @submit.prevent="onSubmit">
      <b-form-group
        id="email-group"
        label="Email address:"
        label-for="email"
      >
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
import {Login} from '../services/AuthService.js'
export default {
    data() {
        return {
            email: '',
            pwd: ''
        }
    },
    methods: {
        async onSubmit(){
            await Login({
                email: this.email,
                password: this.pwd
            });
        }
    }
}
</script>

<style>

</style>