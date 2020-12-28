<template>
  <b-row>
    <h1>
    <show-error v-show="errorMessage.length > 0" :errorMessages="errorMessage" /></h1>
    <b-col class="like"
      ><b-icon
        icon="emoji-smile-fill"
        class="hover-icon"
        :variant="liked ? 'success' : 'secondary'"
        @click="toggleLike('liked')"
      ></b-icon>
      <span> {{ numOfLikes }}</span></b-col
    >
    <b-col class="dislike">
      <span
        ><b-icon
          icon="emoji-expressionless-fill"
          class="hover-icon"
          :variant="disliked ? 'danger' : 'secondary'"
          @click="toggleLike('disliked')"
        ></b-icon
        >{{ numOfDislikes }}</span
      ></b-col
    >
  </b-row>
</template>

<script>
import MovieService from "../services/MovieService.js";
import Error from '../components/Error.vue'
export default {
  components: {
    showError: Error
  },
  props: {
    movieId: Number,
    userPreference: Array,
    movieLikeCount: Array,
  },
  data() {
    return {
      liked: false,
      disliked: false,
      numOfLikes: 0,
      numOfDislikes: 0,
      errorMessage: []
    };
  },
  created() {
    [this.numOfLikes, this.numOfDislikes] = MovieService.calculateMovieLikes(
      this.$props.movieLikeCount
    );
    let movie = this.userPreference.find((x) => x.movie_id === this.movieId);
    if (movie !== undefined) {
      if (movie.liked === 1) {
        this.liked = true;
      } else {
        this.disliked = true;
      }
    }
  },
  watch: {
    movieStatus() {
      [this.numOfLikes, this.numOfDislikes] = calculateMovieLikes(
        this.$props.movieStatus
      );
    },
  },
  methods: {
    async toggleLike(like) {
      if ((like === "liked" && this.liked) || (like === "disliked" && this.disliked)) {
        let result = await MovieService.removeLike({
          movieId: this.movieId,
        });
        if (this.disliked) {
          this.numOfDislikes -= 1;
        } else {
          this.numOfLikes -= 1;
        }
        this.disliked = false;
        this.liked = false;
        console.log(result);
        return;
      }
      var isLiked = like === "liked";
      let result = await MovieService.likeMovie({
        movieId: this.movieId,
        liked: isLiked,
      });
      if (result.pivot.liked === 1) {
        this.liked = true;
        this.disliked = false;
        this.numOfLikes += 1;
      } else {
        this.disliked = true;
        this.liked = false;
        this.numOfDislikes += 1;
      }
    },
  },
};
</script>

<style>
.like {
  justify-content: start;
}
.like-true {
  background-color: chartreuse;
  scale: 2;
}
.dislike {
  margin-left: 170px;
}
.hover-icon {
  transition: transform 0.2s;
}
.hover-icon:hover {
  transform: scale(2);
  cursor: pointer;
}
</style>
