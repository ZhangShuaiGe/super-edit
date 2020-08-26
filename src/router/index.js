import Vue from 'vue';
import VueRouter from 'vue-router';
// import edit from "@/pages/edit.vue";
// import preview from "@/pages/preview.vue";
Vue.use(VueRouter);
const edit = resolve => require(["@/pages/edit.vue"], resolve);//编辑页
const preview = resolve => require(["@/pages/preview.vue"], resolve);//预览页
const process = resolve => require(["@/pages/process/process.vue"], resolve);//预览页
const conditions = resolve => require(["@/pages/process/components/conditions.vue"], resolve);//流程配置

const routes = [
    {
        path: '/',
        name: 'home',
        redirect: '/edit'
    },
    {
        path: '/edit',
        name: 'edit',
        component: edit
    },
    {
        path: '/preview',
        name: 'preview',
        component: preview
    },
    {
        path: '/process',
        name: 'process',
        component: process
    },
    {
        path: '/conditions',
        name: 'conditions',
        component: conditions
    },

];

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
