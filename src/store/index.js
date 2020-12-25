import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        userCredentials: {}
    },
    mutations: {
        setUserCredentials(state, payload) {
            state.userCredentials = payload
        }
    },
    actions: {
        setUserCredentials(state, payload) {
            state.commit('setUserCredentials', payload);
        }
    },
    modules: {},
    getters: {
        getUserCredentials: state => state.userCredentials
    }
})