<template>
  <div>
    <b-row>
      <div>
        <h4>
          <show-error
            v-show="errorMessage.length > 0"
            :errorMessages="errorMessage"
          ></show-error>
        </h4>
        <b-card
          :img-src="movie.imageCover"
          img-alt="Card image"
          img-width="450px"
          img-height="600px"
          img-left
          class="mb-3"
        >
          <b-card-title
            ><b>{{ movie.title }}</b></b-card-title
          >
          <b-card-text>
            <p>
              <b>{{ movie.description }}</b>
            </p>
            <br />
            <p>
              Genre: <b>{{ movie.genre }}</b>
            </p>
            <p>
              Visited: <b>{{ movie.visited }} </b> times.
            </p>
          </b-card-text>
        </b-card>
      </div>
    </b-row>
    <b-row>
      <b-textarea placeholder="Comment" rows="3" v-model="commentText" />
      <b-button variant="success" @click="postComment">Add comment</b-button>
    </b-row>
    <div v-for="comment in movie.comments" :key="comment.id">
      <comment :commentMessage="comment.comment_text" />
    </div>
  </div>
</template>

<script>
import { getMovieByID, postUserComment } from "../services/MovieService.js";
import Error from "../components/Error.vue";
import Comment from "../components/Comment.vue";
export default {
  components: {
    showError: Error,
    Comment,
  },
  data() {
    return {
      movie: {},
      errorMessage: [],
      commentText: "",
    };
  },
  async created() {
    try {
      this.movie = await getMovieByID(this.$route.params.id);
    } catch (e) {
      this.errorMessage = e;
    }
  },
  methods: {
    async postComment() {
      try {
        var newComment = await postUserComment({
          comment: this.commentText,
          movieId: this.movie.id,
        });
        this.movie.comments.push(newComment)
      } catch (e) {
        this.commentText = e
      }
    },
  },
};
</script>

<style></style>
