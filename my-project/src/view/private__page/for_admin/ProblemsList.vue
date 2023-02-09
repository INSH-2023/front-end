<script setup>
import {ref,onBeforeMount} from 'vue'

const problemsLink='http://localhost:3000/problem'
const problemList=ref([])

const subject=ref('none')
const isEdit =ref(false)
// get problem
const getP =async()=>{
    const res = await fetch(problemsLink,{
        method:'GET'
    })
    if(res.status==200){
        problemList.value=await res.json()
        splitProblems(1)
        console.log('get problems successful')
    }else{
        console.log('error something cannot get data')
    }
}

// split data
const maxOfPage = ref(8)
const maxOfL = ref(0)
const minOfL  = ref(0)
const sumP =ref(0)
const problemSplit=ref([])
// const pageN=ref(1)
// for count N of page
const pageN =()=>{
    let length = problemList.value.length/maxOfPage.value
    let number = Math.ceil(length)
    // sumP.value=number
    return number
}

// for click and first value
const splitProblems=(N)=>{
    let max =(N*maxOfPage.value)-1
    let min =(max-maxOfPage.value)+1
    let arr =[]
    for(let i=min;i<=max;i++){
        if(problemList.value[i]){
            arr.push(problemList.value[i])
        }
        
    }
    problemSplit.value=arr
    console.log(problemSplit.value)
    console.log('A max : ',max)
    console.log('A min : ',min)


    // if(data.length>8){
    //     for(let i=0;i>0;i++){
    //         problemSplit.value.push(data[i])
    //     }
    // }else{}
}

// display fn 
const display=ref(undefined)
const hoverFn =(b,n)=>{
    display.value=b
    let eInfo =document.getElementById(`info_${n}`)
    let eEdit =document.getElementById(`edit_${n}`)
    let card = document.getElementById(`card_${n}`)

    // var element = document.getElementById("myDIV");
//   element.classList.remove("mystyle");
    if(display.value==true){
        // eInfo.style.visibility="hidden"
        // eEdit.style.visibility="visible"
        eInfo.style.display="none"
        eEdit.style.display="block"
        card.style.background="#C6AC8F"

        console.log('hover',n)
    }else{
        // eInfo.style.visibility="visible"
        // eEdit.style.visibility="hidden"
        eEdit.style.display="none"
        eInfo.style.display="block"
        card.style.background="#EAE0D5"
    }
   
}

onBeforeMount(()=>{
    getP()
})


</script>
<template>
<div class="overflow-y-auto relative">
    <div class="">
        <div class=" bg-white w-full mx-auto  h-fit ">
                <div class="w-full text-center font-semibold text-[40px] pt-6">
                    <div class="flex w-fit mx-auto tracking-wide">
                        <img src="../../../assets/vue.svg" alt="users_icon" class="w-[40px] h-[40px] my-auto mr-4">
                        <h4 class="text-[#5E503F]">
                            Problems List   
                        </h4> 
                    </div>
                </div>
                <!-- button
                <div class="   right-[80px] top-[115px]  absolute">
                    <button @click="isFilter= !isFilter" class="flex w-fit">
                        <span class="font-semibold my-auto">
                            ตัวกรอง
                        </span> 
                        <img src="../../../assets/admin_page/filter.png" alt="icon" class="w-[20px] ml-[5px] my-auto">                                
                    </button>
                </div> -->

                <!-- filter
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
                </div> -->
                
            </div>

            <div class="relative w-[1100px] mx-auto  h-[500px] ">
                <!-- <hr class="mt-3 bg-gray-700  w-full h-[3px]"/> -->
                <!-- select type -->
                <div class="relative w-fit h-[53px] mt-[20px] ml-[20px]   ">
                    <h4 v-show="subject !='none'" class="text ml-2 text-sm font-semiboldd text-[#C6AC8F]">
                        Type of subject
                    </h4>
                    <select v-model="subject" name="subject" id="subject" class="absolute bottom-0 w-[200px] bg-[#C6AC8F] text-[#0A0908] text-[20px] font-light rounded-lg p-[1px]  px-[10px]">
                        <option value="none" selected hidden>Type of subject</option>
                        <option value="hardware1" >Hardware1</option>
                        <option value="hardware2" >Hardware2</option>
                        <option value="hardware3" >Hardware3</option>


                    </select>
                    <!-- <input type="text" class="bg-gray-200"> -->
                </div>

                <!-- การ์ด problems -->
                <div class=" grid grid-cols-4 gap-4 mt-[15px] ml-10 text-center">
                    <div :id="`card_${index}`" @mouseover="hoverFn(true,index)" @mouseleave="hoverFn(false,index)"   v-for="(p,index) in problemSplit" :key="index" class="card block w-full h-[175px] mx-auto bg-[#EAE0D5] rounded-lg">
                        <div :id="`info_${index}`" class="info ">
                            <img :src="p.img" alt="logo" class="w-[80px] mx-auto mt-6 ">
                            <!-- ชื่อ -->
                            <h4 class="text-[20px] mt-6 font-light">
                                {{ p.name }}
                            </h4>                           
                        </div>
                        <div :id="`edit_${index}`" style="display: none;" class="edit  mt-[20px] ">
                            <h4 class="w-full font-semibold text-[#FFFFFF] cursor-default">
                                {{ p.name }}                              
                            </h4>
                            <!-- edit button -->
                            <div class="w-full h-fit mt-3">
                                <button class="bg-[#0A0908] text-[#EAE0D5] text-[20px] px-4 py-2 font-light hover:bg-[#EAE0D5] hover:text-[#0A0908] rounded-lg">
                                    แก้ไขข้อมูล
                                </button>
                            </div>

                            <!-- delete card -->
                            <div class="w-full h-fit mt-2">
                                <button class=" bg-[#C1121F] text-[#FDF0D5] text-[14px] px-3 py-1 font-light hover:bg-rose-300 hover:text-gray-600 rounded-lg">
                                    ลบข้อมูล
                                </button>                                
                            </div>


                        </div>
 
                        <!-- <button @click="">splitProblems</button> -->
                    </div>
                    
                </div>

                <!-- page -->
                <div class="absolute inset-x-0 bottom-0 flex w-fit mx-auto">
                    <button @click="splitProblems(N)" v-for="N in pageN()" class=" w-full px-4 py-1 mx-2 text-[15px] bg-[#5E503F] text-[#C6AC8F] font-bold rounded-full focus:bg-[#C6AC8F] focus:text-[#5E503F] ">
                        {{N}}
                    </button>
                </div>

            </div>
    </div>
</div>
</template>
<style scoped>
.text{
    animation: tada 2s 
}



@keyframes tada{
    0%{opacity: 0%;}
    100%{opacity: 100%;}
}

</style>