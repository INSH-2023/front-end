<script setup>
import BaseNav from './components/BaseNav.vue';
import ShowAllEvent from './view/private__page/ShowAllEvent.vue';
import Main_private from './view/private__page/Main_private.vue';
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
