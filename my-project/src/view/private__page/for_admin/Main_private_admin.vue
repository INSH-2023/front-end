<script setup>
import BaseLeftBar from '../../../components/BaseLeftBar.vue';
</script>
<template>
<div class="w-full h-full flex flex-row">
   <div class=" w-[400px] h-full">
      <BaseLeftBar />      
   </div>
   <div class="w-full h-full ">
      <router-view  />    
   </div>
</div>
 
</template>
<style scoped>
</style>