<template>
  <div class="middle-center">
    <h4>Elastic Search:</h4>
    <b-row>
      <b-col>
        <div class="accordion" role="tablist">
          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-form-input
                v-model="searchQuery"
                type="text"
                placeholder="enter movie title"
              ></b-form-input>
            </b-card-header>
            <b-collapse
              id="accordion-1"
              :visible="visible"
              accordion="my-accordion"
              role="tabpanel"
            >
              <b-card-body>
                <div v-if="isCalculating">
                  <b-spinner variant="info"></b-spinner>
                </div>
                <div v-else>
                  <b-card-text v-for="movie in movies" :key="movie.id">
                    <b-link @click="navigateToMovie(movie.id)">{{ movie.title }}</b-link>
                  </b-card-text>
                </div>
              </b-card-body>
            </b-collapse>
          </b-card>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import debounce from "lodash/debounce";
import MovieService from "../services/MovieService";
export default {
  props: {
    searchMovie: Function,
  },
  data() {
    return {
      searchQuery: "",
      isCalculating: false,
      movies: [],
    };
  },
  computed: {
    visible() {
      return this.searchQuery ? true : false;
    },
  },
  watch: {
    searchQuery: function () {
      this.expensiveOperation();
    },
  },
  methods: {
    expensiveOperation: debounce(async function () {
      this.isCalculating = true;
      this.movies = await MovieService.elasticSearch({
        query: this.searchQuery,
      });
      this.isCalculating = false;
    }, 300),
    navigateToMovie(id) {
      this.$router.push(`movie/${id}`);
    },
  },
};
</script>

<style scoped>
.middle-center {
  width: 50%;
  margin: auto;
}
</style>
