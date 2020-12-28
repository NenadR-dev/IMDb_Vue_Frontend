<template>
  <b-card>
    <b-media>
      <template #aside>
        <b-img blank blank-color="#ccc" width="64" alt="placeholder"></b-img>
      </template>

      <h5 class="mt-0">User name here</h5>
      <p>{{ commentMessage }}</p>
    </b-media>
  </b-card>
</template>

<script>
export default {
  props: {
    commentMessage: String,
    commentUser: String,
  },
};
</script>

<style></style>
