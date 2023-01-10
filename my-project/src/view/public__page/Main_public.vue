<script setup>
import BaseNav from '../../components/BaseNav.vue';
</script>
<template>

    <nav class="h-[20%] w-full">
    <BaseNav  />
  </nav>
  <div class="h-[80%] w-full">
    <!-- <ShowAllEvent/> -->
    <!-- this is main private -->
    <router-view></router-view>
  </div>

</template>
<style scoped>
</style>