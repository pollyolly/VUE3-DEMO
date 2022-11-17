import { createApp } from 'vue'
import App from './App.vue'

import './assets/main.css'

const app = createApp(App)
app.mount('#app')
app.config.errorHandler = (err) => {
	console.log(err);
}
