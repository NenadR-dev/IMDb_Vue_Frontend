<template>
  <div :style="{ color: 'red' }">
    <ul v-for="error in errorMessages" :key="error.message">
      {{error}}
    </ul>
  </div>
</template>

<script>
export default {
    props:{
        errorMessages: Array
    }
};
</script>

<style>
</style>