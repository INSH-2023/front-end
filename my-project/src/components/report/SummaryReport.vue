<script setup>
import {ref,onBeforeUpdate} from 'vue'
const props=defineProps({
    data:{
        type:Object,
        required:true
    }
})

// const typeP=ref(props.subject)
// const data =ref(props.data)
const subject =ref('')
const user = ref({
    first_name:'',
    last_name:'',
    email:'',
    group:'',
    emp_code:''
})

const item =ref({
    brand:'',
    type:'',
    sn:''
})

const useAndOther=ref({
    type:'',
    msg:'',
    msg_other:'',
    service_type:''

})

const problems=ref([])

onBeforeUpdate(()=>{
    subject.value = props.data.request_subject

    user.value.first_name = props.data.request_first_name
    user.value.last_name = props.data.request_last_name
    user.value.email = props.data.request_email
    user.value.group = props.data.request_group
    
    item.value.brand = props.data.request_brand
    item.value.type = props.data.request_type_matchine
    item.value.sn = props.data.request_sn

    useAndOther.value.type = props.data.request_use_type
    useAndOther.value.msg = props.data.request_message
    useAndOther.value.msg_other = props.data.request_other
    useAndOther.value.service_type = props.data.request_service_type

    problems.value= textToArray(props.data.request_problems)
})

