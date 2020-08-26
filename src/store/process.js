//store.js
import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);

const process = {
  namespaced: true,
    state: {
      conditionList:[],
      conditionVisible:false,
      thid:'',

    },
    mutations: {
      stateChange(state, data) {
        state[data[0]] = data[1];
    },

    },
    actions: {},
    getters: {
       
    },
    plugins: [
        createPersistedState({
            storage: window.localStorage
        })
    ]
};

export default process