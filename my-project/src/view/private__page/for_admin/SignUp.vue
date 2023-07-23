<script setup>
import {ref,computed, onBeforeMount} from 'vue'
import validate from '../../../JS/validate';
import toBackEnd from '../../../JS/fetchToBack'
import BaseHeader from '../../../components/BaseHeader.vue';
import Cookies from '../../../JS/cookies';
import getRefreshToken from './../../../JS/refresh';
import BaseLoading from '../../../components/BaseLoading.vue'
import BaseAlert from '../../../components/BaseAlert.vue';
// const userLink ='http://localhost:3000/users'
const userLink =`${import.meta.env.VITE_BACK_END_HOST}/users`
// const userLink ='http://localhost:5000/api/users'


onBeforeMount(()=>{
    getRefreshToken(validate.getUserDataFromLocal('refreshToken'))
})

const empCode=ref('')
const fName=ref('')
const lName =ref('')
const email = ref('')
const group = ref('')
const position=ref('')
const office =ref('')
const role =ref('')
const passW = ref('')
const cPassW = ref('')
const organization ='@moralcenter.or.th'

const alert_status=ref(undefined)
const alert_message=ref([])
const alert_title=ref('')
// lenght

// const fNameL=30
// const lNameL=30
// const emailL=30
// const passWL=14

let token = ref("")

const lenghtOfInput={
    fNameL:50,
    lNameL:50,
    emailL:32,
    passWL:14,
    empCodeL:10,
    positionL:50
}
// style
const empCodeS=ref(undefined)
const fNameS=ref(undefined)
const lNameS=ref(undefined)
const emailS=ref(undefined)
const groupS =ref(undefined)
const positionS=ref(undefined)
const officeS =ref(undefined)
const roleS =ref(undefined)
const passWS =ref(undefined)
const cPassWS =ref(undefined)

let dataCh =computed(()=>{
    return{
        user_emp_code:empCode.value,
        user_first_name: fName.value,
        user_last_name: lName.value,
        user_email: `${email.value}${organization}`,
        user_role: role.value,
        user_office: office.value,
        user_position: position.value,
        user_password: passW.value,
        user_group: group.value,
        user_status: 'active',
        user_cPassW: cPassW.value
    }
})

// modify email
// const emailM=(event)=>{
//     let emailM =event.target.value
//     email.value = emailM+'@moralcenter.or.th'
// }

// submit
const submittS =ref(false)
const submittform =async()=>{
    alert_status.value=undefined
    let {status:vStatus,msg:vMsg}=validate.vUser(dataCh.value,lenghtOfInput,passW=true)
    console.log('this status from validate ',vStatus)
    console.log(vMsg)
    // let status=undefined
    // goRotate()
    if(vStatus){
        console.log('cannot create new user')
        alert_title.value='Cannot create new user!!'
        
        alert_message.value=vMsg
        alert_status.value=false
    }else{
        submittS.value=true
        token.value = validate.getUserDataFromLocal('token')
        console.log(token.value)
        let [status,data]=await toBackEnd.postData('signUp',userLink,dataCh.value,token.value)
        if(status==200){
            console.log(data)
            // clear()
            empCode.value=''
            fName.value =''
            lName.value =''
            email.value = ''
            group.value = ''
            position.value= ''
            office.value = ''
            role.value = ''
            passW.value = ''
            cPassW.value =''
            submittS.value=false
        }else{
            let errorMsg =undefined
                submittS.value=false
                alert_title.value='Cannot create user!!'
            if(data.error==null||data.error==undefined){
                errorMsg=[data]
            }else{
                errorMsg=[data.error]
            }
            alert_message.value=errorMsg
            alert_status.value=true
            console.log(errorMsg)
            
        }
    }
    
}

// clear input 
const clear=()=>{

    // input
    fName.value =''
    lName.value =''
    email.value = ''
    group.value = ''
    position.value= ''
    office.value = ''
    role.value = ''
    passW.value = ''
    cPassW.value =''

    // status
    empCode.value=undefined
    fNameS.value=undefined
    lNameS.value=undefined
    emailS.value=undefined
    groupS.value =undefined
    passWS.value =undefined
    cPassWS.value =undefined
    positionS.value=undefined
    officeS.value =undefined
    roleS.value =undefined

}



// show password
const pd =ref(false)
const showPd =()=>{
    let b = document.getElementById('pw')
    pd.value= !pd.value
    if(pd.value==false){
        b.setAttribute('type','password')
    }else
    if(pd.value==true){
        b.setAttribute('type','text')     
    }
    // console.log('hello world')
}

