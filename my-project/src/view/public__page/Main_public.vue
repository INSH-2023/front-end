<script setup>
import BaseNav from '../../components/BaseNav.vue';
</script>
<template>

    
    <!-- <router-view class="w-[100vw] h-[90%] "/>  -->


    <div class="w-full h-[60px]  z-50">
        <BaseNav   />   
   </div>
   <div class="w-full h-full z-10">
      <router-view />    
   </div>

    <!-- <ShowAllEvent/> -->
    <!-- this is main private -->



</template>
<style scoped>
</style>