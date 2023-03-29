<script setup>
import{ref,computed,onBeforeMount} from 'vue'
import {useRouter,useRoute} from 'vue-router'
import toBackEnd from '../../../JS/fetchToBack'
import BaseProgress from '../../../components/report/BaseProgress.vue';
import TypeOfUse from '../../../components/report/TypeOfUse.vue';
import TypeOfMachine from '../../../components/report/TypeOfMachine.vue';
import Problem from '../../../components/report/Problem.vue';
import OtherAndMessage from '../../../components/report/OtherAndMessage.vue';
import validate from '../../../JS/validate';
import SummaryReport from '../../../components/report/SummaryReport.vue';
const myRouter = useRouter()
const goBack=()=> myRouter.go(-1)
const goMain=()=>myRouter.push({name:'services'})
// const requestLink ="http://localhost:3000/events"
// const problemsLink = "http://localhost:3000/problems"
const requestLink =`${import.meta.env.VITE_BACK_END_HOST}/requests`
const problemsLink = `${import.meta.env.VITE_BACK_END_HOST}/problems`
const itemLink =`${import.meta.env.VITE_BACK_END_HOST}/items`
const userLink =`${import.meta.env.VITE_BACK_END_HOST}/users`
const {params} = useRoute()
const typeP =params.id
const service=params.service

const progress_status=undefined

// get date time
const Timestamp=()=>{
    let dateTime =new Date()
    const is_lessthen_ten =(v)=>v<10?'0'+v:v
    let date=`${dateTime.getFullYear()}-${is_lessthen_ten(dateTime .getMonth()) }-${is_lessthen_ten(dateTime .getDate()) }`
    let time=`${is_lessthen_ten(dateTime.getHours())}:${is_lessthen_ten(dateTime.getMinutes())}:${is_lessthen_ten(dateTime.getSeconds())}`
    return `${date} ${time}`
}

const data_ch=computed(()=>{
    
    if(typeP=='printer'||typeP=='website'||typeP=='meeting'||typeP=='application'){
        problems.value=[]
        typeOfUse.value.type='or'
    }else
    if(typeP=='other'){
        problems.value=[]
        typeOfUse.value.type='or'
        problems.value.push('other')
    }

    return{
        request_first_name:user.value.first_name,
        request_last_name:user.value.last_name,
        request_email:user.value.email,
        request_group:user.value.group,
        request_service_type:`${service.toUpperCase()}_Service`,
        request_subject:typeP,
        request_status:"request",
        // request_req_date:Timestamp(),
        request_assign:'Not_assign',
        request_use_type:typeOfUse.value.type,
        request_sn:typeOfMachine.value.sn,
        request_brand:typeOfUse.value.type=='or'?typeOfMachine.value.brand_or:typeOfUse.value.brand_sf,
        request_type_matchine:typeOfMachine.value.typeM,
        request_other:otherAndMsg.value.msg_other,
        request_problems:problem_to_text.value,
        request_message:otherAndMsg.value.msg,
    }
   
})

// first section
const typeOfUse=ref({
    type:'',
    brand_sf:''
})

// second section
const typeOfMachine=ref({
    typeM:'',
    brand_or:'',
    sn:''
})

// third section
const problems =ref([])

// fourth section
const otherAndMsg=ref({
    msg:'',
    msg_other:''
})


// check status
const is_other =ref(false)

const user=ref({
    first_name:'',
    last_name:'',
    email:'',
    group:'',
    emp_code:''
})

// problem list
const problemList =ref([])

