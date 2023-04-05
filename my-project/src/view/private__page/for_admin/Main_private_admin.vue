<script setup>
import BaseLeftBar from '../../../components/BaseLeftBar.vue';
</script>
<template>

 <div class="flex h-[90.5%]">
    <BaseLeftBar class="w-[20vw] "/>
    <router-view class="w-[80vw]" />  
 </div>
  
</template>
<style scoped>
</style>