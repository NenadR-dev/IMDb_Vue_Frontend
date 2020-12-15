<template>
  <div>
    <h1>Movies</h1>
    <div class="row card-distance">
      <div v-for="movie in movies" :key="movie.id" class="card-distance">
        <b-card
          :title="movie.title"
          :img-src="movie.imageCover"
          img-alt="Image"
          img-top
          tag="article"
          class="mb-2 card-image"
        >
          <b-card-text>
            <p>
              Description: <b>{{ movie.description }}</b>
            </p>
            <p>
              Genre: <b>{{ movie.genre }}</b>
            </p>
          </b-card-text>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import { getMovies } from "../services/MovieService.js";
export default {
  data() {
    return {
      movies: [],
    };
  },
  async created() {
    this.movies = await getMovies();
  },
};
</script>

<style>
.card-distance {
  padding: 20px 60px;
}
.card-image{
  width: 450px;
  max-width: 20rem;
}
</style>
