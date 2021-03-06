// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import commonJS from './assets/commonJS/commonJS.js';
import store from './store/store.js';

Vue.config.productionTip = false;


/* eslint-disable no-new */
new Vue({
	el: '#app',
	mixins: [commonJS],
	router,
	store,
	components: { App },
	template: '<App/>'
});