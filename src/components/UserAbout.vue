<script setup lang="ts">
import EditBlock from './EditBlock.vue';
import { ref, onMounted } from 'vue';


const isEdit = ref<boolean>(false)
const aboutText = ref<string>('')

const saveData = () => {
    isEdit.value = false

    if(aboutText.value.length === 0){
        'Write something about yourself'
    }

    sessionStorage.setItem('about-text', aboutText.value)   
}

onMounted(()=>{
   aboutText.value = sessionStorage.getItem('about-text') as string || 'Write something about yourself'
   
})




</script>

<template>
    <div class="user-about">
        <div class="user-about__inner">
            <h2 class="user-about__title">ABOUT ME</h2>
            <edit-block class="user-about__edit"
                        :edit="isEdit"
                        @save="saveData"
                        @edit="isEdit = true">
                <template #default>
                    <div class="user-about__text"
                        :contenteditable="isEdit"
                        @input="aboutText = ($event.target as HTMLElement).innerText">
                        {{aboutText}}
                    </div>
                </template>
                <template #icon>
                    <i class="pi pi-pen-to-square"></i>
                </template>
            </edit-block>
        </div>

    </div>
</template>

<style scoped>

.user-about__title{
    letter-spacing: 4px;
}

.user-about__inner{
    display: flex;
    flex-direction: column;
}

.user-about__text{
    font-family: 'Ubuntu';
    font-style: oblique;
    line-height: 24px;
    text-wrap: balance;
    
}

</style>