import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VScroll from './components/v-scroll'

createApp(App).use(VScroll).use(router).mount('#app')
