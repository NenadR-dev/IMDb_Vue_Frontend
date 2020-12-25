<template>
  <div class="center">
    <h1>Watchlist</h1>
    <show-error v-show="errorMessage.length > 0" :errorMessages="errorMessage" />
    <b-row>
      <div class="center card-distance" v-for="movie in movies.watched" :key="movie.id">
        <b-card
          :title="movie.title"
          :img-src="movie.imageCover"
          img-alt="Image"
          img-top
          class="mb-2 movie-card-item center"
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
          </b-card-text>
          <b-button @click="removeMovie(movie.id)" class="center" variant="danger"
            >Remove from Watchlist</b-button
          >
          <b-form-checkbox
            :id="movie.title"
            name="movieWatched"
            v-model="movie.pivot.watched"
            :value="1"
            :unchecked-value="0"
            @change="updateWatchlist(movie.pivot)"
          >
            Watched
          </b-form-checkbox>
        </b-card>
      </div>
    </b-row>
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
      errorMessage: [],
      status: 0,
    };
  },
  methods: {
    async removeMovie(id) {
      try {
        await MovieService.removeMovieFromWatchlist(id);
        this.movies.watched.splice(
          this.movies.watched.findIndex((x) => x.id === id),
          1
        );
      } catch (e) {
        this.errorMessage = e;
      }
    },
    async updateWatchlist(data) {
      try {
        console.log(data);
        await MovieService.updateWatchlist({
          movieId: data.movie_id,
          userId: data.user_id,
          watched: data.watched,
        });
      } catch (e) {
        this.errorMessage = e;
      }
    },
  },
  async created() {
    try {
      this.movies = await MovieService.getWatchlist();
    } catch (e) {
      this.errorMessage = e;
    }
  },
};
</script>

<style>
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
.center {
  justify-content: center;
}
</style>
