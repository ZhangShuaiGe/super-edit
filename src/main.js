import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store/store.js';
import router from "./router/index.js";
import myPlugin from "./utils/myPlugin.js";
import VueRulerTool from '@/components/EditRulerTool/vue-ruler-tool.vue';
Vue.component('vue-ruler-tool', VueRulerTool);
Vue.use(ElementUI);
Vue.use(myPlugin);
Vue.config.productionTip = false;
Vue.prototype.$store = store;
new Vue({
	store,
	router,
	render: h => h(App),
}).$mount('#app')
