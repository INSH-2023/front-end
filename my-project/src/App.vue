<script setup>
import { useRouter } from 'vue-router'
import BaseNav from './components/BaseNav.vue';
const myRouter = useRouter()
</script>

<template>
<div class="h-screen w-screen overflow-y-auto">

  <!-- <nav class="h-[20%]">
    <BaseNav/>
  </nav>
  <div class="h-[80%]">
    <ShowAllEvent/>
  </div> -->
  <!-- <Main_private/> -->
  <!-- <BaseNav  :isPublic="true"/> -->

  <router-view ></router-view>
</div>

</template>

<style scoped>

</style>
