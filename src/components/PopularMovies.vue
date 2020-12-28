<template>
  <div>
    <b-button v-b-toggle.sidebar-1>Show popular movies</b-button>
    <b-sidebar id="sidebar-1" title="Popular" shadow right>
      <h1><show-error v-if="errorMessages" :errorMessages="errorMessages" /></h1>
      <div class="px-3 py-2" v-for="movie in movies" :key="movie.id">
        <b-link @click="redirectToMoviePage(movie.id)">{{ movie.title }}</b-link>
        <b> likes: {{ movie.likes_count }}</b>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
import MovieService from "../services/MovieService";
import Error from "../components/Error.vue";
export default {
  components: {
    showError: Error,
  },
  data() {
    return {
      movies: [],
      errorMessages: "",
    };
  },
  async created() {
    try {
      this.movies = await MovieService.filterMovies(null, "popular");
    } catch (e) {
      this.errorMessages = e;
    }
  },
  methods: {
    redirectToMoviePage(id) {
      this.$router.push(`movie/${id}`);
    },
  },
};
</script>

<style></style>
