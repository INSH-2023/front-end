<script setup>
import BaseStatus from '../../../components/BaseStatus.vue'
import { useRoute, useRouter } from 'vue-router';
import { onBeforeMount, ref } from 'vue';
import getRefreshToken from './../../../JS/refresh';
const { params } = useRoute()
const myRouter = useRouter()
const goMain = () => myRouter.go(-1)

console.log(params)
const id = params.id
// const infoLink = "http://localhost:3000/solutions"
const infoLink = `${import.meta.env.VITE_BACK_END_HOST}/solutions`

const data = ref(undefined)
// get infomation
// ถ้า get เป็น id จะดีมาก
const getInfo = async () => {
    let res = await fetch(`${infoLink}/${id}`, {
        method: 'GET'
    })
    if (res.status == 200) {
        console.log("get info already")
        data.value = await res.json()
        console.log(data.value)
    } else {
        console.log("can not get data")
    }
}

onBeforeMount(() => {
    getInfo(),
        getRefreshToken(JSON.parse(jsCookie.get("data")).refreshToken)
})
</script>
<template>
    <div class="overflow-auto">
        <div class="pt-2">
            <!-- this is for nav status -->
            <BaseStatus />

            <!-- this is for infomation -->
            <div class="mt-[50px] w-[1000px] mx-auto">

                <!-- title -->
                <div class="flex ml-[30px] w-[500px]">
                    <img src="../../../assets/vue.svg" alt="img" class="w-[100px]">
                    <h3 class="my-auto mx-3 text-[50px] font-semibold">
                        {{ data.solution_title }}
                    </h3>
                </div>

                <!-- text -->
                <div class="mt-[50px] text-[18px]">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {{ data.solution_text }}
                </div>

                <!-- tag -->


                <!-- step -->
                <div v-for="(data, index) in data.solutions" :key="index" class="mt-[50px] text-[18px]">
                    <div class="mb-4">
                        <span class="text-[20px] ml-[12px] mr-[20px]">{{ data.step }}</span>
                        <h3>{{ data.step_name }}</h3>
                        <p>{{ data.step_decription }}</p>
                    </div>
                </div>

            </div>

            <!-- button back -->
            <div class="w-fit mx-auto mt-[40px]">
                <button @click="goMain"
                    class="rounded-xl text-[25px] font-semibold text-white px-[40px] py-[4px] bg-gray-400">
                    ย้อนกลับ
                </button>
            </div>
        </div>
    </div>
</template>
<style scoped></style>