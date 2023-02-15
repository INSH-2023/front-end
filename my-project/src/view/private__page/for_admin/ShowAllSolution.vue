<script setup>
import{ref, onBeforeMount}from'vue'
const isFilter=ref(false)
const solutionList =ref([])
const solutionLink ='http://localhost:3000/solutions'

// get solution 
const getSolu =async()=>{
    let res = await fetch(solutionLink,{
        method:'GET'
    })
    if(res.status==200){
        solutionList.value=await res.json()
        console.log('get Solution success')
    }else{
        console.log('error something cannot get solution')
    }

}

// delete
const deleteItem =async (v)=>{
    let res = await fetch(`${solutionLink}/${v}`,{
        method:'DELETE'
    })
    if(res.status==200){
        console.log('delete success')
        getEvents()
    }else{
        console.log('can not delete data error something')
    }
}

onBeforeMount(()=>{
    getSolu()
})
</script>
<template>
<div class="overflow-y-auto relative show_up">
    <div class="">
        <div class="">
            
            <div class=" bg-white w-full mx-auto  h-fit ">
                <div class="w-full text-center font-semibold text-[40px] pt-6">
                    <div class="flex w-fit mx-auto">
                        <img src="../../../assets/vue.svg" alt="users_icon" class="w-[40px] mr-4">
                        All Solution
                    </div>

                </div>
                <!-- button -->
                <div class="   right-[80px] top-[115px]  absolute">
                    <button @click="isFilter= !isFilter" class="flex w-fit">
                        <span class="font-semibold my-auto">
                            ตัวกรอง
                        </span> 
                        <img src="../../../assets/vue.svg" alt="icon" class="w-[20px] ml-[5px] my-auto">                                
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
                                    {{data.title}} 
                                </div>
                            </td>
                            <td class="w-[90px] px-6 py-4 font-semibold ">
                                    <img src="../../../assets/vue.svg" alt="" class="w-[40px] mx-auto">
                            </td>
                            <td class="w-[130px] px-3 py-4 font-semibold ">
                                <div class="w-[250px] truncate mx-auto">
                                    <span v-for="(tag,indexx) in data.tag" :key="indexx">
                                        {{tag}},
                                    </span>
                                    
                                </div>
                            </td>
                            <td class="w-[130px] px-3 py-4 font-semibold ">
                                <div class="w-[300px] truncate mx-auto">
                                    {{data.text}}
                                </div>
                            </td>
                            <td class="w-[130px] px-6 py-4 font-semibold">
                                <div class="flex w-fit mx-auto truncate ">
                                    <img src="../../../assets/admin_page/edit.png" alt="delete_icon" class="w-[28px] m-2">
                                    <img @click="deleteItem" src="../../../assets/admin_page/bin.png" alt="delete_icon" class="w-[28px] m-2 cursor-pointer">
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