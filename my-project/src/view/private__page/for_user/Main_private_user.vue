<script setup>
import BaseNav from '../../../components/BaseNav.vue';
// import ShowAllEvent from './for_admin/ShowAllEvent.vue';
</script>
<template>

    <nav class="h-[10%]">
    <BaseNav useW="admin" />
  </nav>
  <div class="h-[90%]">
    <!-- <ShowAllEvent/> -->
   
    <router-view></router-view>
  </div>

</template>
<style scoped>
</style>