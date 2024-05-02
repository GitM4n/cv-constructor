<script setup lang="ts">
import EditBlock from './EditBlock.vue';
import FileUpload from 'primevue/fileupload';
import InputText from 'primevue/inputtext';
import UserNameSpec from './UserNameSpec.vue';
import { useUserService } from '../composables/useUserService';

const props = defineProps<{
    converting: boolean
}>()


const userService = useUserService()

const user = userService.user




</script>

<template>
    <div class="user-card">
        <div class="user-card__before-color" :style="{backgroundColor: 'var(--primary)'}"></div>
        <div class="user-card__inner">
            <div class="user-card__avatar_block">
                <div class="user-card__avatar">
                    <img :src="user.avatar" alt="avatar-none" id="avatar">
                </div>
                <FileUpload 

                            mode="basic" 
                            :class="'custom-upload'"
                            accept="image/*" 
                            :maxFileSize="1000000" 
                            @select="userService.saveAvatar($event.files[0])"
                            >Change</FileUpload>
            </div>
            <UserNameSpec class="isMobile" :class="props.converting ? 'isConverting' : ''"/>
            <ul class="user-card__contacts">
            
               <li class="user-card__contact"  
                    v-for="contact, idx in user.contacts"
                    :key="idx"
                    :class="contact.title">

                    <img class="icon" :src="contact.icon" alt="icon">
                    
                    <div class="desc">
                        <p :class="contact.title+'_title title'"> {{contact.title}}</p>
                        <edit-block 
                            :edit="contact.isEdit"
                            @edit="contact.isEdit = true"
                            @save="userService.saveContacts(contact)">
                                <template #default>
                                    <InputText class="input" v-model="contact.text" v-if="contact.isEdit" />
                                    <span :class="contact.title+'_value'" v-else>{{contact.text}}</span>
                                </template>
                                <template #icon>
                                    <i class="pi pi-pen-to-square"></i>
                                </template>
                        </edit-block>

                    </div>
               </li>
               
            </ul>
        </div>
    </div>
</template>

<style scoped>
.user-card{
    display: flex;
    position: relative;
    padding: 50px 5px 10px 5px;

    
}

.user-card__avatar_block:hover :deep(.custom-upload){
    visibility: visible;
    opacity: 1;
}

.user-card__before-color{
    position: absolute;
    width: 50px;
    padding: 0 5px;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1;
 }

.user-card__inner{
    position: relative;
    width: 100%;
    z-index: 2;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.user-card__avatar_block{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 0 1 50%;
    gap: 20px;
}

.user-card__avatar{
    position: relative;
    width: 150px;
    height: 150px;
}

.user-card__avatar img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
    outline: 5px solid var(--primary);
}

:deep(.custom-upload *){
    color: var(--white);
}

:deep(.custom-upload){
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.4s ease-out;
    padding: 3px 5px;
}

.user-card__contacts{
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.user-card__contacts > li{
    display: flex;
    align-items: center;
    position: relative;
  
}

.user-card__contacts > li .icon{
    position: relative;
    top: 0;
    left: 0;
    z-index: 1;
    width: 30px;
    height: 30px;
    margin: 0 5px;
   
}


.desc{
    display: flex;
    flex-direction: column;
    padding: 0 10px;
    font-size: 1.2rem;
}

.desc .title{
    font-weight: bold;
}

.desc .value{
    font-style: oblique;
}



.input{
    border: none;
    outline: none;
}


.isMobile{
    visibility: hidden;
    width: 0;
    height: 0;
    margin: 20px 0;
}


@media (max-width:990px) {
    .isMobile{
        visibility: visible;
        width: auto;
        height: auto;
    }

    .isMobile.isConverting{
        visibility: hidden;
        width: 0;
        height: 0;
        margin: 20px 0;
    }
}



</style>

