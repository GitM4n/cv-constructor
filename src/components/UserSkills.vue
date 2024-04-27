<script setup lang="ts">
import { ref } from 'vue';
import {ISkill, skillTitle, skillLevel} from '../interfaces/index'
import progressbar  from 'primevue/progressbar';
import Slider from 'primevue/slider';
import Button from 'primevue/button';
import {useUserService} from '../composables/useUserService';

const userService = useUserService()


const props = defineProps<{
    skills:{
        title:skillTitle,
        arr:Array<ISkill>
    },
    progressbar: boolean
}>()

const inAdd = ref<boolean>(false)

const skill = ref<ISkill>({
    name: '',
    level: 1
})


const addSkill = () => {
    inAdd.value = true
}

const saveSkill = (name: string, level:skillLevel, title:skillTitle):void => {
    userService.saveSkill(name, level, title)
    skill.value = {
        name: '',
        level: 1
    }
}


const cancelEdit = () => {
    inAdd.value = false
    skill.value = {
        name: '',
        level: 1
    }
}







</script>
<template>
    <div class="user-skills">
        <div class="user-skills__inner" :class="props.skills.title">
            <h3 class="title">{{props.skills.title}}</h3>
            <ul class="user-skills__list">
                <li class="user-skills__item" v-for="skill, idx in skills.arr" :key="idx">
                    <span class="skill__name">{{skill.name}}</span>
                    <progressbar class="progressbar" 
                                v-if="props.progressbar"
                                :value="20 * skill.level"></progressbar>
                    <Button class="remove-skill__btn" label="x" 
                                :severity="'danger'"
                                @click="userService.removeSkill(idx, skills.title)"/>
                </li>
            </ul>
            <div class="add-skills">
                <div class="add-skills__content" v-if="inAdd">
                    <input class="add-skills__input" type="text" placeholder="Name" 
                            v-model="skill.name">
                    <Slider class="add-skills__slider" 
                            v-if="props.progressbar"
                            aria-label="Level"
                            :step="1" 
                            :min="1"
                            :max="5"
                            v-model="skill.level"/>
                    <Button class="cancel-skill__btn" 
                            :severity="'danger'"
                            :label="'x'" 
                            @click="cancelEdit"/>
                </div>
                <Button class="add-skills__btn" 
                    :label="inAdd ? 'Save' : 'Add Skill'"
                    @click="inAdd ? saveSkill(skill.name, skill.level, skills.title) : addSkill()"
                    :disabled="props.progressbar ? inAdd && (skill.name.length < 3 || skill.level === 1) : inAdd && skill.name.length < 3 " />
            </div>
        </div>
    </div>
</template>
<style scoped>


.user-skills .title{
    letter-spacing: 3px;
}



.user-skills__list,
.add-skills{
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    max-width: 400px;
    margin-bottom: 10px;
}

.add-skills{
    visibility: hidden;
}

.user-skills__inner:hover .add-skills{
    visibility: visible;
}

.user-skills__item,
.add-skills__content{
    position: relative;
    display: grid;
    grid-template-columns: 0.3fr 1fr 40px;
    gap: 5px;
    align-items: center;
}

.Other .add-skills__content{
    display: flex;
}

.add-skills__content:hover 


.skill__name{
    font-style: oblique;
}


.progressbar,
.add-skills__slider{
    height: 6px;
}

.remove-skill__btn{
   visibility: hidden;
   height: 30px;
}


.user-skills__item:hover .remove-skill__btn{
    visibility: visible;
}


.add-skills__btn{
    max-width: 100px;
    height: 30px;
}

.cancel-skill__btn{
    height: 30px;
    width: 40px;
}

.add-skills__input{
    padding: 8px 12px;
    width: 100%;
    outline: none;
    border: 2px solid var(--dark);
    border-radius: 6px;
}

.add-skills__input:focus{
   border: 2px solid var(--primary);
}


.other-skills .user-skills__item{
    grid-template-columns: 0.5fr 40px;
}

.other-skills .skill__name{
    font-style: normal;
    font-weight: 500;
}


:deep(.p-progressbar .p-progressbar-value){
    background: var(--dark);
}

:deep(.p-progressbar .p-progressbar-label){
    display: none;
}

:deep(.p-slider .p-slider-range){
    background-color: var(--primary);
}


</style>