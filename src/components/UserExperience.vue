<script setup lang="ts">
import { ref, onMounted } from 'vue';
import EditBlock from './EditBlock.vue';
import InputText from 'primevue/inputtext';
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

onMounted(() => {
    console.log(user.value.experience)
})

</script>

<template>
    <div class="user-exp">
        <div class="user-exp__inner">
            <h2 class="user-exp__title">EXPERIENCE</h2>
            <ul class="user-exp__list">
                <li class="user-exp__item" v-for="exp, idx in experienceList" :key="idx">
                      <edit-block
                                   @save="saveData(exp, idx)"
                                   :edit="exp.isEdit"
                                   @edit="exp.isEdit = true"
                                    >
                          <template #default>
                            <div class="user-exp__content">
                                <h3 class="user-exp__name" :contenteditable="exp.isEdit" 
                                                            @input="exp.title = ($event.target as HTMLElement).innerText">{{exp.title}}</h3>

                            

                                <div class="user-exp__place">
                                    <p class="user-exp__place_value" :contenteditable="exp.isEdit" 
                                                                         @input="exp.place = ($event.target as HTMLElement).innerText">{{exp.place}}</p>
                                    <div class="user-exp__period">
                                        <div class="user-exp__start">
                                            <InputText class="input"  v-model="exp.startDate" v-if="exp.isEdit"/>
                                            <span class="user-exp__start_value" v-else>{{exp.startDate}}</span>
                                        </div>
                                        -
                                        <div class="user-exp__end">
                                            <InputText class="input"  v-model="exp.endDate" v-if="exp.isEdit"/>
                                            <span class="user-exp__end_value" v-else>{{exp.endDate}}</span>
                                        </div>
                                    </div>
                                </div>

                              

                                <p class="user-exp__description" :contenteditable="exp.isEdit"  
                                                                @input="exp.description = ($event.target as HTMLElement).innerText">{{exp.description}}</p>
                            </div>
                          </template>
                          <template #icon>
                              <i class="pi pi-pen-to-square"></i>
                          </template>
                      </edit-block>
                 
                </li>

            </ul>
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


.user-exp__name{
    letter-spacing: 2px;
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
    font-size: 14px;
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

hr{
    margin: 10px 0;
}

</style>