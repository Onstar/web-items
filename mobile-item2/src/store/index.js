import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const mutations = {
	loginStateChange(state){
		state.loginState=!state.loginState;
	},
	userIdNameChange(state,name){
		state.userIdName = name;
	}
};
const actions = {
//	loginStateChange(state){
//		state.loginState=!state.loginState;
//	},
	userIdNameChange(state,name){
		state.userIdName = name;
	}
};
const state = {
	loginState:false,
	userIdName:"",
};

export default new Vuex.Store({
	state,
  	actions,
 	mutations,
})