const validateReport=(stage)=>{

// console.log(service)
// console.log(stage)
    if(typeP=='hardware'||typeP=='software'||typeP=='internet'){
        if(stage==0 ){
            // status something
            if(validate.vSection_I(typeOfUse.value)){
                computeStageReport(true)
            }else{
                // alert error something
            }


        }else
        if(stage==1){
            // status something
            if(validate.vSection_II(typeOfMachine.value,typeOfUse.value,user.value)){
                computeStageReport(true)   
            }else{
                // alert error something
            }
            

        }else
        if(stage==2){
            // status something
            if(validate.vSection_III(problems.value,is_other.value)){
                computeStageReport(true)
            }else{
                // alert error something
            }
            
        }else
        if(stage==3){
            // status something
            if(validate.vSection_IIII(otherAndMsg.value,is_other.value)){
                computeStageReport(true)
                console.log(data_ch.value)
            }else{
                
            }
        }else
        if(stage==4){
            console.log(data_ch.value)
            submitt()
            // console.log(`
            // request_first_name:${user.value.first_name},
            // request_last_name:${user.value.last_name},
            // request_email:${user.value.email},
            // request_group:${user.value.group},
            // request_service_type:${service.toUpperCase()}_Service,
            // request_subject:${typeP},
            // request_status:"request",
            // request_req_date:${Timestamp()},
            // request_assign:${'Not_assign'},
            // request_use_type:${typeOfUse.value.type},
            // request_sn:${typeOfMachine.value.sn},
            // request_brand:${typeOfUse.value.type=='or'?typeOfMachine.value.brand_or:typeOfUse.value.brand_sf},
            // request_type_matchine:${typeOfMachine.value.typeM},
            // request_other:${otherAndMsg.value.msg_other},
            // request_problems:${problem_to_text.value},
            // request_message:${otherAndMsg.value.msg},
            // `)
        }
        // console.log(stage)

    }else
    if(typeP=='printer'||typeP=='website'||typeP=='meeting'||typeP=='application'){
        if(stage==0){
            if(validate.vSection_III(problems.value,is_other.value)){
                computeStageReport(true)
            }else{
                // alert error something
            }
        }else
        if(stage==1){

            if(validate.vSection_IIII(otherAndMsg.value,is_other.value)){
                computeStageReport(true)
                console.log(data_ch.value)
            }else{
                // alert error something
            }
        }else
        if(stage==2){
            console.log(data_ch.value)
            submitt()
        }

    }else
    if(typeP=='other'){
        if(stage==0){
            if(validate.vSection_IIII(otherAndMsg.value,is_other.value)){
                computeStageReport(true)
                console.log(data_ch.value)
            }else{
                // alert error something
            }    
        }
        else 
        if(stage==1){
            console.log(data_ch.value)
            submitt()
            is
        }
    }
    // if(typeOfUse.value.type){

    // }
    // if(service=='it'){
    //     if(typeU.value == ''&&typeP =='hardware'&&typeP =='software'&&typeP =='internet'){
    //         console.log('please select ur type of use')
    //     }else
    //     if(typeU.value=='sf'&&item_sf.value.name.length==0){
    //         console.log('please input ur device')
    //     }else 
    //     if(typeM.value == ''&&typeP =='hardware'&&typeP =='software'&&typeP =='internet'){
    //         console.log('please select ur type of matchine')
    //     }else
    //     if(problems.value.length==0 && isOther.value == false){
    //         console.log('please select ur problems')
    //     }else
    //     if(isOther.value==true&&others.value.length==0){
    //         console.log('please input ur orther')
    //     }
    //     else{
    //         console.log('status good')
    //         // let nextB =document.getElementById('goSummary')
    //         // nextB.setAttribute('href','#summaryInfo')
    //         // nextB.click()
    //         // isSummary.value=true
    //     }
    // }else
    // if(service=='pr'){
    //     if(problems.value.length==0){
    //         console.log('please select ur problems')
    //     }else
    //     if(isOther.value==true&&others.value==''){
    //         console.log('please input ur orther')
    //     }else{
    //         console.log('status good')
    //         // let nextB =document.getElementById('goSummary')
    //         // nextB.setAttribute('href','#summaryInfo')
    //         // nextB.click()
    //         // isSummary.value=true
    //     }
    // }
}









