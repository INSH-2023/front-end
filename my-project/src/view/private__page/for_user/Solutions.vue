<script setup>
import BaseStatus from '../../../components/BaseStatus.vue';
import { useRoute, useRouter } from 'vue-router';
import { onBeforeMount, ref } from 'vue';
// import getRefreshToken from './../../../JS/refresh';
// import jsCookie from '../../../JS/cookies';
import toBackEnd from '../../../JS/fetchToBack';

const { params } = useRoute()
const myRouter = useRouter()
const goMain = () => myRouter.go(-1)

const token = ref("")

const id = params.id
// const infoLink = "http://localhost:3000/solutions"
const infoLink = `${import.meta.env.VITE_BACK_END_HOST}/solutions`
const iconLink = `${import.meta.env.VITE_BACK_END_HOST}/images/solutions`

const info = ref({})
// get infomation
// ถ้า get เป็น id จะดีมาก
const getInfo = async () => {
    // token.value = JSON.parse(jsCookie.get("data")).token
    let [status, data] = await toBackEnd.getDataBy('solution', infoLink, id)
    if (status == 200) {
        console.log("get info already")
        info.value = data
        console.log(info.value)
    } else {
        console.log("can not get data")
    }
}

onBeforeMount(() => {
    // let refreshToken =validate.getUserDataFromLocal('refreshToken')
    getInfo()
        // getRefreshToken()
})
</script>
<template>
    <div class="overflow-auto">
        <div class="pt-2">

            <!-- this is for infomation -->
            <div class="mt-[50px] w-auto mx-2">

                <!-- title -->
                <div class="flex ml-[30px] w-[500px]">
                    <img :src="`${iconLink}/${info.solutionId}`" alt="img" class="w-[100px]">
                    <h3 class="my-auto mx-3 text-[50px] font-semibold">
                        {{ info.solution_title }}
                    </h3>
                </div>

                <!-- text -->
                <div class="mt-[50px] text-[18px] ml-[30px]">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span v-html="info.solution_text"></span>
                </div>

                <!-- tag -->
                <div class="pt-2 pl-2 indent-[5px] font-light">
                    <h3 class="my-auto mx-3 text-[30px] font-semibold my-3">Tag</h3>
                    <span v-for="(tag, index) in info.solution_tag" :key="index"
                        class="bg-gray-200 text-gray-600 px-2 py-1 mx-1 w-full text-gray-800 rounded-xl text-[20px] text-bold ml-[30px]">
                        {{ tag }}
                    </span>
                </div>

                <!-- step -->
                <div v-for="(data, index) in info.solution_steps" :key="index" class="mt-[50px] text-[18px]">
                    <div class="mb-4">
                        <h3 class="my-auto mx-3 text-[30px] font-semibold ">Step {{ data.step_ }} :</h3>
                        <p class="text-[20px] ml-[12px] mr-[20px] font-semibond my-2">{{ data.step_name }}</p>
                        <p class="text-[16px] ml-[12px] mr-[20px] my-2"><span v-html="data.step_description"></span></p>
                        <img v-if="data.step_upload!=0" class="w-[400px] ml-[12px] mr-[20px]" 
                            :src="`${iconLink}/${info.solutionId}?step=${data.step_}`">
                    </div>
                </div>
            </div>

            <!-- button back -->
            <div class="w-fit mx-auto my-[40px]">
                <button @click="goMain"
                    class="rounded-xl text-[25px] font-semibold text-white px-[40px] py-[4px] bg-gray-400">
                    ย้อนกลับ
                </button>
            </div>
        </div>
    </div>
</template>
<style scoped></style>