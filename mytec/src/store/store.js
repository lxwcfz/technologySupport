import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		content: 0
	},
	mutations: {
		increment(state) {		//通过store.commit('increment')调用
			state.count ++;		//store.state.count获取
		}
	}
});