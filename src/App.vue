<script setup lang="ts">

import UserCard from './components/UserCard.vue';
import UserSkills from './components/UserSkills.vue';
import UserNameSpec from './components/UserNameSpec.vue';
import UserAbout from './components/UserAbout.vue';
import UserExperience from './components/UserExperience.vue';
import {useUserService} from './composables/useUserService';
import {jsPDF} from 'jspdf'
import Button from 'primevue/button';




const userService = useUserService()
const user = userService.user

const doc = new jsPDF({
   orientation:'p',
   unit: 'px',
   format: [1200, 1800],

})


const convertToPDf = async() => {
   const element = document.getElementById('cv-content-to-print') as HTMLElement

   doc.html(element, {
       callback: function (doc) {
          doc.save('CV.pdf')
       }
   })

 

}


</script>

<template>
   <div class="container">
      <div class="cv-content" id="cv-content-to-print">
         <div class="left-side">
            <UserCard class="user-card"/>
            <div class="skills-block">
               <UserSkills :skills="user.skills['Skills']" :progressbar="true" />
               <UserSkills :skills="user.skills['Languages']" :progressbar="true"/>
               <UserSkills class="other-skills" :skills="user.skills['Other Skills']" :progressbar="false"/>
            </div>
        </div>
        <div class="right-side">
            <UserNameSpec class="isPC"/>
            <UserAbout />
            <UserExperience />

        </div>
       
      </div>
      <Button class="print-button" @click="convertToPDf()">Print</Button>
   </div>
</template>

<style scoped>


.cv-content{
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

.isPC{
   visibility: hidden;
   width: 0;
   height: 0;
}

.print-button{

   margin-top: 40px;
   padding: 15px 25px;
   font-size: 1.2rem;
}

@media(min-width: 990px){
   .isPC{
      visibility: visible;
      width: auto;
      height: auto;
   }
}

@media(max-width: 990px){
  
   
   .cv-content{
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
