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
import { calculateMovieLikes, likeMovie, removeLike } from "../services/MovieService.js";
import Error from './Error.vue'
export default {
  components: {
    showError: Error
  },
  props: {
    movieId: Number,
    movieStatus: Array,
    updateMovie: Function,
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
    [this.numOfLikes, this.numOfDislikes] = calculateMovieLikes(this.$props.movieStatus);
    let movie = this.movieStatus.find((x) => x.movie_id === this.movieId);
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
        await removeLike({
          movieId: this.movieId,
        });
        this.liked = false;
        this.disliked = false;
        this.$props.updateMovie();
        return;
      }
      try {
        this.liked = like === "liked";
        this.disliked = !this.liked;
        var result = await likeMovie({
          liked: this.liked,
          disliked: this.disliked,
          movieId: this.movieId,
        });
        this.liked = Boolean(result.pivot.liked);
        this.disliked = Boolean(result.pivot.disliked);
        this.$props.updateMovie();
      } catch (e) {
        this.errorMessage = e
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
