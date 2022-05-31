import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import AuthLayout from './layouts/AuthLayout.vue';
import MainLayout from './layouts/MainLayout.vue';

const app = createApp(App);

app.component('auth-layout', AuthLayout);
app.component('main-layout', MainLayout);

app.use(store).use(router).mount('#app')
