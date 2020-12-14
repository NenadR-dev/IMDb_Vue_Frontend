
import VueRouter from "vue-router";
import Home from '../components/Home.vue'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'

const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
        meta: {
            guest: true
        }
    },
    {
        path: "/Login",
        name: "login",
        component: Login,
        meta: {
            guest: true
        }
    },
    {
        path: "/Register",
        name: "register",
        component: Register,
        meta: {
            guest: true
        }
    },
];

const router = new VueRouter({
    mode: 'history',
    routes,
});

// router.beforeEach((to, from, next) => {
//   if (to.meta.guest) {
//     if (getToken()) {
//       return next({ name: 'Home' })
//     } else {
//       return next();
//     }
//   } else {
//     next();
//   }
// })

export default router;