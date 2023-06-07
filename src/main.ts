import { createApp } from 'vue'
import '../src/styles/Common.scss'
import App from './App.vue'
import { createPinia } from 'pinia'


const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.mount('#app')