
import VueRouter from "vue-router";
import Home from '../components/Home.vue'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Dashboard from '../components/Dashboard.vue'
import Moviepage from '../pages/Moviepage.vue'
import Movielist from '../pages/Movielist.vue'
import Movieadd from '../pages/Movieadd.vue'
import { getToken } from '../services/AuthService.js'

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
        path: "/",
        component: Dashboard,
        meta: {
            guest: false
        },
        children: [
            {
                path: 'movielist',
                name: 'movielist',
                component: Movielist
            },
            {
                path: 'movie/:id',
                name: 'moviePage',
                component: Moviepage
            },
            {
                path: 'add',
                name: 'addMoviePage',
                component: Movieadd
            }
        ]
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

router.beforeEach((to, from, next) => {
    if (to.meta.guest) {
        if (getToken()) {
            return next({name: 'movielist'})
        } else {
            return next()
        }
    } else {
        return next()
    }
})

export default router;