<script setup lang="ts">
import {ref, onMounted} from 'vue'
import UserCard from './components/UserCard.vue';
import UserSkills from './components/UserSkills.vue';
import UserNameSpec from './components/UserNameSpec.vue';
import UserAbout from './components/UserAbout.vue';
import UserExperience from './components/UserExperience.vue';
import {useUserService} from './composables/useUserService';
import { useDetectMobile } from '@/composables/useDetectMobile';
import {jsPDF} from 'jspdf'
import Button from 'primevue/button';
import Loader from './components/UI/loader.vue'

const isConverting = ref<boolean>(false)
const mobileDetected = ref<boolean>(false)

const userService = useUserService()
const user = userService.user

const doc = new jsPDF({
   orientation:'p',
   unit: 'px',
   format: [1200, 1800],

})


const convertToPDf = async() => {
   isConverting.value = true
   document.body.classList.add('lock')
   const element = document.getElementById('cv-content-to-print') as HTMLElement

  setTimeout(()=>{
   element.style.width = '1200px'
   element.style.position = 'absolute'
   element.style.flexDirection = 'row'

   doc.html(element, {
         callback: function (doc) {
            doc.save('CV.pdf')
         }
      })

 
  }, 500)

  setTimeout(()=>{

   element.style.width = 'auto'
   element.style.position = 'relative'
   element.style.flexDirection = 'column' 
  }, 1000)

   setTimeout(() => {
      document.body.classList.remove('lock')
      isConverting.value = false

   }, 2000)
   
}



onMounted(()=>{
   if(useDetectMobile()){
      mobileDetected.value = true
   }
})


</script>

<template>
   <div class="container">
      <div class="cv-content" id="cv-content-to-print">
         <div class="left-side">
            <UserCard class="user-card" :converting="isConverting"/>
            <div class="skills-block">
               <UserSkills :skills="user.skills['Skills']" :progressbar="true" />
               <UserSkills :skills="user.skills['Languages']" :progressbar="true"/>
               <UserSkills class="other-skills" :skills="user.skills['Other Skills']" :progressbar="false"/>
            </div>
        </div>
        <div class="right-side">
            <UserNameSpec class="isPC" :class="isConverting ? 'isConverting' : ''"/>
            <UserAbout />
            <UserExperience />

        </div>
       
      </div>
      <Button class="print-button" @click="convertToPDf()">Generate PDF</Button>

      <Transition name="fade">
         <Loader v-if="isConverting"/>
      </Transition> 


      <Transition name="fade">
         <div class="mobileDetect" v-if="mobileDetected">
            <div class="mobileDetect__inner">
               <p class="mobileDetect-text">
                  Mobile device usage detected. Tap on the desired text to edit it. Click on a specific area of the document to show specific buttons
               </p>
                <Button class="mobileDetect-btn" @click="mobileDetected = false">Got it</Button>
            </div>
         </div>
      </Transition> 
    
   </div>
</template>

<style scoped>


.cv-content{
   position: relative;
   width: 1200px;
   display: flex;
   box-shadow: 3px 3px 20px rgba(0, 0, 0, 0.4);
   background-color: var(--white);
   row-gap: 40px;

   
}

.user-card{
   margin-bottom: 30px;
}

.left-side{
   flex: 0 1 40%;
   display: flex;
   flex-direction: column;
   gap: 50px;
}

.right-side{
   flex: 0 1 60%;
   padding: 20px 15px;
   display: flex;
   flex-direction: column;
   gap: 40px;
}

.skills-block{
   padding: 0 20px;
}



.print-button{

   margin-top: 40px;
   padding: 15px 25px;
   font-size: 1.2rem;
}





.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}



.isPC{
   visibility: hidden;
   width: 0;
   height: 0;
}


.isPC.isConverting{
   visibility: visible;
   width: auto;
   height: auto;
}

.mobileDetect{
   position: fixed;
   display: flex;
   justify-self: center;
   align-items: center;
   top: 0;
   left: 0;
   width: 100vw;
   height: 100vh;
   background-color: var(--primary);
   z-index: 9998;
}

.mobileDetect__inner{
   position: absolute;
   display: flex;
   gap: 20px;
   align-items: center;
   flex-direction: column;
   top: 50%;
   left: 50%;
   transform: translate(-50% , -50%);
}


.mobileDetect-text{
   color: var(--white);
   font-size: 1.5rem;
   text-align: center;
}

.mobileDetect-btn{
   padding: 10px 15px;
   font-size: 1.5rem;
}


@media (min-width:990px){
   .isPC{
      visibility: visible;
      width: auto;
      height: auto;
   }
}


@media(max-width: 990px){
  
   
   .cv-content{
      width: auto;
      flex-direction: column;
      min-width: 300px;
      margin: 10px 0;
   }
   .user-card{
      width: 100%;
   }
  
}

@media (max-width: 500px) {
   .container{
      padding: 0 5px;
   }
}


</style>

