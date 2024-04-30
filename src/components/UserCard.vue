<script setup lang="ts">
import { onMounted } from 'vue';
import EditBlock from './EditBlock.vue';

import InputText from 'primevue/inputtext';
import UserNameSpec from './UserNameSpec.vue';
import { useUserService } from '../composables/useUserService';

const userService = useUserService()

const user = userService.user






onMounted(() => {
    user.value = userService.user.value
    console.log(user.value.contacts[0].icon)
})

</script>

<template>
    <div class="user-card">
        <div class="user-card__before-color" :style="{backgroundColor: 'var(--primary)'}"></div>
        <div class="user-card__inner">
            <div class="user-card__avatar_block">
                <div class="user-card__avatar">
                    <img src="../assets/avatar-none.jpg" alt="avatar-none">
                </div>
            </div>
            <UserNameSpec class="isMobile"/>
            <ul class="user-card__contacts">
            
               <li class="user-card__contact"  
                    v-for="contact, idx in user.contacts"
                    :key="idx"
                    :class="contact.title"
                  
               >
                  
                   <img class="icon" :src="'src/assets/icons/'+contact.icon" alt="icon">
                    
                    <div class="desc">
                        <p :class="contact.title+'_title title'"> {{contact.title}}</p>
                        <edit-block 
                            :edit="contact.isEdit"
                            @edit="contact.isEdit = true"
                            @save="userService.saveContacts(contact)"
                        >
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
    justify-content: center;
    align-items: center;
    flex: 0 1 50%;
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
}

</style>