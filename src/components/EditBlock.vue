<script setup lang="ts">
import Button from 'primevue/button';

const props = defineProps<{
    edit: boolean,
}>()

const emit = defineEmits<{
    (e: 'save'): void
    (e: 'edit'): void
}>()
</script>

<template>
    <div class="edit-block" :class="props.edit ? 'is-edit' : ''">
        <div class="edit-block__content" @click="emit('edit')">
            <div class="edit-block__text">
                <slot></slot>
            </div>
            <div class="edit-block__icon">
                <slot name="icon"></slot>
            </div>
        </div>
        <div class="controls">
            <Button class="save-edit" @click="emit('save')">
                <i class="pi pi-check"></i>
            </Button>
        </div>
    </div>
</template>



<style scoped>
.is-edit{
    position: relative;
    display: flex;
   
    column-gap: 5px;
}

.edit-block__content{
    position: relative;
    display: flex;
    flex-direction: column;
  
}



.edit-block__icon{
    display: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.edit-block__text{
    text-wrap: balance;
   overflow-wrap: break-word;
   word-break: break-all;
  
}

.save-edit{
   
    display: flex;
    justify-content: center;
    width: 30px;
    height: 30px;
}

.save-edit i{
    color:#ffffff;
}


.edit-block.is-edit .edit-block__content{
    background-color: rgba(var(--primary-rgb), 0.6);
    padding: 3px;
}



.edit-block:not(.is-edit) .edit-block__content:hover{
    cursor: pointer;
}

.edit-block:not(.is-edit) .edit-block__content:hover .edit-block__text  * {
    color: rgba(var(--dark-rgb), 0.2);
}

.edit-block:not(.is-edit) .edit-block__content:hover .edit-block__icon{
    display: block;
}

.edit-block:not(.is-edit) .save-edit{
    display: none;
}

</style>