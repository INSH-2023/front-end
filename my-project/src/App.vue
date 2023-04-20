<script setup>
import { useRouter } from 'vue-router'
import BaseNav from './components/BaseNav.vue';
const myRouter = useRouter()
</script>

<template>
<div class="w-screen ">

  <!-- <nav class="h-[20%]">
    <BaseNav/>
  </nav>
  <div class="h-[80%]">
    <ShowAllEvent/>
  </div> -->
  <!-- <Main_private/> -->
  <!-- <BaseNav  :isPublic="true"/> -->

  <router-view />
</div>

</template>

<style >
*{
  font-family: 'Kanit', sans-serif;
}

.show_up{
  animation: tada 0.7s
}

@keyframes tada{
    0%{opacity: 0;}
    100%{opacity: 1;}
}

</style>
