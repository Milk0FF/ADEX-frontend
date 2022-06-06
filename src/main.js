import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';

import AuthLayout from './layouts/AuthLayout.vue';
import MainLayout from './layouts/MainLayout.vue';
import NotFoundLayout from './layouts/NotFoundLayout.vue';

import VueClickAway from "vue3-click-away"
const app = createApp(App);

app.component('auth-layout', AuthLayout);
app.component('main-layout', MainLayout);
app.component('not-found-layout', NotFoundLayout);

app.use(VueClickAway);
axios.defaults.baseURL = "http://127.0.0.1:8000/api";

app.use(store).use(router).mount('#app')
