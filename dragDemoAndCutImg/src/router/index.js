import Vue from 'vue';
import Router from 'vue-router';
import Drag from '@/components/Drag';
import CutImg from '@/components/CutImg';

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/',
			name: 'Drag',
			component: Drag
		},
		{
			path: '/cutImg',
			name: 'CutImg',
			component: CutImg
		}
	]
})