// first
const typeU = ref('')
// const brand =ref('')
// second
const typeM =ref('')
// third
// const problems =ref([])
const problem_to_text=computed(()=>{
    let problemT=problems.value.reduce((value,c)=>value+','+c,"")
    console.log(problemT)
    problemT=problemT.substring(1)
    return problemT
})
// other
const others=ref('')
const massage=ref('')






// isSummary
// const isSummary=ref(false)

const getUser= async(user_id)=>{

    const [status,data]= await toBackEnd.getData('report_user',`${userLink}/${user_id}`)
    if(status==200){
        let [{user_first_name,user_last_name,user_group,user_email}]=data
        user.value.first_name=user_first_name
        user.value.last_name=user_last_name
        user.value.group=user_group
        user.value.email=user_email
        console.log(data)
    }else{
        console.log(data)
    }
}
// // get problems
// const getProblems=async()=>{
//     let[status,data]=await toBackEnd.getData('report',problemsLink,typeP)
//     if(status==200){
//         problemList.value=data
//         // console.log(data)        
//         addProperty(problemList.value)
//     }else{
//         console.log(data)
//     }
// }

// get item_or detail
// const getItem=async()=>{
//     // let userId =JSON.parse(localStorage.getItem('user_info')).userId
//     // console.log(userId)
//     // let [status,data]=await toBackEnd.getDataBy('report',userLink,user)
//     let [status,data]=await toBackEnd.getData('report',itemLink)
//     if(status==200){
//         let [{item_name,item_number,item_type,user_first_name,user_last_name,user_email,user_group}]= await data
//         console.log('data :',data)
//         user.value.first_name= user_first_name
//         user.value.last_name= user_last_name
//         user.value.email= user_email
//         user.value.group= user_group

//         item_or.value.name= item_name
//         item_or.value.type= item_type
//         item_or.value.number= item_number
//         typeM.value = item_or.value.type
//         // if(data.length!=0){
//         //     fname.value=data.user_first_name
//         //     lname.value=data.user_last_name
//         //     email.value=data.user_email
//         //     sn.value=data.item_number
//         //     brand.value=data.item_name
//         // }
//         // let {user_first_name,user_last_name,user_sn,user_email,user_group}=data
//         // email.value=data.user_email
//         // fname.value=user_first_name
//         // lname.value = user_last_name
//         // group.value=user_group
//         // sn.value=user_sn
//         console.log(user.value)
//         console.log(item_or.value)
//     }else{
//         console.log(data)
//     }
// }




onBeforeMount(()=>{
    getUser(validate.getUserDataFromLocal('user_emp_code'))
    // getProblems()
    // getItem()
})

// compute stage report
const countNumber=ref(0)
//return value that is the number of all subject stages
const full_stage=computed(()=>{
    let all_stage =0
    if(typeP=='hardware'||typeP=='software'||typeP=='internet') all_stage=5 ;
    else if(typeP=='printer'||typeP=='website'||typeP=='meeting'||typeP=='application') all_stage=3 ;
    else if(typeP=='other') all_stage=2;
      

    return all_stage
})

// คำนวณ stage สำหรับกดปุ่มถัดไป
const computeStageReport=(status)=>{
    
    if(countNumber.value > full_stage.value-1){
        countNumber.value=full_stage.value-1
    }else
    if(countNumber.value < 0){
        countNumber.value=0
    }
   
    if(status==true&&countNumber.value != full_stage.value-1){
        //next
        countNumber.value++
    }else
    if(status==false&&countNumber.value !=0){
        //back
        countNumber.value--
    }
}





// send form
const isSubmitt=ref(false)
const submitt = async()=>{
    console.log(data_ch.value)
    let [status,data]=await toBackEnd.postData('report',requestLink,data_ch.value)
    if(status==200){
        // isSummary.value=undefined
        isSubmitt.value=true
        setTimeout(goMain,5000)
        console.log(data)
    }else{
        console.log(data)
    }
}

