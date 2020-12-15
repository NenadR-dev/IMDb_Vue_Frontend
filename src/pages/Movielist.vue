<template>
    <div>
    <h1>Movies</h1>
    <div class="row card-distance">
      <div v-for="movie in movies" :key="movie.id" class="movie-card">
        <b-card
          :title="movie.title"
          :img-src="movie.imageCover"
          :style="{width: '450px'}"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 20rem"
          class="mb-2"
          @click="navigateToImage(movie.id)"
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
  methods: {
      navigateToImage(id){
          this.$router.push(`movie/${id}`)
      }
  }
}
</script>

<style scoped>
.card-distance {
  padding: 20px 60px;
}

.movie-card {
    padding: 20px 60px;
    transition: transform .2s;
}
.movie-card:hover{
    transform: scale(1.1);
    cursor: pointer;
}
</style>