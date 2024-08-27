// main.js
import { createApp } from 'vue';
import App from './App.vue';
import store from './store'; // Adjust the path if necessary
import router from './router'
import '../public/index.css'
import '../public/animation.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-css-only/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const app = createApp(App);
app.use(store).use(router);  // This provides the store globally
app.mount('#app');