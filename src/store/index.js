// @ts-ignore
import { createStore } from 'vuex';

/**
 * initStore.name 为后台传过来的数据
 */
// @ts-ignore
const initStore = global._STORE_STATE_ || {};

export const store =  createStore({
	state() {
		return {
			pageLoading: false
		}
	},
	mutations: {
		/**
		 * 
		 * @param {any} state 
		 * @param {boolean} status 
		 */
		setPageLoading(state, status) {
			state.pageLoading = status;
		}
	},
	getters: {
		/**
		  * 
		  * @param {any} state 
		  * @returns 
		  */
		getPageLoading(state) {
			return state.pageLoading;
		}
	}
});