// get data from component
const getDataFromComponent =(value)=>{
    let data =value
    console.log(`${data.name} => ${data}`)
    // ttesting.value=value
    
    if(data.name=='use_type'){
        typeOfUse.value.type = data.typeU
        typeOfUse.value.brand_sf = data.brand_sf

        console.log('type of use : ', typeOfUse.value)
    }else
    if(data.name=='type_of_machine'){
        // const {item,user}=data
        // if(user.value.emp_code==data.user_emp_code){
            typeOfMachine.value.typeM = data.item.type
            typeOfMachine.value.brand_or = data.item.brand_or
            typeOfMachine.value.sn = data.item.sn            
        // }
        // else{
        //     // status something
        //     console.log('cannot assign report item')
        // }



        console.log('type of machine : ', typeOfMachine.value)


    }else
    if(data.name=='problems'){
        problems.value = data.problems
        is_other.value = data.other_status

        console.log('problems : ',data.problems)
        console.log('other status : ',is_other.value)
    }else
    if(data.name=='msg'){
        otherAndMsg.value.msg = data.msg
        otherAndMsg.value.msg_other = data.other_msg

        console.log('msg and other : ', otherAndMsg.value)
    }
}


</script>
<template>
<div class="overflow-auto">
    <div class="pt-3">
       
        <!-- for write report -->
        <div v-if="isSubmitt==false" class="w-[1000px] mx-auto">
            

            <!-- header -->
            <div class="w-fit h-fit mx-auto my-3 text-[36px]">
                <h3 class="font-semibold">
                    รายงานปัญหาเกี่ยวกับ <span class="font-light">{{ typeP }}</span>
                </h3>
            </div>

            <div class="w-[400px] h-fit mx-auto my-3">
                <BaseProgress :stage="countNumber" :full_stage="full_stage"/>
            </div>
            <!-- <button @click="countNumber++">add</button>
            <button @click="countNumber--">remove</button> -->

            <div v-show="(countNumber==0 && (typeP=='hardware'||typeP=='software'||typeP=='internet'))" 
                class="w-[400px] h-fit mt-10 mx-auto ">
                <TypeOfUse @get-type-of-use="getDataFromComponent" />
            </div>

            <!-- first -->
            <!-- <div v-if="typeP=='hardware'||typeP=='software'||typeP=='internet'" class="w-[400px] h-fit mt-5 mx-auto text-center">
                <div class="text-[25px] font-normal">
                    <h3 >
                        1. เลือก <span class="text-rose-500">ประเภท</span> อุปกรณ์ ของคุณ
                    </h3>                    
                </div>

                
                <div class="h-[80px] mt-3 text-[20px] flex justify-between flex-col  font-medium">
                    <div class="flex ml-14 " >
                        <input v-model="typeU" id="Organization" type="radio" name="hardware_of" value="or" class="w-[15px] "> 
                        <label for="Organization" class="ml-4">
                            ของสำนักงาน
                        </label>                       
                    </div>
                    <div class="flex ml-14 ">
                        <input v-model="typeU" id="Self" type="radio" name="hardware_of" value="sf" class="w-[15px]">
                        <label for="Self" class="ml-4">
                            ของส่วนตัวโปรดระบุ ยี้ห้อ / รุ่น
                        </label>
                        
                    </div>
                    
                </div>  
                
                <div v-if="typeU=='sf'" class="w-full h-[100px] m-auto mt-3">
                        <textarea v-model="item_sf.name" id="Self" type="text" placeholder="ระบุยี้ห้อของคุณที่นี้." name="input_type"  class="resize-none w-full h-full   p-2  bg-gray-200 text-[20px] font-light  rounded-lg focus:outline-0"></textarea>
                </div>
            </div> -->

            <!-- second type of matchine -->
            <div v-show="(countNumber==1 && (typeP=='hardware'||typeP=='software'||typeP=='internet'))" 
                class="w-[700px] h-fit mx-auto mt-10">
                <TypeOfMachine  @get-type-of-m="getDataFromComponent" :type-of-use-o-r="typeOfUse.type=='or'?true:false" />
                <!-- <div class="text-[20px] font-semibold">
                    <h3 >
                        2. เลือก <span class="text-rose-500">ชนิด</span> อุปกรณ์ของคุณ
                    </h3>                    
                </div>

                
                <div class="grid grid-cols-6 gap-y-2 gap-x-2 mt-4 text-[15px] font-medium">
                    notebook
                    <button @click="typeM='NoteBook'" name="problem" :style="[typeM=='NoteBook'?'background-color:#1E88E5;color:#E3F2FD':'']" class="w-[150px] mx-auto p-2 bg-gray-200 rounded-xl hover:bg-gray-300">
                        <img src="../../../assets/machine/laptop.png" alt="NoteBook" class="w-[80px] mx-auto">
                        <h3 class="w-fit mx-auto">
                            NoteBook
                        </h3>
                    </button>

                    PC
                    <button @click="typeM='PC'" name="problem" :style="[typeM=='PC'?'background-color:#1E88E5;color:#E3F2FD':'']" class="w-[150px] mx-auto p-2 bg-gray-200 rounded-xl hover:bg-gray-300">
                        <img src="../../../assets/machine/pc.png" alt="NoteBook" class="w-[80px] mx-auto">
                        <h3 class="w-fit mx-auto ">
                            PC
                        </h3>
                    </button>
                    
                    Smart Phone
                    <button @click="typeM='Smart_Phone'" name="problem" :style="[typeM=='Smart_Phone'?'background-color:#1E88E5;color:#E3F2FD':'']" class="w-[150px] mx-auto p-2 bg-gray-200 rounded-xl hover:bg-gray-300">
                        <img src="../../../assets/machine/phone.png" alt="NoteBook" class="w-[80px] mx-auto">
                        <h3 class="w-fit mx-auto text-[14px]">
                            Smart Phone
                        </h3>
                    </button>

                    Tablet
                    <button @click="typeM='Tablet'" name="problem" :style="[typeM=='Tablet'?'background-color:#1E88E5;color:#E3F2FD':'']" class="w-[150px] mx-auto p-2 bg-gray-200 rounded-xl hover:bg-gray-300">
                        <img src="../../../assets/machine/tablet.png" alt="NoteBook" class="w-[80px] mx-auto">
                        <h3 class="w-fit mx-auto">
                            Tablet
                        </h3>
                    </button>
                </div> -->
               

            </div>

            <!-- third problem -->
            <div v-show="((countNumber==2 && (typeP=='hardware'||typeP=='software'||typeP=='internet'))
                        || (countNumber==0 && (typeP=='printer'||typeP=='website'||typeP=='meeting'||typeP=='application'||typeP=='media'||typeP=='news')))
                        && typeP != 'other'" 
                class="w-[700px] h-fit mx-auto mt-10 "
            >
                

                <!-- <div v-show="(countNumber==2 && (typeP=='hardware'||typeP=='software'||typeP=='internet')) 
                            || (countNumber==0 && (typeP=='printer'||typeP=='website'||typeP=='meeting'||typeP=='application'||typeP=='media'||typeP=='news'))" 
                    class="grid grid-cols-6 gap-y-2 gap-x-2 mt-4 text-[15px] font-medium"> -->
                    <Problem @get-problem-selected="getDataFromComponent" :typeP="typeP" />
                    <!-- problems
                    <button  v-for="(value,index) in problemList" :key="index" @click="addP(value.problem_problem)" draggable="false" :style="[value.selection==true?'background-color:#1E88E5;color:#E3F2FD':'']" class="w-[150px] mx-auto p-2 hover:bg-gray-300 bg-gray-200 rounded-xl">
                        <img src="../../../assets/vue.svg" alt="NoteBook" class="w-[80px] mx-auto">
                        <h3 class="w-fit mx-auto">
                            {{value.problem_problem}}
                        </h3>
                    </button>


                    other
                    <button  @click="otherF" class="w-[150px] mx-auto p-2 bg-gray-200 rounded-xl hover:bg-gray-300">
                        <img src="../../../assets/report_icon/other.png" alt="other" class="w-[80px] mx-auto">
                        <h3 class="w-fit mx-auto">
                            อื่นๆโปรดระบุ
                        </h3>
                    </button>  -->
                <!-- </div> -->
            </div>

                <!-- fourth -->
                <!-- <div v-if="typeP !='other'"  class="flex flex-nowrap mt-10 mx-auto"> -->
                <OtherAndMessage 
                    v-show="(countNumber==3 && (typeP=='hardware'||typeP=='software'||typeP=='internet'))
                            || (countNumber==1 && (typeP=='printer'||typeP=='website'||typeP=='meeting'||typeP=='application'||typeP=='media'||typeP=='news'))
                            || (countNumber==0 && (typeP=='other'))" 
                    @get-message="getDataFromComponent" 
                    :is-type-p_other="typeP == 'other'?true:false" 
                    :service_it="service=='it'?true:false" 
                    :is-other="is_other" 
                />
                    <!-- <div v-show="isOther==true" class="mx-4">
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
                    </div> -->
                <!-- </div> -->

                <!-- other -->
                <!-- <div v-else-if="typeP=='other'" class="mt-10 mx-auto w-fit mx-auto"> -->
                    <!-- <div class="mx-4">
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
                    </div> -->
                <!-- </div> -->

            <!-- for summary -->
            <div v-show="(countNumber==4 && (typeP=='hardware'||typeP=='software'||typeP=='internet'))
                    || (countNumber==2 && (typeP=='printer'||typeP=='website'||typeP=='meeting'||typeP=='application'||typeP=='media'||typeP=='news'))
                    || (countNumber==1 && (typeP=='other'))" class="w-[1000px] mx-auto">
                <SummaryReport :data="data_ch"  />
            </div>    


            

            <!-- button -->
            <div class="w-fit mx-auto mt-10">
                <button @click="countNumber==0? myRouter.go(-1):computeStageReport(false)" class="w-[130px] mx-3 p-2 font-semibold bg-gray-400 text-white rounded-xl">
                    <h4>
                        ย้อนกลับ
                    </h4>
                </button>
                <button @click="validateReport(countNumber)" class="w-[130px] mx-3 p-2 font-semibold bg-rose-400 text-white rounded-xl">
                    <h4 v-show="(countNumber<4 && (typeP=='hardware'||typeP=='software'||typeP=='internet'))
                        ||(countNumber<2 && (typeP=='printer'||typeP=='website'||typeP=='meeting'||typeP=='application'||typeP=='media'||typeP=='news')) 
                        || (countNumber<1 && (typeP=='other'))"
                    >
                        ถัดไป
                    </h4>
                    <h4 v-show="(countNumber==4 && (typeP=='hardware'||typeP=='software'||typeP=='internet'))
                        ||(countNumber==2 && (typeP=='printer'||typeP=='website'||typeP=='meeting'||typeP=='application'||typeP=='media'||typeP=='news'))
                        || (countNumber==1 && (typeP=='other'))" 
                    >
                        ส่งคำร้อง
                    </h4>
                </button>
            </div>

        </div>

        <!-- submitt report -->
        <div v-else-if="isSubmitt==true" class="w-[1000px] mx-auto">
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
                <button >
                    กลับไปหน้าหลัก
                </button>
            </div>

        </div>
        

        

    </div>
</div>   
</template>
<style scoped>
</style>