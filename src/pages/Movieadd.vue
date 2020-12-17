<template>
  <div class="movie-form">
    <b-card
      tag="article"
      class="mb-2 image-card"
      img-top
      :img-src="showImage"
      img-alt="Image"
    >
      <b-form @submit.prevent="onSubmit">
        <b-card-title>
          <b-form-input
            id="title"
            name="title"
            type="text"
            required
            placeholder="Enter title"
            v-model="movie.title"
          ></b-form-input>
        </b-card-title>
        <b-card-body>
          <b-form-textarea
            id="description"
            name="description"
            required
            placeholder="Enter description. . ."
            rows="3"
            max-rows="6"
            v-model="movie.description"
          ></b-form-textarea>
          <b-form-group
            id="genre-group"
            label="Genre"
            label-for="Genre"
          ></b-form-group>
          <b-form-select
            id="genre"
            name="genre"
            type="password"
            :options="genres"
            required
            v-model="movie.genre"
          ></b-form-select>
          <b-form-group
            id="image-group"
            label="Image"
            label-for="image"
          ></b-form-group>
          <b-form-file
            id="image"
            name="image"
            required
            :state="Boolean(movie.imageCover)"
            placeholder="Choose a file or drop it here..."
            drop-placeholder="Drop file here..."
            v-model="movie.imageCover"
          ></b-form-file>
        </b-card-body>
        <b-row
          ><b-button class="btn-padding" type="submit" variant="primary"
            >Add Movie
          </b-button>
          <show-error
            v-show="errorMessage.length > 0"
            :errorMessages="errorMessage"
          />
          <h4 class="feedback-text" :v-show="feedback">
            {{ feedback }}
          </h4></b-row
        >
      </b-form>
    </b-card>
  </div>
</template>

<script>
import Error from "../components/Error.vue";
import { addMovie, genres } from "../services/MovieService.js";
export default {
  components: {
    showError: Error,
  },
  data() {
    return {
      movie: {
        title: "",
        description: "",
        genre: "",
        imageCover: null,
      },
      genres,
      
      errorMessage: [],
      feedback: "",
    };
  },
  computed: {
    showImage() {
      if (this.movie.imageCover) {
        return URL.createObjectURL(this.movie.imageCover);
      } else {
        return "";
      }
    },
  },
  methods: {
    async onSubmit() {
      try {
        await addMovie(this.movie);
        this.feedback = "Movie Added";
      } catch (e) {
        this.errorMessage = e;
      }
    },
  },
};
</script>

<style>
.movie-form {
  margin: auto;
  width: 50%;
  padding-top: 20px;
}
.image-card {
  max-width: 40rem;
}
.btn-padding {
  margin-left: 35px;
}
.feedback-text {
  padding-left: 140px;
}
</style>
