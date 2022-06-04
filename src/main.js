import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import AuthLayout from './layouts/AuthLayout.vue';
import MainLayout from './layouts/MainLayout.vue';
import NotFoundLayout from './layouts/NotFoundLayout.vue';
import axios from 'axios';

const app = createApp(App);

app.component('auth-layout', AuthLayout);
app.component('main-layout', MainLayout);
app.component('not-found-layout', NotFoundLayout);

axios.defaults.baseURL = "http://127.0.0.1:8000/api";

app.use(store).use(router).mount('#app')
