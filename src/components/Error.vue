<template>
  <div :style="{ color: 'red' }">
    <ul v-for="ind in errorMessages.keys()" :key="ind[0]">
      <ul v-for="dat in errorMessages[ind]" :key="dat[0]">
        {{
          dat[0]
        }}
      </ul>
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