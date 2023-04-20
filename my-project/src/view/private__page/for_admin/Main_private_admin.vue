<script setup>
import BaseLeftBar from '../../../components/BaseLeftBar.vue';
</script>
<template>
<div class="w-[100vw] h-screen flex">
   <div class="w-[20vw] h-full ">
      <BaseLeftBar />      
   </div>
   <div class="w-[80vw] h-full">
      <router-view  />    
   </div>
</div>
 
</template>
<style scoped>
</style>