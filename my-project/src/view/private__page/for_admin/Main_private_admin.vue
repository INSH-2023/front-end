<script setup>
import {ref, onBeforeMount,onMounted } from 'vue';
import BaseLeftBar from '../../../components/BaseLeftBar.vue';
import BaseNav from '../../../components/BaseNav.vue';
import validate from '../../../JS/validate';

// import ShowAllEvent from './for_admin/ShowAllEvent.vue';
const role=ref(undefined)
const userName=ref(undefined)
onBeforeMount(()=>{
   role.value = validate.getUserDataFromLocal('user_role')
   userName.value = validate.getUserDataFromLocal('user_email')
})

onMounted(()=>{
   validate.vLogin()
})


</script>
<template>
 
 <BaseNav :role="role" :user-name="userName" class="h-[9.5%]  w-full"/>
 <div class="flex h-[90.5%]">
    <BaseLeftBar class="w-[20vw] "/>
    <router-view class="w-[80vw]" />  
 </div>
  
 <!-- <button @click="myRouter.push({name:'signIn'})">sdfsdfsdf</button> -->

</template>
<style scoped>
</style>