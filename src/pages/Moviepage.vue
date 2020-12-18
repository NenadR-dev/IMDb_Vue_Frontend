<template>
  <div>
    <h4><show-error v-show="errorMessage.length > 0" :errorMessages="errorMessage" ></show-error></h4>
    <h1>{{ movie.title }}</h1>
    <b-card
      :img-src="movie.imageCover"
      img-alt="Card image"
      img-width="450px"
      img-height="600px"
      img-left
      class="mb-3"
    >
      <b-card-text>
        <p>
          <b>{{ movie.description }}</b>
        </p>
        <br />
        <p>
          Genre: <b>{{ movie.genre }}</b>
        </p>
        <p>Visited: <b>{{movie.visited}}</b> times</p>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
import { getMovieByID } from "../services/MovieService.js";
import Error from '../components/Error.vue'
export default {
  components: {
    showError: Error
  },
  data() {
    return {
      movie: {},
      errorMessage: []
    };
  },
  async created() {
    try {
      this.movie = await getMovieByID(this.$route.params.id);
    } catch (e) {
      this.errorMessage = e;
    }
  },
};
</script>

<style></style>
