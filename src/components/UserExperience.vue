<script setup lang="ts">
import { ref } from 'vue';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import InputMask from 'primevue/inputmask';
import Textarea from 'primevue/textarea';
import type {IExperience} from '../interfaces/index'
import { useUserService } from '../composables/useUserService';

const userService = useUserService()

const user = userService.user

const experienceList = ref<IExperience[]>(user.value.experience)




const saveData = (exp: IExperience, idx: number) =>{
         exp.isEdit = false
        if(exp.place.length > 40) exp.place = exp.place.slice(0, 40)

        userService.saveExperience(exp, idx)      
}



</script>

<template>
    <div class="user-exp">
        <div class="user-exp__inner">
            <h2 class="user-exp__title">EXPERIENCE</h2>
            <ul class="user-exp__list" v-if="experienceList.length > 0">
                <li class="user-exp__item" :class="exp.isEdit ? 'is-edit' : ''" v-for="exp, idx in experienceList" :key="idx" >
                     
                            <div class="user-exp__content" @click.stop="exp.isEdit = true">
                                <InputText class="input" placeholder="Job title" maxlength="40" v-model="exp.title" v-if="exp.isEdit" />
                                <h3 class="user-exp__name" v-else>{{exp.title}}</h3>
                                

                                <hr v-if="exp.isEdit">

                                <div class="user-exp__place">
                                    <InputText class="input" placeholder="work place" maxlength="70" v-model="exp.place" v-if="exp.isEdit" />
                                    <p class="user-exp__place_value" v-else>{{exp.place}}</p>                      

                                    <div class="user-exp__period">
                                        <div class="user-exp__start">
                                            <InputMask id="basic" v-model="exp.startDate" placeholder="99/99/9999" mask="99/99/9999" slotChar="mm/dd/yyyy"  v-if="exp.isEdit" />
                                            <span class="user-exp__start_value" v-else>{{exp.startDate}}</span>
                                        </div>
                                        -
                                        <div class="user-exp__end">
                                            <InputMask id="basic" v-model="exp.endDate" placeholder="99/99/9999" mask="99/99/9999" slotChar="mm/dd/yyyy" v-if="exp.isEdit" />
                                            <span class="user-exp__end_value" v-else>{{exp.endDate}}</span>
                                        </div>
                                    </div>
                                </div>

                                <hr v-if="exp.isEdit">
                              
                                <Textarea v-model="exp.description" v-if="exp.isEdit" class="input" rows="5" cols="30" maxlength="500" placeholder="Job description"/>
                                <p class="user-exp__description" v-else>{{exp.description}}</p>

                               
                            </div>
                            <i class="icon pi pi-pen-to-square"></i>
                            <Button v-if="exp.isEdit" label="Save" @click="saveData(exp, idx)"></Button>
                          
                </li>
               
            </ul>
            <Button class="add-experience" label="ADD EXPERIENCE" @click="userService.addExperience">Add experience</Button>
        </div>

    </div>
</template>

<style scoped>
.user-exp{
    width: 100%;
}

.user-exp__title{
    letter-spacing: 4px;
    margin-bottom: 30px;
}

.user-exp__list{
    display: flex;
    flex-direction: column;
    gap: 30px;
}
.user-exp__item{
    position: relative;
}

.user-exp__name{
    letter-spacing: 2px;
    font-size: 1.5rem;
}

.input{
    width: 100%;
    border-color: var(--primary)
}

.input:focus,
.input:active{
    border-color: var(--primary)
}

.user-exp__place{
    display: flex;
    justify-content: space-between;
    gap: 20px;
}

.user-exp__place span,
.user-exp__place input, 
.user-exp__place p{
    font-style: oblique;
  
}

.user-exp__period{
    display: flex;
    column-gap: 5px;
    align-items: center;
    flex-wrap: wrap;
}

.user-exp__content{
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.user-exp__description{
    font-size: 1.2rem;
}   

hr{
    margin: 5px 0;
}

.add-experience{
    display: none;
    margin-top: 40px;
    padding: 8px 12px;
}

.right-side:hover .add-experience{
    display: block;
}

.icon{
    display: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.input{
    border: none;
    outline: none;

}

.input:focus{
    border: 1px solid var(--primary);
}
.user-exp__item:not(.is-edit):hover span,
.user-exp__item:not(.is-edit):hover p,
.user-exp__item:not(.is-edit):hover h3 {
    color:rgba(var(--dark-rgb), 0.2);
}

.user-exp__item:not(.is-edit):hover{
    cursor: pointer;
}

.user-exp__item:not(.is-edit):hover .icon{
    display: block;
}
</style>