// animation rotate
const degree_start =ref(0)
const degree_end =ref(0)
const isSpin =ref(false)
const goRotate =()=>{

    document.getElementById('submitB').classList.toggle('spin')
   
    isSpin.value = !isSpin.value
    console.log(isSpin.value)
    if(isSpin.value==true){
        degree_end.value='rotate(360deg)'
        degree_start.value='rotate(0deg)'
        document.getElementById('submitB').classList.add('spin')
        console.log('spin right')
    }else if(isSpin.value==false){
        degree_end.value='rotate(-360deg)'
        degree_start.value='rotate(0deg)'
        document.getElementById('submitB').classList.add('spin')
        console.log('spin left')
    }
}

</script>
<template>
<div class="overflow-y-auto show_up">
    <div>
        <div>
            <!-- header -->
            <BaseHeader title="addUser" path ="vue.svg" />

            <!-- body -->
            <div class="w-[1200px] mt-4">
                <div class=" w-[600px] mx-auto p-1 text-[22px]">
                    <!-- Employee code -->
                    <div class="relative h-[60px]">
                        <h4 v-show="empCode.length>0" class="text-sm font-semibold text-gray-500 mx-2  transition-opacity fade-in delay-150">
                            Employee code
                            <span class="" :style="[empCode.length==lenghtOfInput.empCodeL?'color: rgb(225 29 72);':'']">
                                {{empCode.length}}/{{lenghtOfInput.empCodeL}}
                            </span>
                        </h4>
                        <input v-model="empCode" placeholder="Employee code" id="empCode" type="text" :maxlength="lenghtOfInput.empCodeL" :style="[empCodeS==false?'border-color: rgb(225 29 72);border-width: 2px;':'']" class="absolute bottom-0 w-full h-[40px]  bg-gray-300 text-gray-500   px-2 rounded-lg focus:outline-0" >
                    </div>

                    
                    <div class="flex h-fit">
                        <!-- first name -->
                        <div class="relative h-[60px] w-full">
                            <h4 v-show="fName.length>0" class="text-sm font-semibold text-gray-500 mx-2  transition-opacity fade-in delay-150">
                                First Name
                                <span class="" :style="[fName.length==lenghtOfInput.fNameL?'color: rgb(225 29 72);':'']">
                                    {{fName.length}}/{{lenghtOfInput.fNameL}}
                                </span>
                            </h4>
                            <input v-model="fName" placeholder="First Name" id="fName" type="text" :maxlength="lenghtOfInput.fNameL" :style="[fNameS==false?'border-color: rgb(225 29 72);border-width: 2px;':'']" class="absolute bottom-0 w-full  h-[40px]  bg-gray-300 text-gray-500   px-2 rounded-lg focus:outline-0" >
                        
                        </div>

                        <!-- last name -->
                        <div class="relative h-[60px] w-full ml-1">
                            <h4 v-show="lName.length>0" class="text-sm font-semibold text-gray-500 mx-2">
                                Last Name
                                <span class="" :style="[lName.length==lenghtOfInput.fNameL?'color: rgb(225 29 72);':'']">
                                    {{lName.length}}/{{lenghtOfInput.lNameL}}
                                </span>
                            </h4>                        
                            <input v-model="lName" placeholder="Last Name" id="lName" type="text" :maxlength="lenghtOfInput.lNameL" :style="[lNameS==false?'border-color: rgb(225 29 72);border-width: 2px;':'']" class="absolute bottom-0 w-full  h-[40px] bg-gray-300 text-gray-500    px-2 rounded-lg focus:outline-0" >
                        
                        </div>
                      </div>

                    <!-- group -->
                    <div class="h-[60px] mt-2 text-sm">
                        <!-- <label for="group" class="w-[120px]  font-semibold m-2">
                            Group
                        </label> -->
                        <div class="static flex w-full ">

                            <!-- role -->
                            <div class="relative w-full h-[60px] mx-1">
                                <h4 v-show="role.length>0" class="text-sm font-semibold text-gray-500 mx-2">
                                    Role
                                </h4> 
                                <select v-model="role"  id="role" :style="[roleS==false?'border-color: rgb(225 29 72);border-width: 2px;':'']" class="absolute bottom-0 w-full h-[40px]  px-2 bg-gray-300 text-gray-500 rounded-lg focus:outline-0">
                                    <option value="" selected disabled hidden >Role</option>
                                    <option value="user" >User</option>
                                    <option value="admin_it" >Admin IT</option>
                                    <option value="admin_pr" >Admin PR</option>
                                    <option value="super_admin" >Super Admin</option>
                                </select>
                            </div>

                            <!-- Position -->
                            <div class="relative w-full h-[60px] mx-1">
                                <h4 v-show="position.length>0" class="text-sm font-semibold text-gray-500 mx-2">
                                    Position
                                </h4>
                                <input v-model="position" type="text" placeholder="Position" :maxlength="lenghtOfInput.positionL" :style="[positionS==false?'border-color: rgb(225 29 72);border-width: 2px;':'']" class="absolute bottom-0  w-full h-[40px]  px-2 bg-gray-300 text-gray-500 rounded-lg focus:outline-0"> 
                                <!-- <select v-model="position"  id="position"  >
                                    <option value="" selected disabled hidden >Position</option>
                                    <option value="เจ้าหน้าที่เทคโนโลยีสารสนเทศ" >เจ้าหน้าที่เทคโนโลยีสารสนเทศ</option>
                                    <option value="หัวหน้ากลุ่มงานศูนย์ข้อมูลและเทคโนโลยีสารสนเทศ" >หัวหน้ากลุ่มงานศูนย์ข้อมูลและเทคโนโลยีสารสนเทศ</option>
                                    <option value="3" >sample 3</option>


                                </select> -->
                            </div>

                            <!-- Office -->
                            <div class="relative w-full h-[60px] mx-1">
                                <h4 v-show="office.length>0" class="text-sm font-semibold text-gray-500 mx-2">
                                    Office
                                </h4> 
                                <select v-model="office"  id="position" :style="[officeS==false?'border-color: rgb(225 29 72);border-width: 2px;':'']" class="absolute bottom-0  w-full h-[40px]  px-2 bg-gray-300 text-gray-500 rounded-lg focus:outline-0">
                                    <option value="" selected disabled hidden >Office</option>
                                    <option value="ผู้บริหาร" >ผู้บริหาร</option>
                                    <option value="สำนักส่งเสริมและขับเคลื่อนเครือข่ายทางสังคม" >สำนักส่งเสริมและขับเคลื่อนเครือข่ายทางสังคม</option>
                                    <option value="สำนักบริหารจัดการองค์กรและยุทธศาสตร์" >สำนักบริหารจัดการองค์กรและยุทธศาสตร์</option>
                                    <option value="สำนักพัฒนาองค์ความรู้นวัตกรรมและสื่อสารสนเทศ" >สำนักพัฒนาองค์ความรู้นวัตกรรมและสื่อสารสนเทศ</option>
                                    <option value="งานตรวจสอบภายใน" >งานตรวจสอบภายใน</option>
                                </select>
                            </div>                            
                            
                            <!-- Group -->
                            <div class="relative w-full h-[60px] mx-1">
                                <h4 v-show="group.length>0" class="text-sm font-semibold text-gray-500 mx-2">
                                    Group
                                </h4> 
                                <select v-model="group"  id="position" :style="[groupS==false?'border-color: rgb(225 29 72);border-width: 2px;':'']" class="absolute bottom-0  w-full h-[40px]  px-2 bg-gray-300 text-gray-500 rounded-lg focus:outline-0">
                                    <option value="" selected disabled hidden >Group</option>
                                    <option value="ผู้บริหาร" >ผู้บริหาร</option>
                                    <option value="บริหารจัดการองค์กร" >บริหารจัดการองค์กร</option>
                                    <option value="นโยบายและยุทธศาสตร์" >นโยบายและยุทธศาสตร์</option>
                                    <option value="วิจัยนวัตกรรมและระบบพฤติกรรมไทย" >วิจัยนวัตกรรมและระบบพฤติกรรมไทย</option>
                                    <option value="สื่อสารและรณรงค์ทางสังคม" >สื่อสารและรณรงค์ทางสังคม</option>
                                    <option value="ศูนย์ข้อมูลและเทคโนโลยีสารสนเทศ" >ศูนย์ข้อมูลและเทคโนโลยีสารสนเทศ</option>
                                    <option value="สมัชชาคุณธรรมและความร่วมมือนานาชาติ" >สมัชชาคุณธรรมและความร่วมมือนานาชาติ</option>
                                    <option value="ส่งเสริมคุณธรรมเครือข่ายทางสังคม" >ส่งเสริมคุณธรรมเครือข่ายทางสังคม</option>
                                </select>
                            </div>                            
                            
                        </div>

                        <!-- <input id="group" type="text" class="w-[300px] bg-gray-300 m-2 rounded-lg" > -->
                    </div>

                    <!-- email -->
                    <div class="relative h-[60px] mt-1.5 ">
                        <!-- <label for="email" class="w-[120px] font-semibold m-2">
                            Email
                        </label> -->
                        <h4 v-show="email.length>0" class="text-sm font-semibold text-gray-500 mx-2">
                            Email
                            <span class="" :style="[email.length==lenghtOfInput.emailL?'color: rgb(225 29 72);':'']">
                                {{email.length}}/{{lenghtOfInput.emailL}}
                            </span>
                        </h4> 
                        <div :style="[emailS==false?'border-color: rgb(225 29 72);border-width: 2px;':'']" class="absolute bottom-0 flex w-full h-[40px]  p-1 bg-gray-300 rounded-lg">
                            <input v-model="email" placeholder="Email" id="email" type="email" :maxlength="lenghtOfInput.emailL"   class="w-full h-full mx-1   bg-transparent text-gray-500 focus:outline-0" >
                            <h4 class="w-fit my-auto mx-2 font-semibold text-[15px] text-gray-500">
                                @moralcenter.or.th
                            </h4>
                        </div>
                    </div>

                    <!-- password -->
                    <div class="relative h-[60px] mt-1.5">
                        <!-- <label for="pw" class="w-[120px] font-semibold m-2">
                            Password
                        </label> -->
                        <h4 v-show="passW.length>0" class="text-sm font-semibold text-gray-500 mx-2">
                            Password
                            <span class="">
                                {{passW.length}}/14
                            </span>
                        </h4>
                        <div class="absolute w-full bottom-0">
                            <div class="relative  ">
                                <input v-model="passW" placeholder="Password" id="pw" type="password" :maxlength="lenghtOfInput.passWL" :style="[passWS==false?'border-color: rgb(225 29 72);border-width: 2px;':'']" class="w-full h-[40px] bg-gray-300 text-gray-500  px-2 rounded-lg focus:outline-0" >
                                <img v-show="passW.length>0" v-if="pd" @click="showPd" src="../../../assets/password/eye.png" alt="eye"  class="absolute top-[12px] right-[15px] w-[20px] cursor-pointer ">
                                <img v-show="passW.length>0" v-else @click="showPd" src="../../../assets/password/blind.png" alt="blind"  class="absolute top-[10px] right-[15px] w-[20px] cursor-pointer ">
                            </div>                            
                        </div> 
                    </div>
                    
                    <!-- confirm -->
                    <div class="relative  h-[60px] mt-1.5">
                        <!-- <label for="cPd" class="w-[120px] font-semibold m-2">
                            
                            Confirm password
                        </label> -->
                        <h4 v-show="cPassW.length>0" class="text-sm font-semibold text-gray-500 mx-2">
                            Confirm Password
                            <span class="">
                                {{cPassW.length}}/14
                            </span>
                        </h4> 
                        <input v-model="cPassW" placeholder="Confirm Password"  id="cPd" type="password" :maxlength="lenghtOfInput.passWL" :style="[cPassWS==false?'border-color: rgb(225 29 72);border-width: 2px;':'']" class="absolute bottom-0 w-full h-[40px] text-gray-500 bg-gray-300   px-2 rounded-lg focus:outline-0" >
                    </div>

                    <div class="my-2 lg:my-auto">
                        <BaseAlert :title="alert_title" :msgArr="alert_message"  :status="alert_status" :type="'CU'" />
                    </div>

                    <!-- button -->
                    <div class="w-fit mx-auto  mt-10">
                        <button id="submitB" @click="submittform()"  class="relative flex w-[200px] h-[40px] p-1 text-[20px] rounded-2xl bg-[#77BEFF] hover:bg-[#6098CC] active:bg-[#C4E3FF]">
                            <h4 class="w-fit h-fit  mx-auto font-light text-white">
                                Create User
                            </h4>
                            <BaseLoading v-show="submittS==true" class="absolute right-[1.2rem] top-[0.6rem]" type="circle" w="20" h="20" r="2"/>                               
                            <!-- <img  v-show="submittS==true"  src="../../../assets/vue.svg" alt="spin_loading" class="absolute top-[10px] right-[25px] w-[20px] animate-spin"> -->
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<style scoped>
.spin{
    /* width: 200px;
    height: 40px;
    font-size: 20px;
    padding: 4px;
    border-radius: 1rem; */
    animation: rotate 1s 1;
    
}

@keyframes rotate{
 0%{transform: v-bind(degree_start);
    
    }
 100%{transform: v-bind(degree_end);}
}

@keyframes tada {
    
}
</style>