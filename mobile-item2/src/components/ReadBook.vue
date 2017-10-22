<template>
	<div id="container" class="container">
		<div class="head_item" v-if="operation">
			<div class="head_title">
				<p @click="$router.push({path:'/book/'+$route.params.bookId})">&lt;</p>
				<!--<p class="item">{{major}}</p>-->
			</div>
		</div>
		<v-touch class="content" @tap="operationAction($event)" :class="{'night-mode':nightMode}">
			<h3>{{bookChaptersContent.title}}</h3>
			<article v-html="bookChaptersBody"></article>
		</v-touch>
		<div class="menu" v-if="operation">
			<v-touch class="menu-btn" v-if="nightMode" @tap="changeMode">
				<img src="../assets/sun.svg">
				<span>日间模式</span>
			</v-touch>
			<v-touch class="menu-btn" @tap="changeMode" v-else>
				<img src="../assets/moon.svg">
				<span>夜间模式</span>
			</v-touch>
			<div class="menu-btn">
				<img src="../assets/setting.svg">
				<span>设置</span>
			</div>
			<v-touch class="menu-btn" @tap="showChapter">
				<img src="../assets/list.svg">
				<span>目录</span>
			</v-touch>
		</div>
		<div class="chapter-list" v-show="isShowChapter" v-scroll="onScroll">
			<div class="chapter-contents">
				<!--<p>{{$store.state.bookInfo.title}}：目录</p>-->
				<v-touch tag="span" class="chapter-sort" @tap="descSort">
					<img src="../assets/down.svg" v-if="!chapterDescSort">
					<img src="../assets/up.svg" v-else>
				</v-touch>
			</div>
			<ul id="chapter-list" v-if="loadedChapters">
				<v-touch tag="li" v-for="(chapter, index) in loadedChapters" :key="index" @tap="jumpChapter(index)">{{chapter.title}}</v-touch>
			</ul>
		</div>
	</div>
</template>

