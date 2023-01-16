<script setup>
import BaseLeftBar from '../../../components/BaseLeftBar.vue';
import BaseNav from '../../../components/BaseNav.vue';
// import ShowAllEvent from './for_admin/ShowAllEvent.vue';
</script>
<template>
  <div class="flex h-[100%]">
 
      <BaseLeftBar class="h-[100%] w-[12%]" />


    <div class="h-[100%] w-[88%]">
      <BaseNav useW="admin"   class="h-[10%] " /> 
      <router-view            class=" h-[90%] block" />
      

    </div>
    
  </div>


</template>
<style scoped>
</style>