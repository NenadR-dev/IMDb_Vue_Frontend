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
        <b-row>
          <b-card
            :img-src="movie.imageCover"
            img-alt="Card image"
            img-width="450px"
            img-height="600px"
            img-left
            class="mb-3 movie-card"
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
              <b-button
                :disabled="movieWatched"
                @click="addToWatchlist(movie.id)"
                variant="primary"
                >Add to Watchlist</b-button
              >
              <span v-show="feedbackMsg">{{ feedbackMsg }}</span>
            </b-card-text>
          </b-card>
          <sidebar
            v-if="movie.genre !== undefined"
            :relatedBy="movie.genre"
            :movieId="movie.id"
          />
        </b-row>
      </div>
    </b-row>
    <div class="comment-section">
      <b-row>
        <b-textarea placeholder="Comment" rows="3" v-model="commentText" />
        <b-button variant="success" @click="postComment">Add comment</b-button>
      </b-row>
      <div v-for="comment in comments.data" :key="comment.id">
        <comment :commentMessage="comment.comment_text" />
      </div>
      <b-link v-show="comments.last_page !== currentPage" @click="fetchNextPage"
        >Show more</b-link
      >
    </div>
  </div>
</template>

<script>
import MovieService from "../services/MovieService.js";
import Error from "../components/Error.vue";
import Comment from "../components/Comment.vue";
import Sidebar from "../components/Sidebar.vue";
export default {
  components: {
    showError: Error,
    Comment,
    Sidebar,
  },
  data() {
    return {
      movie: {},
      errorMessage: [],
      commentText: "",
      comments: [],
      currentPage: 1,
      feedbackMsg: "",
    };
  },
  async created() {
    try {
      this.movie = await MovieService.getMovieByID(this.$route.params.id);
      this.comments = await MovieService.getMovieCommentsById(this.$route.params.id);
      console.log(this.comments);
    } catch (e) {
      this.errorMessage = e;
    }
  },
  computed: {
    user() {
      return this.$store.getters.getUserCredentials;
    },
    movieWatched() {
      if (this.movie.watchlist !== undefined) {
        let watched = this.movie.watchlist.findIndex((x) => x.user_id === this.user.id);
        return watched !== -1;
      }
      return false;
    },
  },
  methods: {
    async postComment() {
      try {
        var newComment = await MovieService.postUserComment({
          comment: this.commentText,
          movieId: this.movie.id,
        });
        this.comments.data.unshift(newComment);
      } catch (e) {
        this.commentText = e;
      }
    },
    async fetchNextPage() {
      try {
        this.comments.last_page >= this.currentPage
          ? (this.currentPage += 1)
          : this.currentPage;
        var newComments = await MovieService.getNextPage(
          this.comments.links[this.currentPage].url
        );
        newComments.data.forEach((comment) => {
          this.comments.data.push(comment);
        });
      } catch (e) {
        this.errorMessage = e;
      }
    },
    async addToWatchlist(id) {
      try {
        await MovieService.addMovieToWatchlist({
          movieId: id,
          watched: false,
        });
        this.feedbackMsg = "Movie added";
      } catch (e) {
        this.errorMessage = e;
      }
    },
  },
};
</script>

<style scoped>
.comment-section {
  margin-left: 40px;
  margin-right: 40px;
}
.movie-card {
  padding-left: 70px;
  width: 1200px;
}
</style>
