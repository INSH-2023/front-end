<script setup>

</script>
<template>

    <!-- <BaseNav :role="role" :user-name="userName" class="h-fit  w-full"/> -->

    <router-view class="w-screen h-screen"/>    

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