import Albums from "@/views/Albums.vue";
import HomePage from "@/views/HomePage.vue";
import LoginOutForm from "@/components/user/LoginOutForm.vue";
import { createRouter, createWebHistory } from "vue-router";
import NotFound from "@/views/NotFound.vue";
// import HomePage from "@/components/HomePage.vue";
// import User from "@/components/User.vue";
// import Albums from "@/components/Albums.vue";

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: HomePage,
  },
  {
    path: "/user",
    name: "User",
    component: LoginOutForm,
  },
  {
    path: "/albums",
    name: "Albums",
    component: Albums,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
