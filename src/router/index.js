import { createRouter, createWebHistory } from "vue-router";
import RegisterPage from "../views/RegisterPage.vue";
import LoginPage from "../views/LoginPage.vue";
import TasksPage from "../views/TasksPage.vue";
import ProfilePage from "../views/ProfilePage.vue";
import ChatsPage from "../views/ChatsPage.vue";
import PersonalProfilePage from "../views/PersonalProfilePage.vue";

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
    component: ProfilePage,
  },
  {
    path: "/chats",
    name: "chats",
    component: ChatsPage,
  },
  {
    path: "/personal-profile",
    name: "personal-profile",
    component: PersonalProfilePage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router
