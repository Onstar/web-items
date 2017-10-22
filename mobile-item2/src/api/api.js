import Vue from 'vue'

const baseUrl = "http://35.189.165.140:3000";

export default{
	getCategory () {
    	return Vue.http.get(baseUrl+'/cats/lv2/statistics')
  	},
  	getGenuineSource (bookId) {
    	return Vue.http.get(baseUrl+'/book/' + bookId)
  },
  getCategoryDetail () {
    return Vue.http.get(baseUrl+'/cats/lv2')
  },
  getNovelListByCat (gender, type, major, minor = '', start = 0, limit = 20) {
    return Vue.http.get(baseUrl+'/book/by-categories?gender=' + gender + '&type=' + type + '&major=' + major + '&minor=' + minor + '&start=' + start + '&limit=' + limit)
  },
  getBook (bookId) {
    return Vue.http.get(baseUrl+'/book/' + bookId)
  },
  getChapters (sourceId) {
//	console.log(sourceId)
    return Vue.http.get(baseUrl+'/atoc/' + sourceId + '?view=chapters')
  },
  getBookChapterContent (chapterUrl) {
    return Vue.http.get(baseUrl+'/getChapter?chapterUrl=' + chapterUrl)
  },
  getMixSource (bookId) {
    return Vue.http.get(baseUrl+'/atoc?view=summary&book=' + bookId)
  },
  getHotWords () {
    return Vue.http.get(baseUrl+'/book/search-hotwords')
  },
  fuzzySearch (searchWord) {
    return Vue.http.get(baseUrl+'/book/fuzzy-search?query=' + searchWord)
  },
  autoComplete (searchWord) {
    return Vue.http.get(baseUrl+'/book/auto-complete?query=' + searchWord)
  },
  getRankList (id) {
    return Vue.http.get(baseUrl+'/ranking/' + id)
  },
  getUpdate (bookList) {
    return Vue.http.get(baseUrl+'/book?view=updated&id=' + bookList.toString())
  }
}
