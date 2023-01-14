<script setup>
import { useRouter } from 'vue-router'
const myRouter = useRouter()
</script>

<template>
<div class="h-screen w-screen">

  <!-- <nav class="h-[20%]">
    <BaseNav/>
  </nav>
  <div class="h-[80%]">
    <ShowAllEvent/>
  </div> -->
  <!-- <Main_private/> -->
  <router-view></router-view>
</div>

</template>

<style scoped>

</style>
