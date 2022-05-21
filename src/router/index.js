import { createRouter, createWebHistory } from "vue-router";
import RegisterPage from "../views/RegisterPage.vue";
import LoginPage from "../views/LoginPage.vue";
import TasksPage from "../views/TasksPage.vue";
import UserProfilePage from "../views/UserProfilePage.vue";

const routes = [
  {
    path: "/",
    name: "tasks",
    component: TasksPage,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterPage,
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage,
  },
  {
    path: "/profile",
    name: "profile",
    component: UserProfilePage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router
