<template>
  <div>
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
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
import { getMovieByID } from "../services/MovieService.js";
export default {
  data() {
    return {
      movie: {},
    };
  },
  async created() {
    try {
      this.movie = await getMovieByID(this.$route.params.id);
    } catch (e) {
      console.log(e);
    }
  },
};
</script>

<style></style>
