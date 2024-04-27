import { createApp } from 'vue'
import 'primevue/resources/themes/aura-light-green/theme.css'
import 'primeicons/primeicons.css'
import './style.css'
import PrimeVue from 'primevue/config'
import App from './App.vue'



const app = createApp(App);

app.use(PrimeVue)
app.mount('#app')
