<script setup>
import {ref} from 'vue' 
const solutions =ref([])

</script>
<template>
<div class="overflow-y-auto ">
    <div>
        <div>
            <!-- header -->
            <div class="w-full text-center font-semibold text-[40px] pt-6">
                <div class="flex w-fit mx-auto">
                    <img src="../../../assets/admin_page/new-document.png" alt="users_icon" class="w-[50px] h-[50px] mr-4 my-auto">
                    Write solutions
                </div>
                <hr class="mt-3 bg-gray-700  w-[1170px] h-[3px]">
            </div>

            <!-- body -->
            <div class="w-[1200px] mt-10">
                <div class="w-fit mx-auto">

                    <!-- title -->
                    <div class="">
                        <h4>
                            Title
                        </h4>
                        <input type="text">
                    </div>

                    <!-- tag -->
                    <div>
                        <h4>
                            Tag
                        </h4>
                        <input type="text">
                    </div>
                </div>
            </div>


        </div>
    </div>
</div>
</template>
<style scoped>
</style>