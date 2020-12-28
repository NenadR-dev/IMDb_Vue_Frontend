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
        pills
        size="lg"
        @input="fetchNextPage"
      ></b-pagination>
    </b-row>
    <b-row class="center mb-3">
      <b-form-select @change="filterMovies" v-model="filter" :options="genres" size="md">
        <template #first>
          <b-form-select-option :value="null" disabled
            >-- Please select an option --</b-form-select-option
          >
        </template>
        <b-form-select-option value="all"> All </b-form-select-option>
      </b-form-select>
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
            <p>
              Visited: <b>{{ movie.visited }}</b> times.
            </p>
            <p v-show="movieWatched(movie)"><b>Watched</b></p>
          </b-card-text>
        </b-card>
        <b-card-footer>
          <like-dislike
            :movieId="movie.id"
            :movieStatus="movie.likes"
            :updateMovie="updateMovieLike"
          ></like-dislike
        ></b-card-footer>
      </div>
    </div>
  </div>
</template>

<script>
import MovieService, { genres } from "../services/MovieService.js";
import LikeDislike from "../components/LikeDislike.vue";
export default {
  components: {
    LikeDislike,
  },
  data() {
    return {
      currentPage: 1,
      movies: [],
      userPreference: [],
      filter: null,
      genres: genres,
      watched: [],
    };
  },
  async created() {
    this.watched = await MovieService.getWatchlist();
    this.userPreference = await MovieService.getMyMovieLikes();
    this.movies = await MovieService.getMovies();
  },
  computed: {
    user() {
      return this.$store.getters.getUserCredentials;
    },
  },
  methods: {
    movieWatched(movie) {
      if (!movie.watchlist.length) {
        return false;
      }
      const index = movie.watchlist.findIndex(
        (watchedFilm) => watchedFilm.user_id === this.user.id
      );
      return movie.watchlist[index].watched;
    },
    navigateToImage(id) {
      this.$router.push(`movie/${id}`);
    },
    async fetchNextPage() {
      this.movies = await MovieService.getNextPage(
        this.movies.links[this.currentPage].url
      );
    },
    async updateMovieLike() {
    this.movies = await getMovies();
    },
    async filterMovies() {
      this.movies = await MovieService.filterMovies(this.filter);
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
  transition: transform 0.2s;
  max-width: 20rem;
  width: 450px;
}
.movie-card-item:hover {
  transform: scale(1.1);
  cursor: pointer;
}
.center {
  justify-content: center;
}
</style>
