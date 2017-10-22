<template>
	<div>
		<div class="search-head">
			<span class="search-icon">
				<img src="../assets/search.svg">
			</span>
			<input type="text" class="search-input" placeholder="输入书名或者作者名" @input="autoComplete" @keyup.enter="fuzzySearch" v-model="searchWord">
		</div>
		<!--显示热搜词与搜索历史（优先级最低）-->
		<div v-if="!searchWord" class="search-info">
			<ul class="search-word" v-if="searchHotWords">
				<v-touch tag="li" class="search-hot-word" v-for="(searchHotWord, index) in searchHotWords" :key="index" @tap="fuzzySearch">
					{{searchHotWord.word}}
				</v-touch>
			</ul>
			<div class="search-history">
				<div class="fun-bar">
					<span>搜索历史</span>
					<v-touch @tap="clearSearchHistory">
						<img src="../assets/trash.svg">
					</v-touch>
				</div>
				<ul class="history-list">
					<v-touch tag="li" v-for="(history, index) in searchHistory" :key="index" @tap="fuzzySearch">{{history}}</v-touch>
				</ul>
			</div>
	
		</div>
	
		<!--显示自动补全（优先级最高）-->
		<ul class="auto-complete-list" v-if="autoCompleteList.length && searchWord">
			<v-touch tag="li" v-for="(item, index) in autoCompleteList" :key="index" @tap="fuzzySearch">
				{{item}}
			</v-touch>
		</ul>
		<!--显示搜索结果（优先级中）-->
		<ul class="search-result" v-if="searchResult.length">
			<Booklist v-for="book in searchResult" :book="book" :key="book._id"></Booklist>
		</ul>
		<myFooter></myFooter>
	</div>
</template>

<script>
import api from '@/api/api'
import Booklist from '@/components/Booklist'
import util from '@/utils/util'
import myFooter from "@/components/myFooter"
import {
  Indicator
} from 'mint-ui'
//import {
//SET_BACK_POSITION
//} from '@/store/mutationsType'

export default {
components:{myFooter},
  name: 'Search',
  components: {
    Booklist,myFooter
  },
  data () {
    return {
      searchWord: '',
      searchHotWords: null,
      autoCompleteList: [],
      searchResult: [],
      searchHistory: []
    }
  },
//computed: {
//  back () {
//    return this.$store.state.backPath.secPath
//  }
//},
  created () {
    this.searchHistory = util.getLocalStroageData('searchHistory') ? util.getLocalStroageData('searchHistory') : []
    api.getHotWords().then(response => {
      this.searchHotWords = response.data.searchHotWords
      // 只取前15个热词
      this.searchHotWords.length = 15
    }).catch(err => {
      console.log(err)
    })
  },
  watch: {
    'searchWord': function () {
      if (!this.searchWord) {
        this.autoCompleteList = []
        this.searchResult = []
        this.searchHistory = util.getLocalStroageData('searchHistory') ? util.getLocalStroageData('searchHistory')
					: []
      }
    }
  },
  methods: {
    autoComplete () {
      api.autoComplete(this.searchWord).then(response => {
        this.autoCompleteList = response.data.keywords
      }).catch(err => {
        console.log(err)
      })
    },
    /**
		 * 模糊搜索
		 * todo 问题： 点击热词或者搜索历史进行搜索时，自动填充输入框值后，会触发自动补全，自动补全是异步的，搜索结果也是异步的
		 * 当自动补全请求慢于搜索结果返回时，页面上会出现自动补全的列表
		 * fixed 使用input事件触发自动补全 不要监听searchWorld的变化，触发自动补全
		 */
    fuzzySearch (el) {
      Indicator.open()
      this.searchWord = el.target.innerText || this.searchWord
      // 设置搜索历史
      let searchHistory = util.getLocalStroageData('searchHistory') ? util.getLocalStroageData('searchHistory') : []
      util.setLocalStroageData('searchHistory', [this.searchWord, ...searchHistory])
//    this.$store.commit(SET_BACK_POSITION, '搜索')
      api.fuzzySearch(this.searchWord).then(response => {
        this.searchResult = response.data.books
        this.autoCompleteList = []
        Indicator.close()
      }).catch(err => {
        console.log(err)
      })
    },
    clearSearchHistory () {
      util.setLocalStroageData('searchHistory', [])
      this.searchHistory = []
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
$sc:50;
.search-head {
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100/$sc+rem;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	box-sizing: border-box;
	padding: 0 40/$sc+rem;
	background: #04b1ff;
}

.search-info {
	width: 100vw;
}

.search-input {
	width: 100%;
	line-height: 64/$sc+rem;
	padding-left: 72/$sc+rem;
	border-radius: 8/$sc+rem;
	border: none;
}

.search-input:focus,
.cancel:focus {
	outline: none;
}


.search-word {
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	flex-wrap: wrap;
	margin-top: 120/$sc+rem;
	border-bottom: 1px solid #f2f2f2;
}

.search-hot-word {
	font-size: 24/$sc+rem;
	padding: 8/$sc+rem 24/$sc+rem;
	border: 1px solid #f2f2f2;
	border-radius: 32/$sc+rem;
	margin-left: 20/$sc+rem;
	margin-bottom: 20/$sc+rem;
}

.search-hot-word:active {
	background: #f2f2f2;
}

.auto-complete-list {
	display: flex;
	flex-direction: column;
	margin-top: 100/$sc+rem;
	width: 100vw;
}

.auto-complete-list li {
	padding-left: 60/$sc+rem;
	line-height: 80/$sc+rem;
	border-bottom: 1px solid #f2f2f2;
	font-size: 32/$sc+rem;
}

.auto-complete-list li:active {
	background: #f2f2f2;
}

.search-result {
	display: flex;
	flex-direction: column;
	margin-top: 100/$sc+rem;
	width: 100vw;
	background: #f2f2f2;
}

.search-icon img {
	position: absolute;
	left: 64/$sc+rem;
	line-height: 140/$sc+rem;
	width: 20px;
	top: 30/$sc+rem;
}

.search-history {
	padding: 40/$sc+rem
}

.search-history .fun-bar {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin-bottom: 20/$sc+rem;
	line-height: 40/$sc+rem;
	font-size: 28/$sc+rem;
	color: #515151;
}

.search-history .fun-bar img {
	width: 32/$sc+rem;
	height: 40/$sc+rem;
	vertical-align: middle;
}

.history-list li {
	line-height: 60/$sc+rem;
	font-size: 28/$sc+rem;
	border-bottom: 1px solid #f2f2f2;
	color: #a08787;
}
</style>
