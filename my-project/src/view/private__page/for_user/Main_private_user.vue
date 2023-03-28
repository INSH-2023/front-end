<script setup>
import {ref, onBeforeMount,onMounted } from 'vue';
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

    <BaseNav :role="role" :user-name="userName" class="h-fit  w-full"/>

    <router-view class="w-[100vw] h-[90%]"/>    

</template>
<style scoped>

/* Hide scrollbar for Chrome, Safari and Opera */
.no-scrollbar::-webkit-scrollbar {
    display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.no-scrollbar {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
}
</style>