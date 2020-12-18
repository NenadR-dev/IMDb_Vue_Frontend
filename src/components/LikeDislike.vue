<template>
  <b-row>
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
    async toggleLike(like) {
      var result;
      if((like === 'liked' && this.liked) || (like ==='disliked' && this.disliked)){
        result = await removeLike({
          movieId: this.movieId
        })
        return;
      } 
      var isLiked = like ==='liked';
      result = await likeMovie({
        movieId: this.movieId,
        liked: isLiked
      })
      console.log(result);
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
