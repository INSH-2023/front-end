<script setup>
import {ref, onBeforeMount,onMounted } from 'vue';
import BaseNav from '../../components/BaseNav.vue';
import validate from '../../JS/validate';

// import ShowAllEvent from './for_admin/ShowAllEvent.vue';
const role=ref(undefined)
const userName=ref(undefined)
onBeforeMount(()=>{
   role.value = validate.getUserDataFromLocal('user_role')
   userName.value = `${validate.getUserDataFromLocal('user_first_name')} ${validate.getUserDataFromLocal('user_last_name')}`
})

onMounted(()=>{
   validate.vLogin()
})
</script>
<template>
    <BaseNav :role="role" :user-name="userName" class="h-fit  w-full"/>
    <router-view class="w-[100%] h-fit mx-auto"/>    
</template>
<style scoped>

</style>    