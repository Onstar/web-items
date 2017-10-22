import Vue from 'vue'

export default{
	getCategory () {
    	return Vue.http.get('/cats/lv2/statistics')
  },
}
