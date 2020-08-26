//store.js
import Vue from 'vue';
import Vuex from 'vuex';
import {v4 as uuid} from 'uuid';
import createPersistedState from "vuex-persistedstate";
import process from './process';
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        dragObj: '',//拖拽对象
        dragModel: "", //当前拖拽的组件
        showComponent: true,
        showEditControl: false, //显示编辑
        currentModule: "",//当前编辑的模块
        currentTemplateData: {}, //当前正在编辑的数据
        templateData: {//页面数据
            page: {
                width: 1200,
                height: 1000,
                background: "#fff",
                title: "首页"
            },
            module: [],
            config: {}
        }
    },
    mutations: {
        //公共修改state值
        stateChange(state, data) {
            state[data[0]] = data[1];
        },
        //修改模板配置
        templateDataConfig(state, data) {
            if (data.templateName) {
                state.templateData.config[data.templateName] = Object.assign({}, data.currentTemplateDate);
                // state.templateData.page.height = document.body.scrollHeight;
                // state.currentTemplateData=Object.assign({},data.currentTemplateDate);
            }

            //JSON.parse(JSON.stringify(Object.assign({},JSON.parse(JSON.stringify(data.currentTemplateDate)))))
        },
        //拖动修改
        dragchangetemp(state, data) {
            if (data.templateName) {
                state.templateData.config[data.templateName] = Object.assign({}, data.currentTemplateDate);
                state.currentTemplateData = Object.assign({}, data.currentTemplateDate);
                // state.templateData.page.height = document.body.scrollHeight;
            }
        },
        //添加模板
        templateDataModule(state, data) {
            state.templateData.module = [...state.templateData.module, data]
        },
        //删除模板
        templateDataDelete(state, data) {
            let arr = state.templateData.module.filter((val, key) => {
                return val != data;
            })
            state.templateData.module = [...arr];
            state.currentModule = "";
            state.currentTemplateData = {};
            delete state.templateData.config[data];
        },
        //合并到栅格下，删除model模板,但不删除数据
        dropTemplateDataDelete(state, data) {
            let arr = state.templateData.module.filter((val, key) => {
                return val != data;
            })
            state.templateData.module = [...arr];
        },
        //清除模板和配置
        templateDataClear(state, data) {
            state.templateData = {
                page: {
                    width: 1200,
                    height: 1000,
                    background: "#fff",
                    title: "首页"
                },
                module: [],
                config: {}
            }
        },

    },
    actions: {},
    getters: {
        getModule: state => {
            return state.templateData.module;
        }
    },
    modules:{process},
    plugins: [
        createPersistedState({
            storage: window.localStorage
        })
    ]
});

export default store