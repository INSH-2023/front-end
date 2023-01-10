<script setup>
import BaseNav from '../../components/BaseNav.vue';
import ShowAllEvent from './ShowAllEvent.vue';
</script>
<template>

    <nav class="h-[20%]">
    <BaseNav useW="admin" />
  </nav>
  <div class="h-[80%]">
    <!-- <ShowAllEvent/> -->
   
    <router-view></router-view>
  </div>

</template>
<style scoped>
</style>