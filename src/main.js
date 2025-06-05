import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import Toast from 'primevue/toast'
import Breadcrumb from 'primevue/breadcrumb'
import Menu from 'primevue/menu'
import ColumnGroup from 'primevue/columngroup'
import Tooltip from 'primevue/tooltip'

// plugins
import '@/plugin/fontawesome'

// Fontawesome
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const pinia = createPinia()
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
pinia.use(piniaPluginPersistedstate, { persist: true })

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue)
app.use(Toast)
app.use(Breadcrumb)
app.use(Menu)
app.use(ColumnGroup)
app.use(Tooltip)

app.component('AppToast', Toast)
app.directive('Tooltip', Tooltip)
app.component('AppBreadcrumb', Breadcrumb)
app.component('AppMenu', Menu)
app.component('ColumnGroup', ColumnGroup)
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
