import { App } from 'vue'
import VScroll from './VScroll.vue'

export default {
  install(app: App) {
    app.component('v-scroll', VScroll)
  },
}
