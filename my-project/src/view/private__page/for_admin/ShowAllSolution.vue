<script setup>
import{ref, onBeforeMount}from'vue'
import getRefreshToken from './../../../JS/refresh';
import jsCookie from '../../../JS/cookies'
import toBackEnd from '../../../JS/fetchToBack';
const isFilter=ref(false)
const solutionList =ref([])
// const solutionLink ='http://localhost:3000/solutions'
const solutionLink =`${import.meta.env.VITE_BACK_END_HOST}/solutions`
const token = ref('')

// get solution 
const getSolu =async()=>{
    token.value = JSON.parse(jsCookie.get("data")).token
    let [status,data] = await toBackEnd.getData('solution',solutionLink,token.value)
    if(status==200){
        solutionList.value=data
        console.log('get Solution success')
    }else{
        console.log('error something cannot get solution')
    }
}

// delete
const deleteItem =async (v)=>{
    let [status] = await toBackEnd.delete('solution',solutionLink,v,token.value)
    if(status==200){
        console.log('delete success')
        getSolu()
    }else{
        console.log('can not delete data error something')
    }
}

onBeforeMount(()=>{
    getSolu()
    getRefreshToken(JSON.parse(jsCookie.get("data")).refreshToken)
})
</script>
<template>
<div class="overflow-y-auto relative show_up">
    <div class="">
        <div class="">
            
            <div class=" bg-white w-full mx-auto  h-fit ">
                <div class="w-full text-center font-semibold text-[40px] pt-6">
                    <div class="flex w-fit mx-auto">
                        <img src="../../../assets/admin_page/document.png" alt="users_icon" class="w-[60px] mr-4">
                        All Solution
                    </div>

                </div>
                <!-- button -->
                <div class="   right-[80px] top-[115px]  absolute">
                    <button @click="isFilter= !isFilter" class="flex w-fit">
                        <span class="font-semibold my-auto">
                            ตัวกรอง
                        </span> 
                        <img src="../../../assets/admin_page/filter.png" alt="icon" class="w-[20px] ml-[5px] my-auto">                                
                    </button>
                </div>

                <!-- filter -->
                <div v-show="isFilter==true" class="w-fit mx-auto absolute p-2 left-[20px]">
                    <div class="flex ">
                        <div class="p-3">
                            <input type="text" placeholder="searching " class="w-[200px] h-[30px] p-3 bg-gray-300 rounded-lg focus:outline-0">
                        </div>
                        <div class="p-3 my-auto">
                            <label for="title">
                                Title : 
                            </label>
                            <select name="title"  id="title" class="focus:outline-0 cursor-pointer">
                                <option value="">มากไปน้อย</option>
                                <option value="">น้อยไปมาก</option>

                            </select>
                        </div>
                        <div class="p-3 my-auto">
                            <label for="title">
                                Tag : 
                            </label>
                            <select name="title"  id="title" class="focus:outline-0 cursor-pointer">
                                <option value="">มากไปน้อย</option>
                                <option value="">น้อยไปมาก</option>

                            </select>
                        </div>
                        <!-- <div class="p-3">
                            testing filter
                        </div> -->
                    </div>
                </div>
            </div>
                
            

        
              <!-- table -->    
        <div class="w-[1200px] mx-auto  h-[450px] mt-16"> 
            <hr class="mt-3 bg-gray-700  w-[1170px] h-[3px]">
            <div class="overflow-y-auto mx-auto h-[100%] w-[100%] ">
                <table class="w-full text-sm text-center text-gray-800 ">
                    <thead class="bg-white text-lg sticky top-0">
                        <tr class="">
                            <th scope="col" class="py-3 px-6 ">
                                Title
                            </th>
                            <th scope="col" class="py-3 px-6">
                                Icon
                            </th>
                            <th scope="col" class="py-3 px-6">
                                Tag
                            </th>
                            <th scope="col" class="py-3 px-6">
                                Description
                            </th>
                            <th scope="col" class="py-3 px-6">
                                Detail
                            </th>
                            
                            
                        </tr>                        
                    </thead>
                    <tbody>
                        <tr v-for="(data,index) in solutionList" :key="index" class="text-[15px]  bg-white border-b-2 border-gray-300 hover:border-gray-400 hover:bg-gray-400">
                            <td class="w-[140px]   font-medium px-6 py-4 text-left">
                                <div class="w-[130px] font-semibold truncate mx-auto text-center">
                                    {{data.solution_title}} 
                                </div>
                            </td>
                            <td class="w-[90px] px-6 py-4 font-semibold ">
                                    <img src="../../../assets/vue.svg" alt="" class="w-[40px] mx-auto">
                            </td>
                            <td class="w-[130px] px-3 py-4 font-semibold ">
                                <div class="w-[250px] truncate mx-auto">
                                    <span v-for="(tag,index) in data.solution_tag" :key="index">
                                        {{tag}}
                                    </span>
                                </div>
                            </td>
                            <td class="w-[130px] px-3 py-4 font-semibold ">
                                <div class="w-[300px] truncate mx-auto">
                                    <span v-html="data.solution_text"></span>
                                </div>
                            </td>
                            <td class="w-[130px] px-6 py-4 font-semibold">
                                <div class="flex w-fit mx-auto truncate ">
                                    <img src="../../../assets/admin_page/edit.png" alt="delete_icon" class="w-[28px] m-2">
                                    <img @click="deleteItem(data.solutionId)" src="../../../assets/admin_page/bin.png" alt="delete_icon" class="w-[28px] m-2 cursor-pointer">
                                </div>
                            </td>
                        </tr>      
                    </tbody>
                </table>    
            </div>    
        </div>
        </div> 
    </div>
</div>
</template>
<style scoped>
</style>