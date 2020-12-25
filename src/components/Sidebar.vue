<template>
  <div>
    <b-button v-b-toggle.sidebar-right>Related Movies</b-button>
    <b-sidebar id="sidebar-right" title="Related Movies" right shadow>
      <div class="px-3 py-2" v-for="movie in movies" :key="movie.id">
        <b-card
          :title="movie.title"
          :img-src="movie.imageCover"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 20rem"
          img-width="200px"
          img-height="250px"
          class="mb-2 related"
          @click="goToMovie(movie.id)"
        >
        </b-card>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
import MovieService from "../services/MovieService";
export default {
  props: {
    relatedBy: String,
    movieId: Number,
  },
  data() {
    return {
      relatedMovies: [],
    };
  },
  computed: {
    movies() {
      if (this.relatedMovies.data !== undefined) {
        return this.relatedMovies.data.filter((x) => x.id !== this.movieId);
      }
      return [];
    },
  },
  async created() {
    try {
      this.relatedMovies = await MovieService.filterMovies(this.relatedBy, "genre");
      console.log(this.relatedMovies);
    } catch (e) {
      console.log(e);
    }
  },
  methods: {
    goToMovie(id) {
      this.$router.push(`${id}`);
    },
  },
};
</script>

<style scoped>
.related {
  padding-left: 10px;
  transition: transform 0.2s;
}
.related:hover {
  transform: scale(1.05);
  cursor: pointer;
}
</style>
