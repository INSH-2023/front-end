<script setup>
import{ref,computed,onBeforeMount} from 'vue'
import {useRouter,useRoute} from 'vue-router'

const myRouter = useRouter()
const goMain=()=> myRouter.push({name:'booking'})

const {params} = useRoute()
const typeP =params.id

// sample data
const sampleData =ref([])

// first
const typeU = ref(undefined)
// second
const typeM =ref(undefined)
// third
const problems =ref([])

// other
const others=ref(undefined)
const massage=ref('')

// compute selection
const selectioned=ref([])
const createdOBJ =ref({})


// validation


// for other button
const isOther =ref(false)
const otherF =()=>{
    others.value=''
    console.log(typeP)
    isOther.value= !isOther.value   
    
}

// add problem
const addP =(v)=>{
    let check=false
    for(let value of problems.value){
        if(value==v)check=true;
       
    } 
    if(check==true){
        // console.log(problems.value.indexOf(v))
        problems.value.splice(problems.value.indexOf(v),1)
        // console.log(problems.value)

        // animation
        for(let value2 of sampleData.value){
            if(value2.problems==v){
                value2.selection= !value2.selection
            }
            
        }
        check=false
    }
    else if(check==false){
        problems.value.push(v)

        // animation
        for(let value2 of sampleData.value){
            if(value2.problems==v){
                value2.selection= !value2.selection
            }
            
        }
        console.log(sampleData.value)
        console.log(problems.value)
    }
    
}


// isSummary
const isSummary=ref(false)


