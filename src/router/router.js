
import VueRouter from "vue-router";
import Home from '../pages/Home.vue'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import Dashboard from '../pages/Dashboard.vue'
import Moviepage from '../pages/Moviepage.vue'
import Movielist from '../pages/Movielist.vue'
import Movieadd from '../pages/MovieAdd.vue'
import TokenService from '../services/TokenService.js'
import Watchlist from '../pages/Watchlist.vue'

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
                component: MovieList
            },
            {
                path: 'movie/:id',
                name: 'moviePage',
                component: MoviePage
            },
            {
                path: 'add',
                name: 'addMoviePage',
                component: MovieAdd
            },
            {
                path: 'watchlist',
                name: 'watchlist',
                component: Watchlist
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
        if (TokenService.getToken()) {
            return next({name: 'movielist'})
        } else {
            return next()
        }
    } else {
        return next()
    }
})

export default router;