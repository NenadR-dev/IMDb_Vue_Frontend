<template>
  <b-row>
    <b-col class="like"
      ><b-icon
        icon="emoji-smile-fill"
        class="hover-icon"
        :variant="liked ? 'success' : 'secondary'"
        @click="toggleLike"
      ></b-icon>
      <span> {{ numOfLikes }}</span></b-col
    >
    <b-col class="dislike">
      <span
        ><b-icon
          icon="emoji-expressionless-fill"
          class="hover-icon"
          :variant="disliked ? 'danger' : 'secondary'"
          @click="toggleDislike"
        ></b-icon
        >{{ numOfDislikes }}</span
      ></b-col
    >
  </b-row>
</template>

<script>
import { likeMovie, removeLike } from "../services/MovieService.js";
export default {
  props: {
    movieId: Number,
  },
  data() {
    return {
      liked: false,
      disliked: false,
      numOfLikes: 12,
      numOfDislikes: 4,
    };
  },
  methods: {
    async toggleLike() {
      var response = "";
      if (this.liked && !this.disliked) {
        this.liked = false;
        response = await removeLike({
          movieId: this.$props.movieId
        });
      } else {
        this.liked = true;
        this.disliked = false;

        response = await likeMovie({
          movieId: this.$props.movieId,
          liked: this.liked,
        });
      }
      console.log(response);
    },
    async toggleDislike() {
      if (!this.liked && this.disliked) {
        this.disliked = false;
        response = await removeLike({
          movieId: this.$props.movieId
        });
      } else {
        this.liked = false;
        this.disliked = true;
        var response = await likeMovie({
          movieId: this.$props.movieId,
          liked: this.liked,
        });
      }

      console.log(response);
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
