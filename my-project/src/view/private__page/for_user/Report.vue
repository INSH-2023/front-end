<script setup>
import{ref,computed,onBeforeMount} from 'vue'
import {useRouter,useRoute} from 'vue-router'

const myRouter = useRouter()
const goBack=()=> myRouter.go(-1)
const goMain=()=>myRouter.push({name:'services'})
const eventLink ="http://localhost:3000/events"
const problemsLink = "http://localhost:3000/problems"

const {params} = useRoute()
const typeP =params.id
const service=params.service

// ทำ alert
// ส่งออกข้อมูล


// sample data
const sampleData =ref([])

// first
const typeU = ref('')
const brand =ref('')
// second
const typeM =ref('')
// third
const problems =ref([])

// other
const others=ref('')
const massage=ref('')

// compute selection
const selectioned=ref([])
const createdOBJ =ref({})


// validation
const vd_typeU=ref(undefined)
const vd_brand=ref(undefined)
const vd_typeM =ref(undefined)

const summaryInfo=()=>{
// console.log(service)
    if(service=='it'){
        if(typeU.value == ''&&typeP =='hardware'&&typeP =='software'&&typeP =='internet'){
            console.log('please select ur type of use')
        }else
        if(typeU.value=='sf'&&brand.value.length==0){
            console.log('please input ur device')
        }else 
        if(typeM.value == ''&&typeP =='hardware'&&typeP =='software'&&typeP =='internet'){
            console.log('please select ur type of matchine')
        }else
        if(problems.value.length==0 && isOther.value == false){
            console.log('please select ur problems')
        }else
        if(isOther.value==true&&others.value.length==0){
            console.log('please input ur orther')
        }
        else{
            console.log('status good')
            let nextB =document.getElementById('goSummary')
            nextB.setAttribute('href','#summaryInfo')
            nextB.click()
            isSummary.value=true
        }
    }else
    if(service=='pr'){
        if(problems.value.length==0){
            console.log('please select ur problems')
        }else
        if(isOther.value==true&&others.value==''){
            console.log('please input ur orther')
        }else{
            console.log('status good')
            let nextB =document.getElementById('goSummary')
            nextB.setAttribute('href','#summaryInfo')
            nextB.click()
            isSummary.value=true
        }
        // console.log(service)
    }
    
    
}
    
// go back to main service
// const goBack=(v)=>myRouter.push({path:`/account/user/services/${v}`})

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
            if(value2.name==v){
                value2.selection= !value2.selection
            }
            
        }
        check=false
    }
    else if(check==false){
        problems.value.push(v)

        // animation
        for(let value2 of sampleData.value){
            if(value2.name==v){
                value2.selection= !value2.selection
            }
            
        }
        console.log(sampleData.value)
        console.log(problems.value)
    }
    
}


// isSummary
const isSummary=ref(false)


// get problems
const getProblems=async()=>{
    const res = await fetch(problemsLink,{
        method:'GET'
    })
    if(res.status==200){
        sampleData.value=await res.json()
        console.log('get problems successful')        
        await addProperty(sampleData.value)
    }else{
        console.log('error something cannot get data')
    }
}

// add property
const addProperty =async(v)=>{
    for(let data of v){
        data['selection']=false
    }
    console.log(v)
}

onBeforeMount(()=>{
    getProblems()
// sample data from back-end
//  sampleData.value=[
//     {
//         "id":1,
//         "problems":'NoteBook1'
//     },
//     {
//         "id":2,
//         "problems":'NoteBook2'
//     },
//     {
//         "id":3,
//         "problems":'NoteBook3'
//     },
//     {
//         "id":4,
//         "problems":'NoteBook4'
//     },
//     {
//         "id":5,
//         "problems":'NoteBook5'
//     },
//     {
//         "id":6,
//         "problems":'NoteBook6'
//     },
//     {
//         "id":7,
//         "problems":'NoteBook7'
//     }]

        // console.log(sampleData.value)
    //     createdOBJ.value={}
    //     createdOBJ.value[`${data.problems}`]=false
    //     selectioned.value.push()
})

// save from
const saveToLocal=()=>{
    localStorage.setItem("form",{
"typeU":typeU.value ,
"brand":brand.value,
"typeM":typeM.value,
"problems":problems.value,
"others":others.value,
"massage":massage.value
    })
}

