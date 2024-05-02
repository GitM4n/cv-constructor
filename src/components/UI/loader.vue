<template>
   
        <div class="loader-block">
            <span class="loader"></span>
            <span class="loader-text">Generating PDF...</span>
         </div>
   
      
 
</template>


<style scoped>

.loader-block{
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: var(--primary);
    z-index: 9999;
 }
 
 
 .loader-text{
    color: var(--white);
    font-size: 1.5rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50% , 110%);
 }
 
 .loader {
    width: 84px;
    height: 84px;
    position: relative;
    display: inline-block;
    overflow: hidden;
    top: 50%;
    left: 50%;
    transform: translate(-50% , -50%);
  }
  .loader:before , .loader:after {
    content: "";
    position: absolute;
    left: 50%;
    bottom: 0;
    width:64px;
    height: 64px;
    border-radius: 50%;
    background:#FFF;
    transform: translate(-50% , 100%)  scale(0);
    animation: push 2s infinite ease-in;
  }
  .loader:after {
  animation-delay: 1s;
  }

  @keyframes push {
    0% {
      transform: translate(-50% , 100%)  scale(1);
    }
    15% , 25%{
      transform: translate(-50% , 50%)  scale(1);
    }
  50% , 75% {
      transform: translate(-50%, -30%) scale(0.5);
    }
  80%,  100% {
      transform: translate(-50%, -50%) scale(0);
    }
}






</style>