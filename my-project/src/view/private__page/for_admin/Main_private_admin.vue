<script setup>
import BaseLeftBar from '../../../components/BaseLeftBar.vue';
import BaseNav from '../../../components/BaseNav.vue';
// import ShowAllEvent from './for_admin/ShowAllEvent.vue';
</script>
<template>
 
 <BaseNav  class="h-[9.5%]  w-full"/>
 <div class="flex h-[90.5%]">
    <BaseLeftBar class="w-[25vw] "/>
    <router-view class="w-[75vw]" />  
 </div>
  

</template>
<style scoped>
</style>