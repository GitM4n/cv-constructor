<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import EditBlock from './EditBlock.vue';
import type {userTitle} from '../interfaces/index'
import { useUserService } from '../composables/useUserService';


const userService = useUserService()
const user = ref({
    username:{
        title:'username' as userTitle,
        text:userService.user.value.name,
        isEdit: false
    },
    specialization:{
        title:'specialization' as userTitle,
        text:userService.user.value.specialization,
        isEdit: false
    }
})



watch(userService.user.value, (newValue) => {
    user.value.username.text = newValue.name;
    user.value.specialization.text = newValue.specialization;
});


const saveData = (obj:{title:userTitle, text:string, isEdit:boolean} ) => {
    obj.isEdit = false;
    userService.setUserNameOrSpecialization(obj.text, obj.title)
    setTimeout(setWidth, 100)
        
}

const user_spec = ref<HTMLElement>()

const calculateWidth = ref<number>(0)

const setWidth = () => {

    if(user_spec.value){
       if(user.value.specialization.text.length === 19){
           return calculateWidth.value = 210
       }else{
        return calculateWidth.value = user_spec.value.offsetWidth + 60
       }
    }
   
    return calculateWidth.value = 60
}





onMounted(() => {
    setTimeout(setWidth, 500)
 
})

</script>

<template>
    <div class="user-about">
        <div class="user-about__inner">
                <div class="user" :style="{minWidth: calculateWidth + 'px'}">
                    <edit-block 
                        :edit="user.username.isEdit"
                        @save="saveData(user.username)"
                        @edit="user.username.isEdit = true">
                            <template #default>
                                <h3 class="user__fullname" :contenteditable="user.username.isEdit" 
                                    @input="user.username.text = ($event.target as HTMLInputElement).innerText"
                                    >{{user.username.text}}
                                </h3>
                            </template>
                            <template #icon>
                                <i class="pi pi-pen-to-square"></i>
                            </template>
                    </edit-block>
                    <edit-block 
                        class="edit__block_specialization"
                        :edit="user.specialization.isEdit"
                        @save="saveData(user.specialization)"
                        @edit="user.specialization.isEdit = true">
                            <template #default>
                                <small ref="user_spec" class="user__specialization" 
                                        :contenteditable="user.specialization.isEdit" 
                                        @input="user.specialization.text = ($event.target as HTMLInputElement).innerText"
                                >{{user.specialization.text}}</small>
                            </template>
                            <template #icon>
                                <i class="pi pi-pen-to-square"></i>
                            </template>
                </edit-block>
                
                </div>  
        </div>
        
    </div>
</template>

<style scoped>

.user-about__inner{
    display: flex;
    justify-content: center;
}

.user__fullname{
    letter-spacing: 2px;
}
.user__fullname,
.user__specialization{
    display: block;
  
}

.user__fullname{
    font-size: 2rem;
}




.user{

    position: relative;
    text-align: center;
    padding: 15px 20px;
    border: 5px solid var(--dark);
 
 
}



.edit__block_specialization{
    position: absolute;
    bottom:-10px;
    left: 50%;
    transform: translateX(-50%);
  
}

.user__specialization{
    position: relative;
    letter-spacing: 2px;
    font-size: 0.8rem;
    background-color: var(--white);
    text-wrap: nowrap;
    padding:0 5px;
}



.edit-icon {
    color: var(--white);
}


@media (max-width:1200px){
    .user__specialization{
        font-size: 14px;
    }
    .user__fullname{
        font-size: 24px;
    }
}

@media (max-width:500px) {
    .user{
        max-width: 250px;
        border: none;
    }
    .user__specialization{
        background-color: inherit;
    }
}
</style>