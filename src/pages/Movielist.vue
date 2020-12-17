<template>
  <div>
    <b-row class="center">
      <h1>Movies</h1>
    </b-row>
    <b-row class="center">
      <b-pagination
        v-model="currentPage"
        :total-rows="movies.total"
        :per-page="movies.per_page"
        aria-controls="my-table"
        pills
        size="lg"
        @input="fetchNextPage"
      ></b-pagination>
    </b-row>
    <div id="content" class="row card-distance">
      <div v-for="movie in movies.data" :key="movie.id" class="movie-card">
        <b-card
          :title="movie.title"
          :img-src="movie.imageCover"
          img-alt="Image"
          img-top
          tag="article"
          class="mb-2 movie-card-item"
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
import { getMovies, getNextMoviePage } from "../services/MovieService.js";
export default {
  data() {
    return {
      currentPage: 1,
      movies: []
    };
  },
  async created() {
    this.movies = await getMovies();
  },
  methods: {
    navigateToImage(id) {
      this.$router.push(`movie/${id}`);
    },
    async fetchNextPage() {
      this.movies = await getNextMoviePage(this.movies.links[this.currentPage].url);
    },
  },
};
</script>

<style scoped>
.card-distance {
  padding: 20px 60px;
}

.movie-card {
    padding: 20px 60px;
}
.movie-card-item {
  transition: transform .2s;
  max-width: 20rem;
  width: 450px;
}
.movie-card-item:hover{
    transform: scale(1.1);
    cursor: pointer;
}
</style>
