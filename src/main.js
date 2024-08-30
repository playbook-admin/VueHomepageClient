// main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router'
import '../public/assets/css/app.css'
import '../public/assets/css/dragAndDrop.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-css-only/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../public/assets/css/animation.css'

const app = createApp(App);
app.use(router); 
app.mount('#app');