onBeforeMount(()=>{
    
// sample data from back-end
 sampleData.value=[
    {
        "id":'NoteBook1',
        "problems":'NoteBook1',
        "selection":false
    },
    {
        "id":'NoteBook2',
        "problems":'NoteBook2',
        "selection":false
    },
    {
        "id":'NoteBook3',
        "problems":'NoteBook3',
        "selection":false
    },
    {
        "id":'NoteBook4',
        "problems":'NoteBook4',
        "selection":false
    },
    {
        "id":'NoteBook5',
        "problems":'NoteBook5',
        "selection":false
    },
    {
        "id":'NoteBook6',
        "problems":'NoteBook6',
        "selection":false
    },
    {
        "id":'NoteBook7',
        "problems":'NoteBook7',
        "selection":false
    }]

    // for(let data of sampleData.value){
    //     createdOBJ.value={}
    //     createdOBJ.value[`${data.problems}`]=data.id
    //     createdOBJ.value[`${data.problems}`]=false
    //     selectioned.value.push()
    // }
    // console.log(sampleData.value)


})
</script>
<template>
<div class="overflow-auto">
    <div class="pt-3">

        <!-- for write report -->
        <div v-if="isSummary==false"  class="w-[1000px] mx-auto">
            
            <!-- first -->
            <div v-if="typeP=='hardware'||typeP=='software'||typeP=='internet'" class="mt-5 ">
                <div class="text-[20px] font-semibold">
                    <h3 >
                        1. เลือก <span class="text-rose-500">ประเภท</span> อุปกรณ์ ของคุณ
                    </h3>                    
                </div>

                
                <div class="flex text-[15px] font-medium">
                    <div class="flex m-2" >
                        <input v-model="typeU" id="Organization" type="radio" name="hardware_of" value="or" class="m-auto mr-3"> 
                        <label for="Organization" class="m-auto">
                            NoteBook / PC :ของสำนักงาน
                        </label>                       
                    </div>
                    <div class="flex m-2">
                        <input v-model="typeM" id="Self" type="radio" name="hardware_of" value="sf" class="m-auto mr-3">
                        <label for="Self" class="m-auto">
                            NoteBook / PC :ของส่วนตัวโปรดระบุ ยี้ห้อ / รุ่น
                        </label>
                        
                    </div>


                </div>                
            </div>

            <!-- second type of matchine -->
            <div v-if="typeP=='hardware'||typeP=='software'||typeP=='internet'" class="mt-4">
                <div class="text-[20px] font-semibold">
                    <h3 >
                        2. เลือก <span class="text-rose-500">ชนิด</span> อุปกรณ์ของคุณ
                    </h3>                    
                </div>

                
                <div class="grid grid-cols-6 gap-y-2 gap-x-2 mt-4 text-[15px] font-medium">
                    <!-- notebook -->
                    <button @click="typeM='NoteBook'" name="problem" :style="[typeM=='NoteBook'?'background-color:#1E88E5;color:#E3F2FD':'']" class="w-[150px] mx-auto p-2 bg-gray-200 rounded-xl hover:bg-gray-300">
                        <img src="../../../assets/vue.svg" alt="NoteBook" class="w-[80px] mx-auto">
                        <h3 class="w-fit mx-auto">
                            NoteBook
                        </h3>
                    </button>

                    <!-- PC -->
                    <button @click="typeM='PersonalComputer'" name="problem" :style="[typeM=='PersonalComputer'?'background-color:#1E88E5;color:#E3F2FD':'']" class="w-[150px] mx-auto p-2 bg-gray-200 rounded-xl hover:bg-gray-300">
                        <img src="../../../assets/vue.svg" alt="NoteBook" class="w-[80px] mx-auto">
                        <h3 class="w-fit mx-auto ">
                            PC
                        </h3>
                    </button>
                    
                    <!-- Smart Phone -->
                    <button @click="typeM='Smart_Phone'" name="problem" :style="[typeM=='Smart_Phone'?'background-color:#1E88E5;color:#E3F2FD':'']" class="w-[150px] mx-auto p-2 bg-gray-200 rounded-xl hover:bg-gray-300">
                        <img src="../../../assets/vue.svg" alt="NoteBook" class="w-[80px] mx-auto">
                        <h3 class="w-fit mx-auto text-[14px]">
                            Smart Phone
                        </h3>
                    </button>

                    <!-- Tablet -->
                    <button @click="typeM='Tablet'" name="problem" :style="[typeM=='Tablet'?'background-color:#1E88E5;color:#E3F2FD':'']" class="w-[150px] mx-auto p-2 bg-gray-200 rounded-xl hover:bg-gray-300">
                        <img src="../../../assets/vue.svg" alt="NoteBook" class="w-[80px] mx-auto">
                        <h3 class="w-fit mx-auto">
                            Tablet
                        </h3>
                    </button>
                </div>
               

            </div>

            <!-- third problem -->
            <div v-if="typeP != 'other'" class="mt-4">
                <div class="text-[20px] font-semibold">
                    <h3 v-if="typeP=='hardware'">
                        3. เลือก <span class="text-rose-500">ปัญหา</span> Hardware ที่ต้องการให้ช่วยเหลือ
                    </h3>
                    <h3 v-if="typeP=='software'">
                        3. เลือก <span class="text-rose-500">ปัญหา</span>Software ที่ต้องการให้ช่วยเหลือ
                    </h3>
                    <h3 v-if="typeP=='internet'">
                        3. เลือก <span class="text-rose-500">ปัญหา</span> Internet ที่ต้องการให้ช่วยเหลือ
                    </h3>
                    <h3 v-if="typeP=='printer'">
                        1. เลือก <span class="text-rose-500">ปัญหา</span> Printer ที่ต้องการให้ช่วยเหลือ
                    </h3>
                    <h3 v-if="typeP=='website'">
                        1. เลือก หัวข้อ <span class="text-rose-500">Website</span> ที่ต้องการให้ช่วยเหลือ
                    </h3>
                    <h3 v-if="typeP=='meeting'">
                        1. เลือก หัวข้อ <span class="text-rose-500">Meeting</span> ที่ต้องการให้ช่วยเหลือ
                    </h3>
                    <h3 v-if="typeP=='application'">
                        1. เลือก หัวข้อ <span class="text-rose-500">Application</span> ที่ต้องการให้ช่วยเหลือ
                    </h3>                     
                </div>

                <div  class="grid grid-cols-6 gap-y-2 gap-x-2 mt-4 text-[15px] font-medium">
                    <!-- notebook -->
                    <button  v-for="(value,index) in sampleData" :key="index" @click="addP(value.problems)" :style="[value.selection==true?'background-color:gray':'']" class="w-[150px] mx-auto p-2 hover:bg-gray-300 bg-gray-200 rounded-xl">
                        <img src="../../../assets/vue.svg" alt="NoteBook" class="w-[80px] mx-auto">
                        <h3 class="w-fit mx-auto">
                            {{value.problems}}
                        </h3>
                    </button>
 

                    <!-- other -->
                    <button  @click="otherF" class="w-[150px] mx-auto p-2 bg-gray-200 rounded-xl hover:bg-gray-300">
                        <img src="../../../assets/report_icon/other.png" alt="other" class="w-[80px] mx-auto">
                        <h3 class="w-fit mx-auto">
                            อื่นๆโปรดระบุ
                        </h3>
                    </button> 
                </div>
            </div>

                <!-- fourth -->
                <div v-if="typeP !='other'"  class="flex flex-nowrap mt-10 mx-auto">
                    <div v-show="isOther==true" class="mx-4">
                        <label for="other_1" class="ml-3 text-[17px] font-semibold inline-b">
                            กรณีเลือก<span class="text-rose-500 pl-2">อื่นๆโปรดระบุ</span>
                        </label>
                        <span class="text-[13px] ml-2">(กรณีไม่พบปัญหาข้างต้น)</span>
                        <textarea v-model="others" name="other" id="other_1" cols="50" rows="10" class="resize-none pt-[10px] block rounded-xl bg-gray-300 p-2 focus:outline-0" ></textarea>
                    </div>
                    
                    <div  class="mx-4">
                        <label for="other_2" class="ml-3 text-[17px] font-semibold">
                            ระบุรายละเอียดของปัญหาที่พบ (ถ้ามี)
                        </label>
                        <textarea v-model="massage" name="other" id="other_2" cols="50" rows="10" class="resize-none block bg-gray-300 rounded-xl p-2 focus:outline-0"></textarea>
                    </div>
                </div>

                <!-- other -->
                <div v-else-if="typeP=='other'" class="mt-10 mx-auto w-fit mx-auto">
                    <div class="mx-4">
                        <label for="other_1" class="ml-3 text-[17px] font-semibold inline-b">
                            ระบุ รายละเอียด หรือ ความต้องการของคุณ
                        </label>
                        <span class="text-[13px] ml-2">(กรณีไม่พบปัญหาข้างต้น)</span>
                        <textarea v-model="others" name="other" id="other_1"  class="resize-none pt-[10px] block w-[700px] h-[150px] rounded-xl bg-gray-300 p-2 focus:outline-0" ></textarea>
                    </div>
                    
                    <div  class="mx-4 mt-4">
                        <label for="other_2" class="ml-3 text-[17px] font-semibold">
                            หมายเหตุเพิ่มเติม (ถ้ามี)
                        </label>
                        <textarea v-model="massage" name="other" id="other_2"  class="resize-none block w-[700px] h-[150px] bg-gray-300 rounded-xl p-2 focus:outline-0"></textarea>
                    </div>
                </div>

                
            

            <!-- button -->
            <div class="w-fit mx-auto mt-10">
                <button @click="goMain" class="w-[130px] mx-3 p-2 font-semibold bg-gray-400 text-white rounded-xl">
                    <h4>
                        ย้อนกลับ
                    </h4>
                </button>
                <button @click="isSummary=true" class="w-[130px] mx-3 p-2 font-semibold bg-rose-400 text-white rounded-xl">
                    <h4>
                        ถัดไป
                    </h4>
                </button>
            </div>

        </div>



        <!-- for summary -->
        <div v-if="isSummary==true" class="w-[1000px] mx-auto">
            <div class=" w-fit mx-auto text-[25px] font-semibold">
                <h3>
                    สรุปข้อมูล
                </h3>
            </div>

            <!-- first -->
            <div v-if="typeP=='hardware'||typeP=='software'||typeP=='internet'" class="mt-10 w-fit text-[20px] font-semibold">
                <h3 class="w-fit mx-auto mr-2">
                   1. <span class="text-rose-500">ประเภท</span> ของ Hardware : {{  }}
                </h3>
                <h3 class="w-fit mx-auto mr-2">
                    ยี้ห้อ : {{  }}
                </h3>
                <h3 class="w-fit mx-auto mr-2">
                    S/N : {{  }}
                </h3>
            </div>

            <!-- second  -->
            <div v-if="typeP=='hardware'||typeP=='software'||typeP=='internet'" class="mt-4">
                <div class="text-[20px] font-semibold">
                    <h3 >
                        2. <span class="text-rose-500">ชนิด</span> อุปกรณ์ของคุณ
                    </h3>
                                          
                </div>

                
                <div class="grid grid-cols-6 gap-y-2 gap-x-2 mt-4 text-[15px] font-medium">
                    <!-- notebook -->
                    <div class="w-[150px] mx-auto p-2 bg-gray-200 rounded-xl ">
                        <img src="../../../assets/vue.svg" alt="NoteBook" class="w-[80px] mx-auto">
                        <h3 class="w-fit mx-auto">
                            NoteBook
                        </h3>
                    </div >
                </div>
            </div>

            <!-- third -->
             <div v-if="typeP!='other'"  class="mt-4">
                <div class="text-[20px] font-semibold">
                    <h3 v-if="typeP=='hardware'||typeP=='software'||typeP=='internet'">
                        3. <span class="text-rose-500"> สรุป </span> อาการของ Hardware ของคุณ
                    </h3>   
                    
                    <h3 v-if="typeP=='printer'">
                        1. <span class="text-rose-500"> สรุป </span> ปัญหา Printer ที่คุณต้องการความช่วยเหลือ
                    </h3> 

                    <h3 v-if="typeP=='website'">
                        1. <span class="text-rose-500"> สรุป </span> ปัญหา Website ที่คุณต้องการความช่วยเหลือ
                    </h3> 

                    <h3 v-if="typeP=='meeting'">
                        1. <span class="text-rose-500"> สรุป </span> หัวข้อ Meeting ที่คุณต้องการความช่วยเหลือ
                    </h3> 

                    <h3 v-if="typeP=='application'">
                        1. <span class="text-rose-500"> สรุป </span> ปัญหา Application ที่คุณต้องการความช่วยเหลือ
                    </h3> 

                    
                    
                </div>

                
                <div class="grid grid-cols-6 gap-y-2 gap-x-2 mt-4 text-[15px] font-medium">
                    <!-- notebook -->
                    <div  class="w-[150px] mx-auto p-2 bg-gray-200 rounded-xl ">
                        <img src="../../../assets/vue.svg" alt="NoteBook" class="w-[80px] mx-auto">
                        <h3 class="w-fit mx-auto">
                            NoteBook
                        </h3>
                    </div >

                    <!-- PC -->
                    <div  class="w-[150px] mx-auto p-2 bg-gray-200 rounded-xl ">
                        <img src="../../../assets/vue.svg" alt="NoteBook" class="w-[80px] mx-auto">
                        <h3 class="w-fit mx-auto ">
                            PC
                        </h3>
                    </div >
                    
                    <!-- Smart Phone -->
                    <div  class="w-[150px] mx-auto p-2 bg-gray-200 rounded-xl ">
                        <img src="../../../assets/vue.svg" alt="NoteBook" class="w-[80px] mx-auto">
                        <h3 class="w-fit mx-auto text-[14px]">
                            Smart Phone
                        </h3>
                    </div >

                    <!-- Tablet -->
                    <div class="w-[150px] mx-auto p-2 bg-gray-200 rounded-xl ">
                        <img src="../../../assets/vue.svg" alt="NoteBook" class="w-[80px] mx-auto">
                        <h3 class="w-fit mx-auto">
                            Tablet
                        </h3>
                    </div >
                </div>
            </div>


            <!-- fourth -->
            <div v-if="typeP !='other'"  class="flex flex-nowrap w-fit mt-10 ">
                <div v-show="isOther==true" class="mx-4">
                    <label for="other_1" class="ml-3 text-[17px] font-semibold inline-b">
                        กรณีเลือก<span class="text-rose-500 pl-2">อื่นๆโปรดระบุ</span>
                    </label>
                    <span class="text-[13px] ml-2">(กรณีไม่พบปัญหาข้างต้น)</span>
                    <textarea v-model="others" name="other" id="other_1" cols="50" rows="5" disabled class="resize-none pt-[10px] block rounded-xl bg-gray-300 p-2 focus:outline-0" ></textarea>
                </div>
                
                <div  class="mx-4">
                    <label for="other_2" class="ml-3 text-[17px] font-semibold">
                        ระบุรายละเอียดของปัญหาที่พบ (ถ้ามี)
                    </label>
                    <textarea v-model="massage" name="other" id="other_2" cols="50" rows="5" disabled class="resize-none block bg-gray-300 rounded-xl p-2 focus:outline-0"></textarea>
                </div>
                <div>

                </div>
            </div>

            <!-- other -->
            <div v-else-if="typeP=='other'" class="mt-10 mx-auto w-fit mx-auto">
                <div class="mx-4">
                    <label for="other_1" class="ml-3 text-[17px] font-semibold inline-b">
                        ระบุ รายละเอียด หรือ ความต้องการของคุณ
                    </label>
                    <span class="text-[13px] ml-2">(กรณีไม่พบปัญหาข้างต้น)</span>
                    <textarea v-model="others" name="other" id="other_1"  disabled class="resize-none pt-[10px] block w-[700px] h-[150px] rounded-xl bg-gray-300 p-2 focus:outline-0" ></textarea>
                </div>
                    
                <div  class="mx-4 mt-4">
                    <label for="other_2" class="ml-3 text-[17px] font-semibold">
                        หมายเหตุเพิ่มเติม (ถ้ามี)
                    </label>
                    <textarea v-model="massage" name="other" id="other_2" disabled  class="resize-none block w-[700px] h-[150px] bg-gray-300 rounded-xl p-2 focus:outline-0"></textarea>
                </div>
            </div>

            <!-- button -->
            <div class="w-fit mx-auto mt-10">
                <button @click="isSummary=false" class="w-[130px] mx-3 p-2 font-semibold bg-gray-400 text-white rounded-xl">
                    <h4>
                        ย้อนกลับ
                    </h4>
                </button>
                <button @click="isSummary=true" class="w-[130px] mx-3 p-2 font-semibold bg-rose-400 text-white rounded-xl">
                    <h4>
                        ขอรับบริการ
                    </h4>
                </button>
            </div>

        </div>

    </div>
</div>   
</template>
<style scoped>
</style>