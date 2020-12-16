<template>
  <div class="register-form">
    <show-error v-show="errorMessage.length > 0" :errorMessages="errorMessage"/>
    <b-form @submit.prevent="onSubmit">
      <b-form-group id="email-group" label="Email address" label-for="email">
        <b-form-input
          id="email"
          name="email"
          type="email"
          required
          placeholder="Enter email"
          v-model="email"
        ></b-form-input>
      </b-form-group>
      <b-form-group id="name-group" label="Name" label-for="name">
        <b-form-input
          id="name"
          name="name"
          type="text"
          required
          placeholder="Enter Fullname"
          v-model="name"
        ></b-form-input>
        <b-form-invalid-feedback :state="validateName">
          Your name must be between 5 and 50 characters long.
        </b-form-invalid-feedback>
        <b-form-valid-feedback :state="validateName">
          Looks Good.
        </b-form-valid-feedback>
      </b-form-group>
      <b-form-group
        id="password-group"
        label="Password"
        label-for="password"
      ></b-form-group>
      <b-form-input
        id="password"
        name="password"
        type="password"
        required
        placeholder="Enter password"
        v-model="pwd"
      ></b-form-input>
      <b-form-invalid-feedback :state="validatePwd">
        Your password must be at least 8 characters long.
      </b-form-invalid-feedback>
      <b-form-valid-feedback :state="validatePwd">
        Looks Good.
      </b-form-valid-feedback>
      <b-form-group
        id="confirm-password-group"
        label="ConfirmPassword"
        label-for="confirm-password"
      ></b-form-group>
      <b-form-input
        id="confirm-password"
        name="confirm-password"
        type="password"
        required
        placeholder="Confirm Password"
        v-model="confirmPwd"
      ></b-form-input>
      <b-form-invalid-feedback :state="validatePwdMatch">
        Passwords dont match.
      </b-form-invalid-feedback>
      <b-form-valid-feedback :state="validatePwdMatch">
        Looks Good.
      </b-form-valid-feedback>
      <b-button
        type="submit"
        variant="primary"
        :disabled="!(validatePwd && validateName && validatePwdMatch)"
        >Register</b-button
      >
    </b-form>
  </div>
</template>

<script>
import { Register } from "../services/AuthService.js";
import Error from "./Error.vue";
export default {
  components:{
    showError: Error
  },
  data() {
    return {
      email: "",
      name: "",
      pwd: "",
      confirmPwd: "",
      errorMessage: [],
    };
  },
  computed: {
    validateName() {
      return this.name.length > 5 && this.name.length < 50;
    },
    validatePwd() {
      return this.pwd.length > 8 && this.pwd.length < 30;
    },

    validatePwdMatch() {
      return this.pwd === this.confirmPwd;
    },
  },
  methods: {
    async onSubmit() {
      try {
        await Register({
          name: this.name,
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
<style>
.register-form {
  margin: auto;
  width: 50%;
  padding-top: 80px;
}
</style>
