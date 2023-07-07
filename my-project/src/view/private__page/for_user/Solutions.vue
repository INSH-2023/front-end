<script setup>
import BaseStatus from '../../../components/BaseStatus.vue';
import { useRoute, useRouter } from 'vue-router';
import { onBeforeMount, ref } from 'vue';
import getRefreshToken from './../../../JS/refresh';
import jsCookie from '../../../JS/cookies';
import toBackEnd from '../../../JS/fetchToBack';

const { params } = useRoute()
const myRouter = useRouter()
const goMain = () => myRouter.go(-1)

const token = ref("")

const id = params.id
// const infoLink = "http://localhost:3000/solutions"
const infoLink = `${import.meta.env.VITE_BACK_END_HOST}/solutions`

const info = ref({})
// get infomation
// ถ้า get เป็น id จะดีมาก
const getInfo = async () => {
    token.value = JSON.parse(jsCookie.get("data")).token
    let [status, data] = await toBackEnd.getDataBy('solution',infoLink,id,token.value)
    if (status == 200) {
        console.log("get info already")
        info.value = data
        console.log(info.value)
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
                        {{ info.solution_title }}
                    </h3>
                </div>

                <!-- text -->
                <div class="mt-[50px] text-[18px]">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span v-html="info.solution_text"></span>
                </div>

                <!-- tag -->


                <!-- step -->
                <div v-for="(data, index) in info.solution_steps" :key="index" class="mt-[50px] text-[18px]">
                    <div class="mb-4">
                        <span class="text-[20px] ml-[12px] mr-[20px]">{{ data.step_ }} : {{ data.step_name }}</span> 
                        <p class="text-[14px] ml-[12px] mr-[20px]"><span v-html="data.step_description"></span></p>
                        <img class="w-[400px] ml-[12px] mr-[20px]">
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