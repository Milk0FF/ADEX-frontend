import { createRouter, createWebHistory } from "vue-router";
import RegisterPage from "../views/RegisterPage.vue";
import LoginPage from "../views/LoginPage.vue";
import TasksPage from "../views/TasksPage.vue";
import ProfilePage from "../views/ProfilePage.vue";
import ChatsPage from "../views/ChatsPage.vue";
import CustomerChatsPage from "../views/CustomerChatsPage.vue";
import PersonalProfilePage from "../views/PersonalProfilePage.vue";
import CustomerTasksPage from "../views/CustomerTasksPage.vue";

import guest from './middleware/guest';
import auth from './middleware/auth';
import customer from './middleware/customer';
import executor from './middleware/executor';

const routes = [
  {
    path: "/",
    name: "tasks",
    component: TasksPage,
    meta:{
      middleware: executor,
    }
  },
  {
    path: "/register",
    name: "register",
    component: RegisterPage,
    meta:{
      layout: 'auth-layout',
      middleware: auth,
    }
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage,
    meta:{
      layout: 'auth-layout',
      middleware: auth,
    }
  },
  {
    path: "/profile",
    name: "profile",
    component: ProfilePage,
    meta:{
      middleware: guest,
    }
  },
  {
    path: "/chats",
    name: "chats",
    component: ChatsPage,
    meta:{
      middleware: executor,
    }
  },
  {
    path: "/personal-profile",
    name: "personal-profile",
    component: PersonalProfilePage,
    meta:{
      middleware: guest,
    }
  },
  {
    path: "/tasks",
    name: "customer-tasks",
    component: CustomerTasksPage,
    meta:{
      middleware: customer,
    }
  },
  {
    path: "/customer-chats",
    name: "customer-chats",
    component: CustomerChatsPage,
    meta:{
      middleware: customer,
    }
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Creates a `nextMiddleware()` function which not only
// runs the default `next()` callback but also triggers
// the subsequent Middleware function.
function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index];
  // If no subsequent Middleware exists,
  // the default `next()` callback is returned.
  if (!subsequentMiddleware) return context.next;

  return (...parameters) => {
    // Run the default Vue Router `next()` callback first.
    context.next(...parameters);
    // Then run the subsequent Middleware with a new
    // `nextMiddleware()` callback.
    const nextMiddleware = nextFactory(context, middleware, index + 1);
    subsequentMiddleware({ ...context, next: nextMiddleware });
  };
}

router.beforeEach((to, from, next) => {
  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware)
      ? to.meta.middleware
      : [to.meta.middleware];

    const context = {
      from,
      next,
      router,
      to,
    };
    const nextMiddleware = nextFactory(context, middleware, 1);

    return middleware[0]({ ...context, next: nextMiddleware });
  }

  return next();
});
  
export default router
