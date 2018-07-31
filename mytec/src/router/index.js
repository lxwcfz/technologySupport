import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/components/Index';

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/',
			redirect: '/index/0/0'
		},
		{
			path: '/index/:nowMainTitle/:nowTitle',
			name: 'Index',
			component: Index
		}
	]
});