import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/components/Index';

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/',
			redirect: '/index/0'
		},
		{
			path: '/index/:nowMainTitle',
			props: (route) => ({
				nowMainTitle: route.params.nowMainTitle
			}),
			name: 'Index',
			component: Index,
			children: [
				{
					path: '/index/html/:nowMainTitle',
					props: (route) => ({
						nowMainTitle: route.params.nowMainTitle
					}),
					name: 'html',
					component: Index
				},
				{
					path: '/index/css/:nowMainTitle',
					props: (route) => ({
						nowMainTitle: route.params.nowMainTitle
					}),
					name: 'css',
					component: Index
				},
				{
					path: '/index/js/:nowMainTitle',
					props: (route) => ({
						nowMainTitle: route.params.nowMainTitle
					}),
					name: 'js',
					component: Index
				}
			]
		}
	]
});