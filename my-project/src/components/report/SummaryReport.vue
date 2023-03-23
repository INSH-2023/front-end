<script setup>
</script>
<template>
    <div v-if="isSummary==true" class="w-[1000px] mx-auto">
            <div id="summaryInfo" class=" w-fit mx-auto text-[25px] font-semibold">
                <h3>
                    สรุปข้อมูล
                </h3>
            </div>

            <!-- first -->
            <div v-if="typeP=='hardware'||typeP=='software'||typeP=='internet'" class="w-full h-fit mt-10  text-[20px] font-semibold">
                
                <table class=" w-fit h-fit   mt-10  text-[20px] font-semibold ">
                    <tbody >
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
                                {{typeOfMachine.brand_or}}
                            </td>
                        </tr>
                        <tr >
                            <td class="text-right">
                                S/N :
                            </td>
                            <td>
                                <!-- {{sn}} -->
                                <!-- 123128234 -->
                                {{ typeOfMachine.sn }}
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
</template>
<style scoped>
</style>