<script setup>

defineProps({
    nRequest: {
        type: Number,
        require: true
    },
    nProgress: {
        type: Number,
        require: true
    },
    nFinish: {
        type: Number,
        require: true
    },
    nOpencase: {
        type: Number,
        require: true
    }
})
</script>
<template>
    <div class="flex mx-auto w-fit text-[24px] px-4 py-2 mt-4 bg-gray-300 rounded-3xl">

        <!-- การแจ้งซ่อม -->
        <div class=" flex mx-2 px-6 py-1 bg-amber-500 text-gray-100  rounded-2xl ">
            <h5>
                รับแจ้ง
            </h5>
            <h5 class="ml-4">
                {{ nRequest }}
            </h5>
        </div>

        <!-- กำลังดำเนินการ -->
        <div class=" flex mx-2 px-6 py-1 bg-sky-500 text-gray-100  rounded-2xl ">
            <h5>
                กำลังดำเนินการ
            </h5>
            <h5 class="ml-2">
                {{ nProgress }}
            </h5>
        </div>

        <div class="flex mx-2 px-6 py-1 bg-teal-400 text-gray-100  rounded-2xl">
            <h5>
                เสร็จสิ้น
            </h5>
            <h5 class="ml-2">
                {{ nFinish }}
            </h5>
        </div>

        <!-- <hr v-if="isRequest == true" class="bg-gray-700 h-[35px] w-[2px] m-auto mx-2"> -->

        <div class="flex mx-2 px-6 py-1 bg-rose-500 text-gray-100 rounded-2xl">
            <h5>
                เปิดเคส
            </h5>
            <h5 class="ml-2">
                {{ nOpencase }}
            </h5>
        </div>
    </div>
</template>
<style scoped></style>