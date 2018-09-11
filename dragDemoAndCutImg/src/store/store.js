import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		nowTitle: 'drag'
	},
	mutations: {
		changeTitle(state, value) {		//通过store.commit('increment')调用
			state.nowTitle = value;		//store.state.count获取
		}
	}
});