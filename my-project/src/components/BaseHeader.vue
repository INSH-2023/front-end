<script setup>
defineProps({
    title:{
        type:String,
        required:true
    }
})

const path="../assets/vue.svg"

</script>
<template>
    <div class="w-full text-center font-semibold text-[40px] pt-6">
        <div class="flex w-fit mx-auto">
            <img v-if="title=='addUser'" src="../assets/admin_page/addUser.png" alt="users_icon" class="w-[50px] h-[50px] mr-4 my-auto">
            <img v-else-if="title=='allUser'" src="../assets/admin_page/allUser.png" alt="users_icon" class="w-[50px] h-[50px] mr-4 my-auto">
            <img v-else-if="title=='request'" src="../assets/admin_page/request.png" alt="users_icon" class="w-[50px] h-[50px] mr-4 my-auto">
            <img v-else-if="title=='addSolution'" src="../assets/admin_page/new-document.png" alt="users_icon" class="w-[50px] h-[50px] mr-4 my-auto">
            <!-- <img v-else-if="title=='adduser'" src="../assets/admin_page/addUser.png" alt="users_icon" class="w-[50px] h-[50px] mr-4 my-auto"> -->

            
            {{title}}
        </div>

        <hr class="mt-3 bg-gray-700  w-[1170px] h-[3px]">
    </div>
</template>
<style scoped>
</style>