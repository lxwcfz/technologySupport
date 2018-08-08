import Vue from 'vue';
import Vuex from 'vuex';

import partJS from '../dataBase/articleJS.js';
import partHTML from '../dataBase/articleHTML.js';
import partCSS from '../dataBase/articleCSS.js';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		partJS,
		partCSS,
		partHTML,
		partContent: partJS,
		nowTitle: 0
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