<script setup>
import {ref} from 'vue' 


const title=ref('')
const tag =ref('')
const tagArr=ref([])
const discription = ref('')
const solutionT=ref('')
const solutions =ref([])

const icon =ref(undefined)
const iconName=ref('')
const img =ref(undefined)
const imgName = ref('')


const uploadIcon=(event)=>{
    let iconShow =document.getElementById("previewIcon")
    
    if(icon.value==undefined){
        if(event.target.files[0].size>10000001){
            console.log("file too big")
            iconName.value=""
            // fileStatus.value=false
        }else{
            icon.value=event.target.files[0]
            iconName.value=icon.value.name
            // fileStatus.value=true
            console.log(icon.value)
            iconShow.src=URL.createObjectURL(event.target.files[0])
            }
    }else
    if(icon.value!=undefined){
        if(event.target.files[0].size>10000001){
        console.log("The file size cannot be larger then 10 MB ")
        }else{
        icon.value=event.target.files[0]
        iconName.value=icon.value.name
        // fileStatus.value=true
        console.log(icon.value)
        console.log('new file selected')
        iconShow.src=URL.createObjectURL(event.target.files[0])
    }
    }
}

// remove icon
const removeIcon=()=>{
    icon.value =undefined
    iconName.value=''
    console.log('remove success')
}

// lenght
const titleL=30
const tagL=30
const discriptionL=150
const solutionL=150
const stepN=ref(0)

// style
const titleS=ref(undefined)
const tagS=ref(undefined)
const discriptionS=ref(undefined)
const solutionS =ref(undefined)


// add new element
const addNewSolution=()=>{
    let limitSolu =15
    if(solutions.value.length>=limitSolu){
        console.log('cannot add new element of solution')
    }else{
        console.log(stepN.value)
        ++stepN.value
        solutions.value.push({id:stepN.value,solution:solutionT.value})
        console.log('add new element')  
    }

}

// remove element
const removeElement=(v)=>{
    console.log(v)
    solutions.value.splice(v,1)
    console.log('remove element')
}

