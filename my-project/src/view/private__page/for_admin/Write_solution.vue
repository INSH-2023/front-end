<script setup>
import { ref, computed, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router';
import toBackEnd from '../../../JS/fetchToBack';
import jsCookie from '../../../JS/cookies'
import getRefreshToken from '../../../JS/refresh'

// const solutionLink ='http://localhost:3000/solutions'
const solutionLink = `${import.meta.env.VITE_BACK_END_HOST}/solutions`
const iconLink = `${import.meta.env.VITE_BACK_END_HOST}/images/solutions`
const myRounter = useRouter()
const gotoSolList = () => myRounter.push({ name: 'showAllSolution' })

const title = ref('')
const tag = ref('')
const tagArr = ref([])
const discription = ref('')
const stepN = ref(1)
const solutionT = ref('')
const solutionD = ref('')
const solutions = ref([{ step_: stepN.value, step_name: solutionT.value, step_description: solutionD.value, step_upload: false, file: "", imgName: "", imgShow: "" }])
const isUpload = ref(false)

const icon = ref(undefined)
const iconName = ref('')
// const img = ref(undefined)
// const imgName = ref('')

const token = ref("")

let dataCh = computed(() => {
    return {
        solution_title: title.value,
        solution_tag: tagArr.value,
        solution_text: discription.value,
        solution_icon: iconName.value,
        solution_steps: solutions.value,
    }
})

// upload icon
const uploadIcon = (event) => {
    let iconShow = document.getElementById("previewIcon")
    console.log(event)
    if (icon.value == undefined) {
        if (event.target.files[0].size > 10000001) {
            console.log("The file size cannot be larger then 10 MB")
            iconName.value = ""
            // fileStatus.value=false
        } else {
            icon.value = event.target.files[0]
            iconName.value = icon.value.name
            // fileStatus.value=true
            console.log(icon.value)
            iconShow.src = URL.createObjectURL(event.target.files[0])
        }
    } else {
        if (event.target.files[0].size > 10000001) {
            console.log("The file size cannot be larger then 10 MB")
        } else {
            icon.value = event.target.files[0]
            iconName.value = icon.value.name
            // fileStatus.value=true
            console.log(icon.value)
            console.log('new file selected')
            iconShow.src = URL.createObjectURL(event.target.files[0])
        }
    }
}

// upload image
const uploadImg = (event, step) => {
    console.log(event)
    console.log(step)
    // step.imgShow = document.getElementById('previewImg'+step.solutionId)
    if (step.file == '') {
        if (event.target.files[0].size > 10000001) {
            console.log("The file size cannot be larger then 10 MB")
            step.imgName = ""
            // fileStatus.value=false
        } else {
            step.file = event.target.files[0]
            step.imgName = step.file.name
            step.imgShow = URL.createObjectURL(event.target.files[0])
            // fileStatus.value=true
            step.step_upload = true
        }
    } else {
        if (event.target.files[0].size > 10000001) {
            console.log("The file size cannot be larger then 10 MB")
        } else {
            step.file = event.target.files[0]
            step.imgName = step.file.name
            // fileStatus.value=true
            console.log('new file selected')
            step.imgShow = URL.createObjectURL(event.target.files[0])
        }
    }
    console.log(step)
}

// remove icon
const removeIcon = () => {
    icon.value = undefined
    iconName.value = ''
    let iconShow = document.getElementById("previewIcon")
    iconShow.src = '#'
    console.log('remove success')
}

// remove image
const removeImg = (sol) => {
    console.log(sol)
    sol.file = ''
    sol.imgName = ''
    sol.imgShow = ''
    sol.step_upload = false
    console.log('remove success : step ' + sol.step_)
}

// lenght
const titleL = 50
const tagL = 150
const discriptionL = 150
const solutionN = 50
const solutionL = 150

// style
const titleS = ref(true)
const tagS = ref(true)
const discriptionS = ref(true)
const iconS = ref(true)

// add new element
const addNewSolution = () => {
    let limitSolu = 15
    if (solutions.value.length >= limitSolu) {
        console.log('cannot add new element of solution')
    } else {
        console.log(stepN.value)
        ++stepN.value
        solutions.value.push({ step_: stepN.value, step_name: solutionT.value, step_description: solutionD.value, step_upload: false, file: "", imageName: "", imageShow: "" })
        console.log('add new element')
    }
}

// remove element
const removeElement = (v) => {
    console.log(v)
    solutions.value.splice(v, 1)
    console.log('remove element')
}

//clean tag data
const getTagToArr = (v) => {
    tagArr.value = v.split(",")
    //  console.log(v)
}

// validate
const validate = () => {
    let status = undefined

    // more than limit
    // if (title.value.length > titleL) {
    //     console.log('length of title more than limit')
    //     isUpload.value = false
    // }
    // if (tag.value.length > tagL) {
    //     console.log('length of tag more than limit')
    //     isUpload.value = false
    // }
    // if (discription.value.length > discriptionL) {
    //     console.log('length of discription more than limit')
    //     isUpload.value = false
    // }
    // if (solutionT.value.length > solutionL) {
    //     console.log('some step ,length of solution text more than limit')
    //     isUpload.value = false
    // }
    // if (solutions.value.length > 15) {
    //     console.log('length of solution array  more than limit')
    //     isUpload.value = false
    // }

    // not input data
    if (title.value.length == 0) {
        console.log('please input ur title')
        status = true
        titleS.value = false
        isUpload.value = false
    }

    if (tag.value.length == 0 || tagArr.value.length == 0) {
        console.log('please input ur tag')
        status = true
        tagS.value = false
        isUpload.value = false
    }
    if (discription.value.length == 0) {
        console.log('please input ur discription')
        status = true
        discriptionS.value = false
        isUpload.value = false
    }
    if (icon.value == undefined) {
        console.log('please upload your article icon')
        status = true
        iconS.value = false
        isUpload.value = false
    }
    // if (solutions.value.length == 0) {
    //     console.log('please input ur solutions')
    //     status = true
    //     titleS = false
    //     isUpload.value = false
    // }
    solutions.value.forEach(s => {
        if (s.step_name.length == 0) {
            console.log(`please input ur solution ${s.step_} name`)
            status = true
            s.nameS = true
            isUpload.value = false
        }
    })

    if (!status) {
        console.log('title' + title.value)
        console.log('tag' + tag.value)
        console.log('tagArr' + tagArr.value)
        console.log('discription' + discription.value)
        console.log('solutions' + solutions.value)
    }
    return status
}

// submit form
const submitt = async () => {
    getTagToArr(tag.value)

    console.log(dataCh.value)
    // console.log(icon.value)

    isUpload.value = true

    console.log(validate())
    if (validate() == true) {
        console.log('please input ur info')
    } else {
        token.value = JSON.parse(jsCookie.get("data")).token
        const [status, data] = await toBackEnd.postData('solution', solutionLink, dataCh.value, token.value)

        if (icon.value.length != 0) {
            const formData = new FormData()
            formData.append("file", icon.value)
            let [status1, data1] = await toBackEnd.postFile('solution', `${iconLink}/${data.solutionId}`, formData)
        }

        console.log(dataCh.value.solution_steps)

        dataCh.value.solution_steps.forEach(async step => {
            console.log(step.step_upload)
            if (step.step_upload) {
                console.log("T")
                const formData = new FormData()
                formData.append("file", step.file)
                let [status1, data1] = await toBackEnd.postFile('step', `${iconLink}/${data.solutionId}?step=${step.step_}`, formData)
            }
        })

        // const res =await fetch(solutionLink,{
        //     method:'POST',
        //     headers:{
        //         "content-type": "application/json"
        //     },
        //     body:JSON.stringify({
        //         title:title.value,
        //         tag:tagArr.value,
        //         text:discription.value,
        //         solutions:solutions.value
        //     })
        // }) 
        if (status == 201) {
            console.log('add successful')
            isUpload.value = false
            gotoSolList()
        } else if (status == 400) {
            // console.log(data.error)
            console.log('bad request')
        } else {
            console.log('error something')
        }
    }


    // let index =solutions.value.index


    // console.log(getTagToArr(tag.value))
    // console.log(tagArr.value[0])
    // console.log(tagArr.value) 

    // solutions.value=[]
    // console.log(solutions.value)
}

onBeforeUnmount(() => {
    getRefreshToken(JSON.parse(jsCookie.get("data")).refreshToken)
})

let test = (e, t) => {
    console.log(e)
    console.log(t)
}
</script>
<template>
    <div class="overflow-y-auto show_up">
        <div>
            <div>
                <!-- header -->
                <div class="w-full text-center font-semibold text-[40px] pt-6">
                    <div class="flex w-fit mx-auto">
                        <img src="../../../assets/admin_page/new-document.png" alt="users_icon"
                            class="w-[50px] h-[50px] mr-4 my-auto">
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

                            <h4 v-show="title.length > 0" class="text text-sm font-semibold text-gray-500 mx-2">
                                Title
                                <span class="text-gray-300"
                                    :style="[title.length == titleL ? 'color: rgb(225 29 72);' : '']">
                                    {{ title.length }}/{{ titleL }}
                                </span>
                            </h4>
                            <input v-model="title" placeholder="Title" id="title" type="text" :maxlength="titleL"
                                :style="[!titleS && title.length == 0 ? 'border-color: rgb(225 29 72);border-width: 2px;' : '']"
                                class="absolute bottom-0 w-full h-[40px]  bg-gray-300 text-gray-500  px-2 py-2 rounded-lg focus:outline-0">
                        </div>

                        <!-- tag -->
                        <div class="relative h-[60px] mt-1.5 ">
                            <h4 v-show="tag.length > 0" class="text text-sm font-semibold text-gray-500 mx-2">
                                Tag
                                <span class="text-gray-300" :style="[tag.length == tagL ? 'color: rgb(225 29 72);' : '']">
                                    {{ tag.length }}/{{ tagL }}
                                </span>
                                <span class="ml-[20px] text-gray-300">
                                    (sample : tag1,tag2,tag3)
                                </span>
                            </h4>
                            <input v-model="tag" placeholder="Tag" id="tag" type="text" :maxlength="tagL"
                                :style="[!tagS && tag.length == 0 ? 'border-color: rgb(225 29 72);border-width: 2px;' : '']"
                                class="absolute bottom-0 w-full h-[40px] bg-gray-300 text-gray-500  px-2 py-2 rounded-lg focus:outline-0">
                        </div>

                        <!-- discription -->
                        <div class="relative h-[140px] mt-1.5 ">
                            <h4 v-show="discription.length > 0" class="text text-sm font-semibold text-gray-500 mx-2">
                                Discription
                                <span class="text-gray-300"
                                    :style="[discription.length == discriptionL ? 'color: rgb(225 29 72);' : '']">
                                    {{ discription.length }}/{{ discriptionL }}
                                </span>
                            </h4>
                            <textarea v-model="discription" placeholder="Discription (use html text only)" id="discription"
                                type="text" :maxlength="discriptionL"
                                :style="[!discriptionS && discription.length == 0 ? 'border-color: rgb(225 29 72);border-width: 2px;' : '']"
                                class="resize-none absolute bottom-0 w-full h-[120px] bg-gray-300 text-gray-500   px-2 py-2 rounded-lg focus:outline-0">
                            </textarea>
                        </div>

                        <!-- icon -->
                        <div :style="[icon != undefined ? 'background-color: rgb(209 213 219); ' : '']"
                            class="relative w-full h-fit mt-4 overflow-hidden rounded-lg">
                            <img v-show="icon != undefined" id="previewIcon" src="#" alt="show image"
                                class="w-[80px] mx-auto mt-3 py-3" />
                            <div :style="[!iconS && icon == undefined ? 'border-color: rgb(225 29 72); border-width: 2px; width: fit-content; border-radius:8px' : icon != undefined ? 'width: 100%;border-bottom-right-radius: 8px;border-bottom-left-radius: 8px;' : 'width: fit-content; border-radius:8px']"
                                class=" mx-auto p-1.5 bg-gray-400  font-light text-center">
                                <label for="file" class="w-fit text-white cursor-pointer ">
                                    <input id="file" type="file" accept=".png,.jpg,.jpeg" class="hidden"
                                        @change="uploadIcon" />
                                    <span v-show="icon == undefined">Upload Icon</span>
                                    <span v-show="icon != undefined">{{ iconName }}</span>
                                </label>
                            </div>
                            <div v-show="icon != undefined" @click="removeIcon"
                                class="absolute top-[3px] right-[10px] text-sm font-semibold cursor-pointer hover:text-rose-700">
                                X
                            </div>
                        </div>

                        <div class="mt-4 font-semibold text-[25px]">
                            Solutions
                        </div>

                        <!-- solutions step -->
                        <div v-for="(data, index) in solutions" :key="index" class="relative h-fit">
                            <h4 v-show="data.step_ > 0" class="text text-sm font-semibold text-gray-500 mx-2 py-2">
                                Step {{ index + 1 }}
                            </h4>

                            <!-- step name -->
                            <div class="relative h-[60px]">
                                <p v-show="data.step_name.length > 0" class="text text-sm font-semibold text-gray-300"
                                    :style="[data.step_name.length == solutionN ? 'color: rgb(225 29 72);' : '']">
                                    step name : {{ data.step_name.length }}/{{ solutionN }}
                                </p>
                                <input v-model="data.step_name" :placeholder="`Step ${index + 1} header`" id="solution"
                                    type="text" :maxlength="solutionN"
                                    :style="[data.nameS && data.step_name.length == 0 ? 'border-color: rgb(225 29 72);border-width: 2px;' : '']"
                                    class="resize-none absolute bottom-0 w-full h-[40px] bg-gray-300 text-gray-500 px-2 py-[10px] rounded-lg focus:outline-0">
                            </div>

                            <!-- step description -->
                            <div class="relative h-[160px] mt-1.5">
                                <p v-show="data.step_description.length > 0"
                                    class="text text-sm font-semibold text-gray-300"
                                    :style="[data.step_description.length == solutionL ? 'color: rgb(225 29 72);' : '']">
                                    step description : {{ data.step_description.length }}/{{ solutionL }}
                                </p>
                                <textarea v-model="data.step_description"
                                    :placeholder="`Step ${index + 1} description (use html text only)`" id="solution"
                                    type="text" :maxlength="solutionL"
                                    class="resize-none absolute bottom-0 w-full h-[140px] bg-gray-300 text-gray-500 px-2 py-[20px] rounded-lg focus:outline-0">
                                        </textarea>
                            </div>


                            <!-- detail image -->
                            <div :style="[data.file != '' ? 'background-color: rgb(209 213 219)' : '']"
                                class="relative w-full h-fit my-6 overflow-hidden rounded-lg">
                                <img v-show="data.file != ''" :id="'previewImg' + data.step_" :src="data.imgShow"
                                    alt="show image" class="w-[80px] mx-auto mt-3 py-3" />
                                <div :style="[data.file != '' ? 'width: 100%;border-bottom-right-radius: 8px;border-bottom-left-radius: 8px;' : 'width: fit-content; border-radius:8px']"
                                    class=" mx-auto p-1.5 bg-gray-400 font-light text-center">
                                    <label :for="'file' + data.step_" class="w-fit text-white cursor-pointer ">
                                        <input :id="'file' + data.step_" type="file" accept=".png,.jpg,.jpeg" class="hidden"
                                            @change="uploadImg($event, data)" />
                                        <span v-show="data.file == ''">Upload Image</span>
                                        <span v-show="data.file != ''">{{ data.imgName }}</span>
                                    </label>
                                </div>
                                <div v-show="data.file != ''" @click="removeImg(data)"
                                    class="absolute top-[3px] right-[10px] text-sm font-semibold cursor-pointer hover:text-rose-700">
                                    X
                                </div>
                            </div>
                            <div v-if="solutions.length > 1" @click="removeElement(index)"
                                class="absolute right-[8px] top-[0px] font-semibold cursor-pointer">
                                x
                            </div>
                        </div>

                        <button @click="addNewSolution()"
                            class="relative w-[40px] h-[40px] my-2 bg-transparent border-gray-400 border-[4px] hover:bg-gray-500 hover:border-gray-200 hover:text-sky-200 rounded-full">
                            <h4 class="absolute w-full h-full top-[-22.5px] text-[45px] text-sky-400">
                                +
                            </h4>
                        </button>

                        <!-- button -->
                        <div class="w-fit mx-auto mt-10">
                            <button @click="submitt()" :style="['background-color:#77BEFF']"
                                class="relative w-[200px] h-[40px] p-1 text-[20px] mb-5 rounded-2xl">
                                <h4 class="static font-light text-white">
                                    Add Solution
                                </h4>
                                <img v-show="isUpload" src="../../../assets/vue.svg" alt="spin_loading"
                                    class="absolute top-[10px] right-[25px] w-[20px] animate-spin">
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
<style scoped>
.text {
    animation: tada 1.5s
}

@keyframes tada {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}
</style>