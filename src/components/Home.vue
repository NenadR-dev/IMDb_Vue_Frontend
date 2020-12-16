<template>
  <div>
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="3000"
      controls
      indicators
      fade
      img-width="1024"
      img-height="480"
    >
      <b-carousel-slide
        caption="New Movies"
        img-src="https://picsum.photos/1024/480/?image=10"
      >
        <div class="center">
          <h4>
            Get the latest info on your favorite movies. The ones you missed and the ones
            you plan on watching.
          </h4>
        </div>
      </b-carousel-slide>
      <b-carousel-slide
        caption="About me"
        img-src="https://picsum.photos/1024/480/?image=12"
      >
        <div class="center">
          <h4>
            I love drinking beer and playing video games. The internship is going great.
            Im learing a lot of new things that will help me grow into becoming an awesome
            web developer :)
          </h4>
        </div>
      </b-carousel-slide>
      <b-carousel-slide
        caption="The future"
        img-src="https://picsum.photos/1024/480/?image=22"
      >
        <div class="center">
          <h4>And here we can see the future client</h4>
        </div></b-carousel-slide
      >
    </b-carousel>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.center {
  justify-self: center;
  padding-bottom: 300px;
}
.carousel {
  text-shadow: 1px 1px 2px #333;
  background: #ababab;
}
</style>
