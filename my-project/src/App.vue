<script setup>
import BaseNav from './components/BaseNav.vue';
import ShowAllEvent from './view/admin__page/ShowAllEvent.vue';
</script>

<template>
<div class="h-screen w-screen">

  <nav class="h-[20%]">
    <BaseNav/>
  </nav>
  <div class="h-[80%]">
    <ShowAllEvent/>
  </div>
    
    
   
</div>

</template>

<style scoped>

</style>