// send form
const isSubmitt=ref(false)
const submitt = async()=>{
    let res=await fetch(eventLink ,{
        method:'POST',
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            full_name:"Testing Testing",
            email:"testingTestingTesing@mail.com",
            group_work:"วิจัยและวัฒนะธรรม",
            service_type:`${service.toUpperCase()}_Service`,
            subject:typeP,
            status:"request",
            date:`${parseInt(new Date().getHours())<10?'0'+(new Date().getHours()):new Date().getHours()}:${parseInt(new Date().getMinutes())<10?'0'+new Date().getMinutes():new Date().getMinutes()}:${parseInt(new Date().getSeconds())<10?'0'+new Date().getSeconds():new Date().getSeconds()}`,
            assign:'Not_assign',
            useT:typeU.value,
            sn:'20a20345',
            brand:brand.value,
            typeM:typeM.value,
            problems:problems.value,
            other:others.value,
            massage:massage.value,
            

        })
        
        
    })
    if(res.status==201){
        console.log('post event successful')
        isSummary.value=undefined
        isSubmitt.value=true
        setTimeout(goMain,5000)
    }else{
        console.log('error somthing can not post ')
    }
    
    
   
}

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
                        <input v-model="typeU" id="Self" type="radio" name="hardware_of" value="sf" class="m-auto mr-3">
                        <label for="Self" class="m-auto">
                            NoteBook / PC :ของส่วนตัวโปรดระบุ ยี้ห้อ / รุ่น
                        </label>
                        
                    </div>
                    
                </div>  
                
                <div v-if="typeU=='sf'" class=" m-2">
                        <input v-model="brand" id="Self" type="text" placeholder="ระบุยี้ห้อของคุณที่นี้." name="input_type"  class="resize-none  m-auto w-[300px] mr-3 bg-gray-300 p-1.5 rounded-lg focus:outline-0">
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
                        <img src="../../../assets/machine/laptop.png" alt="NoteBook" class="w-[80px] mx-auto">
                        <h3 class="w-fit mx-auto">
                            NoteBook
                        </h3>
                    </button>

                    <!-- PC -->
                    <button @click="typeM='PC'" name="problem" :style="[typeM=='PC'?'background-color:#1E88E5;color:#E3F2FD':'']" class="w-[150px] mx-auto p-2 bg-gray-200 rounded-xl hover:bg-gray-300">
                        <img src="../../../assets/machine/pc.png" alt="NoteBook" class="w-[80px] mx-auto">
                        <h3 class="w-fit mx-auto ">
                            PC
                        </h3>
                    </button>
                    
                    <!-- Smart Phone -->
                    <button @click="typeM='Smart_Phone'" name="problem" :style="[typeM=='Smart_Phone'?'background-color:#1E88E5;color:#E3F2FD':'']" class="w-[150px] mx-auto p-2 bg-gray-200 rounded-xl hover:bg-gray-300">
                        <img src="../../../assets/machine/phone.png" alt="NoteBook" class="w-[80px] mx-auto">
                        <h3 class="w-fit mx-auto text-[14px]">
                            Smart Phone
                        </h3>
                    </button>

                    <!-- Tablet -->
                    <button @click="typeM='Tablet'" name="problem" :style="[typeM=='Tablet'?'background-color:#1E88E5;color:#E3F2FD':'']" class="w-[150px] mx-auto p-2 bg-gray-200 rounded-xl hover:bg-gray-300">
                        <img src="../../../assets/machine/tablet.png" alt="NoteBook" class="w-[80px] mx-auto">
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
                    <h3 v-if="typeP=='media'">
                        1. เลือก หัวข้อ <span class="text-rose-500">Media</span> ที่ต้องการให้ช่วยเหลือ
                    </h3>
                    <h3 v-if="typeP=='news'">
                        1. เลือก หัวข้อ <span class="text-rose-500">News</span> ที่ต้องการให้ช่วยเหลือ
                    </h3>                    
                </div>

                <div  class="grid grid-cols-6 gap-y-2 gap-x-2 mt-4 text-[15px] font-medium">
                    <!-- problems -->
                    <button  v-for="(value,index) in sampleData" :key="index" @click="addP(value.name)" draggable="false" :style="[value.selection==true?'background-color:#1E88E5;color:#E3F2FD':'']" class="w-[150px] mx-auto p-2 hover:bg-gray-300 bg-gray-200 rounded-xl">
                        <img src="../../../assets/vue.svg" alt="NoteBook" class="w-[80px] mx-auto">
                        <h3 class="w-fit mx-auto">
                            {{value.name}}
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
                            <span v-if="service=='it'">ระบุรายละเอียดของปัญหาที่พบ (ถ้ามี)</span>
                            <span v-if="service=='pr'">ระบุรายละเอียดเพิ่มเติม (ถ้ามี)</span> 
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
                <button @click="goBack" class="w-[130px] mx-3 p-2 font-semibold bg-gray-400 text-white rounded-xl">
                    <h4>
                        ย้อนกลับ
                    </h4>
                </button>
                <button @click="summaryInfo()" class="w-[130px] mx-3 p-2 font-semibold bg-rose-400 text-white rounded-xl">
                    <a id="goSummary">
                        ถัดไป
                    </a>
                </button>
            </div>

        </div>



        <!-- for summary -->
        <div v-if="isSummary==true" class="w-[1000px] mx-auto">
            <div id="summaryInfo" class=" w-fit mx-auto text-[25px] font-semibold">
                <h3>
                    สรุปข้อมูล
                </h3>
            </div>

            <!-- first -->
            <div v-if="typeP=='hardware'||typeP=='software'||typeP=='internet'" class="w-full h-fit mt-10  text-[20px] font-semibold">
                <!-- <h3 class="w-fit mx-auto mr-2">
                   1. <span class="text-rose-500">ประเภท</span> ของ Hardware : {{ typeU=='or'?'เครื่องขององค์กร': 'เครื่องของ user'}}
                </h3> -->
                
                <table class=" w-fit h-fit   mt-10  text-[20px] font-semibold ">
                    <tbody >
                        <!-- <tr >
                            <td class="text-right w-[130px]">
                                ผู้ใช้ :
                            </td>
                            <td class="truncate w-[]">
                                {{ event.full_name }}
                                testing
                            </td>
                        </tr> -->
                        <!-- <tr>
                            <td class="text-right w-[130px]" >
                                Service : 
                            </td>
                            <td :style="[changeColorBy(event.service_type)]">
                                {{ service }}
                            </td>
                        </tr> -->
                        <tr>
                            <td class="text-right">
                                1. <span class="text-rose-500">ประเภท</span> ของ Hardware : 
                            </td>
                            <td>
                                {{typeU=='or'?'เป็นขององค์กร':'เป็นของส่วนตัว'}}
                            </td>
                        </tr>
                        <tr >
                            <td class="text-right">
                                ยี่ห้อ : 
                            </td>
                            <td>
                                {{brand}}
                            </td>
                        </tr>
                        <tr >
                            <td class="text-right">
                                S/N :
                            </td>
                            <td>
                                <!-- {{sn}} -->
                                123128234
                            </td>
                        </tr>
                   </tbody>
                </table>
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
                            {{typeM}}
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

                    <h3 v-if="typeP=='media'">
                        1. <span class="text-rose-500"> สรุป </span> ปัญหาเกี่ยวกับ Media ที่คุณต้องการความช่วยเหลือ
                    </h3> 

                    <h3 v-if="typeP=='news'">
                        1. <span class="text-rose-500"> สรุป </span> ปัญหาเกี่ยวกับ News ที่คุณต้องการความช่วยเหลือ
                    </h3> 
                    
                    
                </div>

                
                <div class="grid grid-cols-6 gap-y-2 gap-x-2 mt-4 text-[15px] font-medium">
                    
                    <div v-for="(data,index) in problems" :key="index"  class="w-[150px] mx-auto p-2 bg-gray-200 rounded-xl ">
                        <img src="../../../assets/vue.svg" alt="NoteBook" class="w-[80px] mx-auto">
                        <h3 class="w-fit mx-auto">
                           {{data}}
                        </h3>
                    </div >
                    <div v-show="isOther==true" class="w-[150px] mx-auto p-2 bg-gray-200 rounded-xl ">
                        <img src="../../../assets/vue.svg" alt="NoteBook" class="w-[80px] mx-auto">
                        <h3 class="w-fit mx-auto">
                           Other
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
                
                <div v-show="massage.length != 0"  class="mx-4">
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
                <button @click="isSummary=false ,myRouter.go(-1)" class="w-[130px] mx-3 p-2 font-semibold bg-gray-400 text-white rounded-xl">
                    <h4>
                        ย้อนกลับ
                    </h4>
                </button>
                <button @click="submitt" class="w-[130px] mx-3 p-2 font-semibold bg-rose-400 text-white rounded-xl">
                    <h4>
                        ขอรับบริการ
                    </h4>
                </button>
            </div>

        </div>

        <!-- submit -->
        <div v-if="isSubmitt==true" class="w-[1000px] mx-auto">
            <div class="w-fit mx-auto">
                <img src="../../../assets/check.png" alt="check_icon" class="w-[130px] mt-[60px]">
            </div>
            <div class="w-fit mx-auto mt-4 font-semibold ">
                <h3 class="text-[50px]">
                    เราได้รับข้อมูลของคุณเรียบร้อยแล้ว
                </h3>
                <h3 class="text-[20px] text-center">
                    เจ้าหน้าที่จะติดต่อร็วๆนี้
                </h3>
            </div>

        </div>

    </div>
</div>   
</template>
<style scoped>
</style>