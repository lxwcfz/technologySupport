import Vue from 'vue';
import Vuex from 'vuex';

import partJS from '../assets/dataBase/articleJS.js';
import partHTML from '../assets/dataBase/articleHTML.js';
import partCSS from '../assets/dataBase/articleCSS.js';
import partNODEJS from '../assets/dataBase/articleNodejs.js';
import partQUESTION from '../assets/dataBase/articleQuestion.js';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		partJS,
		partCSS,
		partHTML,
		partNODEJS,
		partQUESTION,
		partContent: partJS,
		nowTitle: 0,
		articles: [
			{
				title: 'HTML系列教程',
				name: 'html',
				address: '/index/html/0',
				class: 'orange',
				imgurl: require('@/assets/materialImg/html.png'),
				status: '...待更新'
			},
			{
				title: 'CSS系列教程',
				name: 'css',
				address: '/index/css/0',
				class: 'blue',
				imgurl: require('@/assets/materialImg/css.png'),
				status: '...待更新'
			},
			{
				title: 'JavaScript忍者秘籍',
				name: 'js',
				address: '/index/js/0',
				class: 'blue',
				imgurl: require('@/assets/materialImg/js.png'),
				status: '--已完结(共13章)--'
			},
			{
				title: 'Node.js核心教程',
				name: 'nodejs',
				address: '/index/nodejs/0',
				class: 'green',
				imgurl: require('@/assets/materialImg/nodejs.png'),
				status: '更新中(1/8)...'
			},
			{
				title: '前端开发常见问题分析',
				name: 'question',
				address: '/index/question/0',
				class: 'blue',
				imgurl: require('@/assets/materialImg/logo.png'),
				status: '...待更新'
			}
		]
	},
	mutations: {
		changeNowTitle(state, num) {		//通过store.commit('increment')调用
			state.nowTitle = parseInt(num);		//store.state.count获取
		},
		changePartContent(state, nowPart) {
			state.partContent = state[nowPart];
		}
	}
});