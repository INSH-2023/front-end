<script setup>
import{ref,computed}from'vue'
const sampleData=ref([
    {
        "id":1,
        "user":"นักรับ ทมิฬ",
        "email":"testingEmail@testingmain.com",
        "group":"วิจัยและวัฒนะธรรม",
        "active":false,
        "respo":"administrator",
    },{
        "id":2,
        "user":"ทมิฬ นักรับ ",
        "email":"testingEmail@testingmain.com",
        "group":"วิจัยและวัฒนะธรรม",
        "active":true,
        "respo":"administrator",
    },
    
])
const isFilter=ref(false)

// bg color status
const changeColorBy=(v)=>{
    let style=[]
    
    if(v=='Request'){
        style.push('background-color:rgb(31 41 55)')
        style.push('color: rgb(255 255 255);')
        
    }else
    if(v=='Open_Case'){
        style.push('background-color:rgb(245 158 11)')
        style.push('color: rgb(255 255 255);')
    }else
    if(v=='In_Progress'){
        style.push('background-color:rgb(56 189 248)')
        style.push('color: rgb(255 255 255);')
    }else
    if(v=='Finish'){
        style.push('background-color: rgb(45 212 191)')
        style.push('color: rgb(255 255 255);')
    }

    if(v=='IT_Service'){
        style.push('color: rgb(14 165 233);')
        
    }else
    if(v=='PR_Service'){
        style.push('color: rgb(217 119 6);')
        
    }

    return style
}


</script>
<template>
<div class="overflow-y-auto relative">
    <div class="">
        <div class="">
            
            <div class=" bg-white w-full mx-auto  h-fit ">
                <div class="w-full text-center font-semibold text-[40px] pt-6">
                    <div class="flex w-fit mx-auto">
                        <img src="../../../assets/vue.svg" alt="users_icon" class="w-[40px] mr-4">
                        All User
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
                <div v-show="isFilter==true" class="w-fit mx-auto absolute">
                    <div class="flex ">
                        <div class="p-3">
                            testing filter
                        </div>
                        <div class="p-3">
                            testing filter
                        </div>
                        <div class="p-3">
                            testing filter
                        </div>
                        <div class="p-3">
                            testing filter
                        </div>
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
                                User
                            </th>
                            <th scope="col" class="py-3 px-6">
                                Group
                            </th>
                            <th scope="col" class="py-3 px-6">
                                Active
                            </th>
                            <th scope="col" class="py-3 px-6">
                                Reposibility
                            </th>
                            <th scope="col" class="py-3 px-6">
                                Reposibility
                            </th>
                            
                            
                        </tr>                        
                    </thead>
                    <tbody>
                        <tr v-for="data in sampleData"  class="text-[15px] cursor-pointer bg-white border-b-2 border-gray-300 hover:border-gray-400 hover:bg-gray-400">
                            <td class="w-[140px]   font-medium px-6 py-4 text-left">
                            <div class="w-[130px] font-semibold truncate mx-auto">
                                {{data.user}}
                            </div>
                            <div class="w-[130px] text-[10px] truncate mx-auto">
                                {{ data.email }}
                            </div> 
                            </td>
                            <td class="w-[130px] px-6 py-4 font-semibold ">
                                <div class="w-[120px] truncate mx-auto">
                                    {{data.group}}
                                </div>
                            </td>
                            <td class="w-[130px] px-6 py-4 font-semibold ">
                                <div class="w-[120px] truncate mx-auto" :style="data.active==true?'color:green':'color:red'">
                                    {{data.active==true?'Active':'inActive'}}                                    
                                </div>

                            </td>
                            <td class="w-[130px] px-6 py-4 font-semibold ">
                                <div class="w-[120px] mx-auto">
                                {{data.respo}}
                                </div>
                            </td>
                            <td class="w-[130px] px-6 py-4 font-semibold">
                                <div class="flex w-fit mx-auto truncate ">
                                    <img src="../../../assets/vue.svg" alt="delete_icon" class="w-[28px] m-2">
                                    <img src="../../../assets/vue.svg" alt="delete_icon" class="w-[28px] m-2">
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