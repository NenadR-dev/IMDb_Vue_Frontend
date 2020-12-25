<template>
  <div class="middle-center">
    <h4>Search:</h4>
    <b-row>
      <b-col>
        <b-form-input
          v-model="searchQuery"
          type="text"
          placeholder="enter movie title"
        ></b-form-input>
      </b-col>
      <b-col>
        <strong>Status: {{ searchIndicator }}</strong>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import _ from "lodash";
import MovieService from "../services/MovieService";
export default {
  props: {
    searchMovie: Function,
  },
  data() {
    return {
      searchQuery: "",
      searchQueryIsDirty: false,
      isCalculating: false,
      testMovie: {},
    };
  },
  computed: {
    searchIndicator: function () {
      if (this.isCalculating) {
        return "⟳ Fetching new results";
      } else if (this.searchQueryIsDirty) {
        return "... Typing";
      } else {
        return "✓ Done";
      }
    },
  },
  watch: {
    searchQuery: function () {
      this.searchQueryIsDirty = true;
      this.expensiveOperation();
    },
  },
  methods: {
    expensiveOperation: _.debounce(async function () {
      this.isCalculating = true;
      this.searchQuery === ""
        ? (this.testMovie = await MovieService.getMovies())
        : (this.testMovie = await MovieService.filterMovies(this.searchQuery, "title"));
      this.isCalculating = false;
      this.searchQueryIsDirty = false;
      this.searchMovie(this.testMovie);
    }, 750),
  },
};
</script>

<style scoped>
.middle-center {
  width: 50%;
  margin: auto;
}
</style>