// submit form
const submitt=(v)=>{
    // let index =solutions.value.index

    
    // solutions.value=[]
    console.log(solutions.value)
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
                    Write Solutions
                </div>
                <hr class="mt-3 bg-gray-700  w-[1170px] h-[3px]">
            </div>

            <!-- body -->
            <div class="w-[1200px] mt-10">
                <div class=" w-[600px] mx-auto p-1 text-[22px]">

                    <div class="mt-3 font-semibold text-[25px]">
                        Header
                    </div>

                    <!-- title -->
                    <div class="relative h-[60px]">

                        <h4 v-show="title.length>0" class="text-sm font-semibold text-gray-500 mx-2">
                            Title
                            <span class="text-gray-300" :style="[title.length==titleL?'color: rgb(225 29 72);':'']">
                                {{title.length}}/{{titleL}}
                            </span>
                        </h4>
                        <input v-model="title" placeholder="Title" id="title" type="text" :maxlength="titleL" :style="[titleS==false?'border-color: rgb(225 29 72);border-width: 2px;':'' ]" class="absolute bottom-0 w-full h-[40px]  bg-gray-300 text-gray-500  px-2 py-2 rounded-lg focus:outline-0" >
                    </div>

                    <!-- tag -->
                    <div class="relative h-[60px] mt-1.5 ">
                        <h4 v-show="tag.length>0" class="text-sm font-semibold text-gray-500 mx-2">
                            Tag
                            <span class="text-gray-300" :style="[tag.length==tagL?'color: rgb(225 29 72);':'']">
                                {{tag.length}}/{{tagL}}
                            </span>
                            <span class="ml-[20px] text-gray-300">
                                (sample : tag1 tag2 tag3)
                            </span>
                        </h4>                        
                        <input v-model="tag" placeholder="Tag" id="tag" type="text" :maxlength="tagL" :style="[tagS==false?'border-color: rgb(225 29 72);border-width: 2px;':'']" class="absolute bottom-0 w-full h-[40px] bg-gray-300 text-gray-500  px-2 py-2 rounded-lg focus:outline-0" >
                    </div>

                    <!-- discription -->
                    <div class="relative h-[140px] mt-1.5 ">
                        <h4 v-show="discription.length>0" class="text-sm font-semibold text-gray-500 mx-2">
                            Discription
                            <span class="text-gray-300" :style="[discription.length==discriptionL?'color: rgb(225 29 72);':'']">
                                {{discription.length}}/{{discriptionL}}
                            </span>
                        </h4>                        
                        <textarea v-model="discription" placeholder="Discription" id="discription" type="text" :maxlength="discriptionL" :style="[discriptionS==false?'border-color: rgb(225 29 72);border-width: 2px;':'']" class="resize-none absolute bottom-0 w-full h-[120px] bg-gray-300 text-gray-500   px-2 py-2 rounded-lg focus:outline-0" >
                        </textarea>
                    </div>

                    <!-- icon -->
                    <div :style="[icon!= undefined ? 'background-color: rgb(209 213 219); ':'']" class="relative w-full h-fit mt-4  rounded-lg">
                        <img v-show="icon!= undefined" id="previewIcon" src="#" alt="show image" class="w-[80px] mx-auto mt-3 py-3"/>
                        <div :style="[icon != undefined? 'width: 100%;border-bottom-right-radius: 8px;border-bottom-left-radius: 8px;':'width: fit-content; border-radius:8px']" class=" mx-auto p-1.5 bg-gray-400  font-light text-center">
                            <label  for="file" class="w-full text-white cursor-pointer ">
                                <input id="file" type="file" accept=".png,.jpg,.jpeg" class="hidden" @change="uploadIcon"/>
                                <span v-show="icon==undefined" >Upload File</span>
                                <span v-show="icon!=undefined" >{{ iconName }}</span>
                            </label>                             
                        </div>
                        <div v-show="icon != undefined" @click="removeIcon" class="absolute top-[3px] right-[10px] text-sm font-semibold cursor-pointer hover:text-rose-700">
                            X
                        </div>
                    </div>                    

                    <div class="mt-4 font-semibold text-[25px]">
                        Solutions
                    </div>

                    <!-- solutions -->
                    <div v-for="(data,index) in solutions" :key="index" class="solu relative h-[160px]  ">
                        <h4 v-show="data.solution.length>0" class="text-sm font-semibold text-gray-500 mx-2">
                            Step {{ index+1 }}
                            <span class="text-gray-300" :style="[data.solution.length==solutionL?'color: rgb(225 29 72);':'']">
                                {{data.solution.length}}/{{solutionL}}
                            </span>
                        </h4>                        
                        <textarea v-model="data.solution" :placeholder="`Step ${index+1}`" id="solution" type="text" :maxlength="solutionL" :style="[solutionS==false?'border-color: rgb(225 29 72);border-width: 2px;':'']" class="resize-none absolute bottom-0 w-full h-[140px] bg-gray-300 text-gray-500    px-2 py-[20px] rounded-lg focus:outline-0" >
                        </textarea>
                        <div @click="removeElement(index)" class="absolute right-[8px] top-[12px] font-semibold cursor-pointer">
                            x
                        </div>
                    </div>

                
                    <button @click="addNewSolution()" class="relative w-[40px] h-[40px] mt-6  m-auto bg-transparent   border-gray-400 border-[4px] hover:bg-gray-500 hover:border-gray-200 hover:text-sky-200 rounded-full">
                        <h4 class="absolute w-full h-full  top-[-23px]  text-[45px] text-sky-400">
                        +
                        </h4> 
                    </button>

                    <!-- button -->
                    <div class="w-fit mx-auto  mt-10">
                        <button @click="submitt()" :style="['background-color:#77BEFF']" class="relative w-[200px] h-[40px] p-1 text-[20px]  rounded-2xl">
                            <h4 @click="true" class="static font-light text-white">
                                Add Solution
                            </h4>
                            <img  v-show="false"  src="../../../assets/vue.svg" alt="spin_loading" class="absolute top-[10px] right-[25px] w-[20px] animate-spin">
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