const textToArray=(input)=>{
    let arr=input.split(",")
    return arr
}
</script>
<template>

            <div id="summaryInfo" class=" w-fit mx-auto text-[25px] font-semibold">
                <h3>
                    สรุปข้อมูล
                </h3>
            </div>

            <!-- first -->
            <div v-if="subject=='hardware'||subject=='software'||subject=='internet'" class="w-full h-fit   text-[15px] font-semibold md:text-[20px]">
                
                <table class=" w-fit h-fit   mt-6   font-semibold ">
                    <tbody >
                        <tr>
                            <td class="text-right text-[13px] md:text-[20px]" >
                                1. <span class="text-rose-500">ประเภท</span> ของ Hardware : 
                            </td>
                            <td>
                                {{useAndOther.type=='or'?'เป็นขององค์กร':'เป็นของส่วนตัว'}}
                            </td>
                        </tr>
                        <tr >
                            <td class="text-right text-[13px] md:text-[20px]">
                                ยี่ห้อ : 
                            </td>
                            <td>
                                {{item.brand}}
                            </td>
                        </tr>
                        <tr>
                            <td class="text-right text-[13px] md:text-[20px]">
                                ประเภทของอุปกรณ์ :
                            </td>
                            <td>
                                {{ item.type }}
                            </td>
                        </tr>
                        <tr v-show="item.sn.length != 0">
                            <td class="text-right text-[13px] md:text-[20px]">
                                S/N :
                            </td>
                            <td>
                                <!-- {{sn}} -->
                                <!-- 123128234 -->
                                {{item.sn }}
                            </td>
                        </tr>
                   </tbody>
                </table>
            </div>

            <!-- second  -->
            <div v-if="subject=='hardware'||subject=='software'||subject=='internet'" class="mt-4">
                <div class=" font-semibold text-[13px] md:text-[20px]">
                    <h3 >
                        2. <span class="text-rose-500">ชนิด</span> อุปกรณ์ของคุณ
                    </h3>
                                          
                </div>

                
                <div class="grid grid-cols-3 gap-y-2 gap-x-2 mt-4 text-[20px] font-medium
                    md:grid-cols-4
                ">
                    <!-- notebook -->
                    <div class="w-[80px] h-fit mx-auto p-2 bg-gray-200 rounded-xl md:w-full">
                        <img src="../../assets/vue.svg" alt="NoteBook" class="w-[30px] h-[30px] mx-auto md:w-[80px] md:h-[80px]">
                        <h3 class="w-fit mx-auto ">
                            {{item.type}}
                        </h3>
                    </div >
                </div>
            </div>

            <!-- third -->
             <div v-if="subject!='other'"  class="mt-4">
                <div class="text-[13px]  font-semibold md:text-[20px]">
                    <h3 v-if="subject=='hardware'||subject=='software'||subject=='internet'">
                        3. <span class="text-rose-500"> สรุป </span> อาการของ Hardware ของคุณ
                    </h3>   
                    
                    <h3 v-if="subject=='printer'">
                        1. <span class="text-rose-500"> สรุป </span> ปัญหา Printer ที่คุณต้องการความช่วยเหลือ
                    </h3> 

                    <h3 v-if="subject=='website'">
                        1. <span class="text-rose-500"> สรุป </span> ปัญหา Website ที่คุณต้องการความช่วยเหลือ
                    </h3> 

                    <h3 v-if="subject=='meeting'">
                        1. <span class="text-rose-500"> สรุป </span> หัวข้อ Meeting ที่คุณต้องการความช่วยเหลือ
                    </h3> 

                    <h3 v-if="subject=='application'">
                        1. <span class="text-rose-500"> สรุป </span> ปัญหา Application ที่คุณต้องการความช่วยเหลือ
                    </h3> 

                    <h3 v-if="subject=='media'">
                        1. <span class="text-rose-500"> สรุป </span> ปัญหาเกี่ยวกับ Media ที่คุณต้องการความช่วยเหลือ
                    </h3> 

                    <h3 v-if="subject=='news'">
                        1. <span class="text-rose-500"> สรุป </span> ปัญหาเกี่ยวกับ News ที่คุณต้องการความช่วยเหลือ
                    </h3> 
                    
                    
                </div>

                
                <div class="grid grid-cols-3 gap-y-2 gap-x-2 mt-4 text-[15px] font-medium
                    md:grid-cols-4 
                ">
                    
                    <div v-for="(data,index) in problems" :key="index"  class="w-[80px] h-fit mx-auto p-2 bg-gray-200 rounded-xl md:w-full">
                        <img src="../../assets/vue.svg" alt="NoteBook" class="w-[30px] h-[30px] mx-auto md:w-[80px] md:h-[80px]">
                        <h3 class="w-fit mx-auto text-[10px] md:text-[20px]">
                           {{data}}
                        </h3>
                    </div >
                    <!-- <div v-show="isOther==true" class="w-[150px] mx-auto p-2 bg-gray-200 rounded-xl ">
                        <img src="../../../assets/vue.svg" alt="NoteBook" class="w-[80px] mx-auto">
                        <h3 class="w-fit mx-auto">
                           Other
                        </h3>
                    </div > -->

                </div>
            </div>


            <!-- fourth -->
            <div  v-if="subject!='other'" class="w-full  flex flex-col  mt-6 ">
                <div v-show="useAndOther.msg_other.length !=0" class="">
                    <label for="other_1" class="ml-3 text-[13px] font-semibold inline-b md:text-[20px]">
                        กรณีเลือก<span class="text-rose-500 pl-2">อื่นๆโปรดระบุ</span>
                    </label>
                    <br class="md:hidden">
                    <span class="text-[13px] ml-2">(กรณีไม่พบปัญหาข้างต้น)</span>
                    <textarea v-model="useAndOther.msg_other" name="other" id="other_1"  disabled class="w-full h-fit resize-none pt-[10px] block rounded-lg bg-gray-300 font-light text-[14px] p-2 focus:outline-0 md:text-[20px]" ></textarea>
                </div>
                
                <div v-show="useAndOther.msg.length !=0" class=" mt-3">
                    <label for="other_2" class="ml-3 text-[13px] font-semibold md:text-[17px]">
                        ระบุรายละเอียดของปัญหาที่พบ (ถ้ามี)
                    </label>
                    <textarea v-model="useAndOther.msg" name="other" id="other_2"  disabled class="w-full h-fit  resize-none block bg-gray-300 font-light text-[14px] rounded-lg p-2 focus:outline-0 md:text-[20px]"></textarea>
                </div>
                <div>

                </div>
            </div>

            <!-- other -->
            <div v-else-if="subject=='other'" class="w-full flex flex-col flex-nowrap mt-2 mx-auto
                md:6
            ">
                <!-- suject is other -->
                <div class="w-fit mt-3 mx-auto px-3 md:px-0 md:mt-0">

                    <label for="other_1" class="ml-3 text-[17px] font-semibold inline-b">
                        ระบุ รายละเอียด หรือ ความต้องการของคุณ
                    </label>
                    <br class="">
                    <span class="text-[13px] ml-2">(กรณีไม่พบปัญหาข้างต้น)</span>                        

                    <!-- <textarea v-model="useAndOther.msg_other" name="other" id="other_1"  class="block w-full h-[100px] resize-none pt-[10px]  rounded-xl bg-gray-300 p-2 mx-auto focus:outline-0
                        md:w-[600px] md:h-fit
                    " ></textarea> -->

                    <div class="block w-full h-[100px] resize-none pt-[10px]  rounded-xl bg-gray-300 p-2 mx-auto focus:outline-0
                        md:w-[600px] md:h-[100px]
                    ">
                        {{ useAndOther.msg_other }}
                    </div>
                </div>

                <div  class="w-fit  mt-3 mx-auto mt-0 px-3 md:px-0 md:mt-6 md:w-fit">
                    <label for="other_2" class="ml-3 text-[17px] font-semibold inline-b">
                        หมายเหตุเพิ่มเติม (ถ้ามี)
                    </label>
                    
                    <div class="block w-full h-[100px] resize-none pt-[10px]  rounded-xl bg-gray-300 p-2 mx-auto focus:outline-0
                        md:w-[600px] md:h-[100px]
                    ">
                        {{ useAndOther.msg }}
                    </div>
                </div>
            </div>

            <!-- button -->
            <!-- <div class="w-fit mx-auto mt-10">
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
            </div> -->



        <!-- submit -->
        <!-- <div v-if="isSubmitt==true" class="w-[1000px] mx-auto">
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

        </div> -->
</template>
<style scoped>
</style>