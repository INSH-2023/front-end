<script setup>
import {ref} from 'vue'

const fName=ref('')
const lName =ref('')
const email = ref('')
const group = ref('')
const passW = ref('')
const cPassW = ref('')

// submit
const submittS =ref(undefined)

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
</script>
<template>
<div class="overflow-y-auto ">
    <div>
        <div>
            <!-- header -->
            <div class="w-full text-center font-semibold text-[40px] pt-6">
                <div class="flex w-fit mx-auto">
                    <img src="../../../assets/admin_page/addUser.png" alt="users_icon" class="w-[50px] h-[50px] mr-4 my-auto">
                    Add User
                </div>
                <hr class="mt-3 bg-gray-700  w-[1170px] h-[3px]">
            </div>

            <!-- body -->
            <div class="w-[1200px] mt-10">
                <div class=" w-fit mx-auto text-[22px]">
                    <!-- first name -->
                    <div class="flex ">
                        <label for="fName" class="w-[120px] font-semibold m-2">
                            First Name
                        </label>
                        <input v-model="fName" id="fName" type="text" class="w-[400px] h-[40px] bg-gray-300 m-2 px-1.5 rounded-lg focus:outline-0" >
                    </div>

                    <!-- last name -->
                    <div class="flex ">
                        <label for="lName" class="w-[120px] font-semibold m-2">
                            Last Name
                        </label>
                        <input v-model="lName" id="lName" type="text" class="w-[400px] h-[40px] bg-gray-300 m-2 px-1.5 rounded-lg focus:outline-0" >
                    </div>

                    <!-- email -->
                    <div class="flex ">
                        <label for="email" class="w-[120px] font-semibold m-2">
                            Email
                        </label>
                        <div class="flex w-[400px] h-[40px] m-2 p-1 bg-gray-300 rounded-lg">
                            <input v-model="email" id="email" type="text" class="w-[250px] h-full mx-1  px-1.5 bg-transparent focus:outline-0" >
                            <h4 class="w-fit my-auto text-[15px]">
                                @moralcenter.or.th
                            </h4>
                        </div>
                    </div>

                    <!-- group -->
                    <div class="flex ">
                        <label for="group" class="w-[120px]  font-semibold m-2">
                            Group
                        </label>
                        <select v-model="group"  id="group" class="w-[400px] h-[40px] m-2 px-1.5 bg-gray-300 rounded-lg focus:outline-0">
                            <option value="" selected disabled>เลือกสิจ๊ะ</option>
                            <option value="1" >sample 1</option>
                            <option value="2" >sample 2</option>
                            <option value="3" >sample 3</option>


                        </select>
                        <!-- <input id="group" type="text" class="w-[300px] bg-gray-300 m-2 rounded-lg" > -->
                    </div>

                    <!-- password -->
                    <div class="flex ">
                        <label for="pw" class="w-[120px] font-semibold m-2">
                            Password
                        </label>
                        <div class="relative">
                            <input v-model="passW" id="pw" type="password" class="w-[400px] h-[40px] bg-gray-300 m-2 px-1.5 rounded-lg focus:outline-0" >
                            <img @click="showPd" src="../../../assets/vue.svg" alt="eye"  class="absolute top-[13px] right-[15px] w-[20px] cursor-pointer ">
                        </div>
                    </div>
                    
                    <!-- confirm -->
                    <div class="flex ">
                        <label for="cPd" class="w-[120px] font-semibold m-2">
                            
                            Confirm password
                        </label>
                        <input v-model="cPassW" id="cPd" type="password" class="w-[400px] h-[40px] bg-gray-300 m-2 my-auto px-1.5 rounded-lg focus:outline-0" >
                    </div>


                    <!-- button -->
                    <div class="w-fit mx-auto  mt-3">
                        <button class="relative w-[200px] h-[40px] p-1 text-[20px] bg-rose-300 font-semibold text-gray-600  rounded-xl">
                            <h4 @click="submittS=true" class="static">
                                Submit
                            </h4>
                            <img v-show="submittS==true" src="../../../assets/vue.svg" alt="spin_loading" class="absolute top-[10px] right-[25px] w-[20px] animate-spin">
                        </button>
                    </div>
                </div>


               
            </div>

        </div>
    </div>
</div>
</template>
<style scoped>
</style>