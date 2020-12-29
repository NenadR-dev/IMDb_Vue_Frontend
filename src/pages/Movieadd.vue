<template>
  <div>
    <b-breadcrumb>
      <b-breadcrumb-item :active="regular" @click="toggleAddMethod(true)"
        >Regular Add</b-breadcrumb-item
      >
      <b-breadcrumb-item :active="!regular" @click="toggleAddMethod(false)"
        >OMDB Add</b-breadcrumb-item
      >
    </b-breadcrumb>
    <div v-if="regular"><regular-add /></div>
    <div v-else><omdb-add /></div>
  </div>
</template>

<script>
import RegularAdd from "../components/add/RegularAdd.vue";
import OmdbAdd from "../components/add/FeatureAdd.vue";
export default {
  components: {
    RegularAdd,
    OmdbAdd,
  },
  data() {
    return {
      regular: true,
    };
  },
  methods: {
    toggleAddMethod(toggle) {
      this.regular = toggle;
    },
  },
};
</script>

<style>
.movie-form {
  margin: auto;
  width: 50%;
  padding-top: 20px;
}
.image-card {
  max-width: 40rem;
}
.btn-padding {
  margin-left: 35px;
}
.feedback-text {
  padding-left: 140px;
}
</style>
