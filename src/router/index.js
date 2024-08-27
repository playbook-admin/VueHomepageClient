import Albums from "@/views/Albums.vue";
import Home from "@/views/Home.vue";
import LoginOutForm from "@/components/user/LoginOutForm.vue";
import { createRouter, createWebHistory } from "vue-router";
import NotFound from "@/views/NotFound.vue";
// import Home from "@/components/Home.vue";
// import User from "@/components/User.vue";
// import Albums from "@/components/Albums.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
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
