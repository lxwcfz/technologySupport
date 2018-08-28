import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/components/contentPage/Index';
import IndexPage from '@/components/indexPage/IndexPage';

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/',
			name: IndexPage,
			component: IndexPage
		},
		{
			path: '/index/:nowMainTitle',
			props: route => ({
				nowMainTitle: route.params.nowMainTitle
			}),
			name: 'Index',
			component: Index,
			children: [
				{
					path: '/index/html/:nowMainTitle',
					props: route => ({
						nowMainTitle: route.params.nowMainTitle
					}),
					name: 'html',
					component: Index
				},
				{
					path: '/index/css/:nowMainTitle',
					props: route => ({
						nowMainTitle: route.params.nowMainTitle
					}),
					name: 'css',
					component: Index
				},
				{
					path: '/index/js/:nowMainTitle',
					props: route => ({
						nowMainTitle: route.params.nowMainTitle
					}),
					name: 'js',
					component: Index
				},
				{
					path: '/index/nodejs/:nowMainTitle',
					props: route => ({
						nowMainTitle: route.params.nowMainTitle
					}),
					name: 'nodejs',
					component: Index
				},
				{
					path: '/index/question/:nowMainTitle',
					props: route => ({
						nowMainTitle: route.params.nowMainTitle
					}),
					name: 'question',
					component: Index
				}
			]
		}
	]
});