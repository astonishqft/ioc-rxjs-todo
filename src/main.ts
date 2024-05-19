import './assets/main.css'
import 'reflect-metadata'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import container from '@/config/ioc_config'

const app = createApp(App)

app.provide('todoMVC', container)
app.use(router)

app.mount('#app')