<script>
	import api from '@/api/api'
	import util from '@/utils/util'
	import { Indicator, MessageBox, Toast } from 'mint-ui'
	//
	export default {
		//name: 'ReadBook',
		data() {
			return {
				bookChapter: {},
				bookChaptersContent: '',
				loadedChapters: [], // 缓存滚动加载的章节列表
				loadPages: 1, // 滚动加载的记次
				firstLoad: true, // 首次加载标识符
				operation: false, // 显示操作界面标识符
				currentChapter: 0,
				nightMode: false, // 夜间/日间模式却换
				isShowChapter: false, // 是否显示目录
				chapterDescSort: false, // 是否降序排列
				Statesource: "", //书的sourceID
			}
		},
		computed: {
		  bookChaptersBody () {
		    let content = this.bookChaptersContent && this.bookChaptersContent.cpContent ? 'cpContent' : 'body'
		    return this.bookChaptersContent && this.bookChaptersContent[content].replace(/\n/g, '<br/>&nbsp&nbsp&nbsp&nbsp&nbsp')
		  }
		},
//		beforeCreate () {
//		  Indicator.open('加载中')
//		},
		created() {
			var self = this;
			var promise = new Promise(function(resolve, reject) {
				// 获取 sourceID 
				api.getMixSource(self.$route.params.bookId).then(response => {
					self.Statesource = response.data[0]._id;
					resolve()
					//      console.log(this)
				}).catch(err => {
					console.log(err)
				})
			})
			promise.then(function() {
				let readRecord = util.getLocalStroageData('followBookList')
				api.getChapters(self.Statesource).then(response => {
					self.bookChapter = response.data;
					self.currentChapter = readRecord && readRecord[self.$route.params.bookId] && readRecord[self.$route.params.bookId].chapter ? readRecord[self.$route.params.bookId].chapter : 0
					// 默认取前50章节
					self.loadedChapters = self.bookChapter.chapters.slice(0, 50)
//					Indicator.close()
					self.getBookChapterContent()
				}).catch(err => {
					console.log(self)
					console.log(err)
					    MessageBox.alert('加载失败，请重试').then(() => {
							self.$router.push('/book/' + self.$route.params.bookId)
					    })
				})
			})

		},
//		 mounted () {
//		     let readRecord = util.getLocalStroageData('followBookList');
//		     let scrollTop = readRecord ? readRecord[this.$route.params.bookId].readPos : 0;
//		     if(this.firstLoad && scrollTop){
//		         document.getElementById('container').scrollTop = scrollTop;
//		     }else{
//		         this.firstLoad = false;
//		         document.getElementById('container').scrollTop = 0;
//		     }
//		 },
		///**
		//   * watch 不知道是发生在updated之前还是之后
		//   */
		watch: {
		  'currentChapter': 'getBookChapterContent'
		},
		methods: {
		  getBookChapterContent () {
		    // 不同源之间的章节数量不一样，当前阅读章节与源章节取小的，避免报错
		    let lastChapter = this.currentChapter >= this.bookChapter.chapters.length - 1 ? this.bookChapter.chapters.length - 1 : this.currentChapter
		    Indicator.open('加载中')
		    // 无论正序还是倒叙 当前章节字段都是 按正序的序号
		    api.getBookChapterContent(this.bookChapter.chapters[lastChapter].link).then(response => {
		      /**
		               *  判断是否是正版源，如果是正版，给出换源提示
		               */
		      if (response.data.chapter.cpContent && response.data.chapter.isVip) {
		        MessageBox.alert('章节为正版源，请换源后重试').then(() => {
		          this.$router.push('/changeSource/' + this.$route.params.bookId)
		        })
		      } else {
		        this.bookChaptersContent = response.data.chapter
		        document.getElementById('container').scrollTop = 0
		      }
		      Indicator.close()
		    }).catch(err => {
		      Indicator.close()
		      MessageBox.alert('加载失败，请重试').then(() => {
		        this.$router.push('/book/' + this.$route.params.bookId)
		      })
		      console.log(err)
		    })
		  },
		  operationAction ($event) {
		    // 判断点击位置 执行不同操作
		    let el = $event.pointers[0] || $event.srcEvent
		    if (this.isShowChapter) {
		      this.isShowChapter = false
		      return
		    }
		    let screenHeight = document.body.clientHeight
		    let gap = document.body.clientHeight / 3
		    let targetPos = el.clientY
		    let contanierEle = document.getElementById('container')
		    if (targetPos > 0 && targetPos < gap) {
		      this.operation = false
		      contanierEle.scrollTop -= screenHeight
		    }
		    if (targetPos > gap && targetPos < screenHeight - gap) {
		      this.operation = !this.operation
		    }
		    if (screenHeight - gap < targetPos && targetPos < screenHeight) {
		      this.operation = false
		      // 判断是否到底部
		      if (contanierEle.scrollHeight === contanierEle.scrollTop + screenHeight) {
		        if (this.currentChapter >= this.bookChapter.chapters.length - 1) {
		          Toast('这已经是最新的章节了~')
		          return
		        }
		        // 当前章节加1
		        this.currentChapter += 1
		      }
		      contanierEle.scrollTop += screenHeight
		    }
		  },
		  // 切换日间/夜间模式
		  changeMode () {
		    this.nightMode = !this.nightMode
		  },
		  // 显示目录
		  showChapter () {
		    this.isShowChapter = true
		  },
		  // 点击目录，跳转章节
		  jumpChapter (index) {
		    this.currentChapter = this.chapterDescSort ? this.bookChapter.chapters.length - index - 1 : index
		    this.isShowChapter = false
		    this.operation = false
		  },
		  // 记录阅读历史
//		  recordReadHis () {
//		    let readRecord = util.getLocalStroageData('followBookList') || {}
//		    readRecord[this.$route.params.bookId] = {
//		      cover: this.$store.state.bookInfo.cover,
//		      title: this.$store.state.bookInfo.title,
//		      chapter: this.currentChapter,
//		      source: this.$store.state.source,
//		      readPos: document.getElementById('container').scrollTop
//		    }
//		    util.setLocalStroageData('followBookList', readRecord)
//		  },
		  // 切换章节查看模式
		  descSort () {
		    let bookChapterCount = this.bookChapter.chapters.length
		    document.querySelector('.chapter-list').scrollTop = 0
		    this.chapterDescSort = !this.chapterDescSort
		    this.loadedChapters = this.chapterDescSort
		      ? this.bookChapter.chapters.slice(bookChapterCount - 50, bookChapterCount).reverse()
		      : this.bookChapter.chapters.slice(0, 50)
		    this.loadPages = 1
		  },
		  // 滚动加载到底部，显示更多
		  onScroll: function (e, position) {
		    let bookChapterCount = this.bookChapter.chapters.length
		    if (position.scrollTop > 1300 * this.loadPages) {
		      if (this.chapterDescSort) {
		        this.loadedChapters = this.loadedChapters.concat(this.bookChapter.chapters.slice(bookChapterCount - 50 * (this.loadPages + 1), bookChapterCount - 50 * this.loadPages).reverse())
		      } else {
		        this.loadedChapters = this.loadedChapters.concat(this.bookChapter.chapters.slice(50 * this.loadPages, 50 * (this.loadPages + 1)))
		      }
		      this.loadPages++
		    }
		  },
		  /***
		       * 增加字体
		       */
		  increaseFont () {
		     let articleElem = document.getElementsByTagName('article')[0]
		     articleElem.style.fontSize
		  },
		  /**
		       * 减小字体
		       */
		  decreaseFont () {
		     let articleElem = document.getElementsByTagName('article')[0]
		  }
		},
		/**
		   * 对未加入书架的小说，提示是否加入书架
		   */
//		beforeRouteLeave (to, from, next) {
//		  let readRecord = util.getLocalStroageData('followBookList') || {}
//		  if (!readRecord[this.$route.params.bookId]) {
////		  	console.log(111)
//		    MessageBox.confirm('是否将小说加入书架？').then(() => {
//		    	util.setLocalStroageData('followBookList', readRecord)
////		      this.recordReadHis()
//		      Toast('添加成功！')
//		      next()
//		    }, () => {
//		      next()
//		    })
//		  } else {
//		    	util.setLocalStroageData('followBookList', readRecord)
//		  	
////		    this.recordReadHis()
//		    next()
//		  }
//		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
$sc:50;
	.container {
		/*padding-top: 170/$sc+rem;*/
		background: #dad9d4;
		width: 100vw;
		height: 100vh;
		overflow: auto;
		color: #000;
	}
	
	.head_item {
		width: 100%;
		position: fixed;
		/*top: 40/$sc+rem;*/
		top: 0;
		left: 0;
		height: 100/$sc+rem;
		background-color: #000;
		.head_title {
			&>p {
				position: absolute;
				top: 16/$sc+rem;
				left: 30/$sc+rem;
				color: #F3E7E7;
			}
			&>p.item {
				position: absolute;
				top: 16/$sc+rem;
				left: 300/$sc+rem;
				color: #fff;
			}
		}
	}
	
	.content {
		min-height: 100vh;
	}
	
	article {
		font-size: 36/$sc+rem;
		line-height: 68/$sc+rem;
		padding: 0 40/$sc+rem;
	}
	
	h3 {
		text-align: center;
		margin-top: 0;
		font-size: 38/$sc+rem;
		margin: 0;
		height: 80/$sc+rem;
		line-height: 80/$sc+rem;
	}
	
	.head {
		background: #000;
		color: #f3e7e7;
	}
	
	.menu {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		position: fixed;
		bottom: 0;
		left: 0;
		background: #000;
		height: 117/$sc+rem;
		width: 100vw;
		z-index: 1100;
	}
	
	.menu img {
		color: #fff;
		width: 40/$sc+rem;
		height: 40/$sc+rem;
		align-self: center;
	}
	
	.menu-btn {
		display: flex;
		flex-direction: column;
		justify-content: center;
		color: #f3e7e7;
		text-align: center
	}
	
	.menu-btn i {
		font-size: 64/$sc+rem;
	}
	
	.menu-btn span {
		font-size: 24/$sc+rem;
	}
	
	.arrow-left {
		position: absolute;
		left: 40/$sc+rem;
		line-height: 120/$sc+rem;
		font-size: 60/$sc+rem;
	}
	
	.night-mode {
		background: #383434;
		color: #807d7d;
	}
	
	.chapter-list {
		position: absolute;
		top: 0;
		left: 0;
		height: 100vh;
		overflow: auto;
		background: #fff;
		width: 80vw;
		z-index: 10;
	}
	
	.chapter-list ul {
		margin-top: 100/$sc+rem;
	}
	
	.chapter-list li {
		padding-left: 40/$sc+rem;
		line-height: 80/$sc+rem;
		border-bottom: 1px solid #f2f2f2;
		font-size: 32/$sc+rem;
	}
	
	.chapter-contents {
		position: fixed;
		top: 0;
		left: 0;
		width: 80vw;
		background: #fff;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding-left: 40/$sc+rem;
		box-sizing: border-box;
	}
	
	.chapter-sort {
		margin-right: 60/$sc+rem;
		align-self: center;
	}
	
	.chapter-sort img {
		width: 40/$sc+rem;
		height: 40/$sc+rem;
	}
</style>-->