<template>
	<div class="Book_box">
		<div class="head_item">
			<div class="head_title">
				<p @click="$router.push({path:'/bookcat/detail',query:{gender:book.gender[0],major:book.majorCate}})">&lt;</p>
				<p class="item" v-if="book">{{book.title}}</p>
			</div>
		</div>
		<section>
			<div class="book-info">
				<img v-if="book" :src="imgUrl" onerror="javascript:this.src='https://github.com/zimplexing/vue-nReader/blob/master/screenshot/errBook.png?raw=true'">
				<div class="book-info-detail">
					<p class="book-title" v-if="book">{{book.title}}</p>
					<p class="book-author" v-if="book">{{book.author}}</p>
					<!--<p class="reader-info" v-if="book">
					<!--<span></span>{{book.updated | ago}} | {{wordCount}}万 | {{book.cat}}-->
					<!--</p>-->
				</div>
			</div>
			<div class="book-operation">
				<button class="btn" @click="followAction">{{isFollowed ? '不追了' : '追更新'}}</button>
				<button class="btn" @click="readBook">开始阅读</button>
			</div>
			<div class="book-status">
				<div class="list-item">
					<span class="item">追书人气</span>
					<span v-if="book">{{book.latelyFollower}}</span>
				</div>
				<div class="list-item">
					<span class="item">读者留存率</span>
					<span v-if="book">{{book.retentionRatio}}%</span>
				</div>
				<div class="list-item">
					<span class="item">日更新字数</span>
					<span v-if="book">{{book.serializeWordCount}}</span>
				</div>
			</div>
			<div class="book-tag" v-if="book">
				<span v-for="(tag, index) in book.tags" :key="index" class="tag">{{tag}}</span>
			</div>
			<p class="book-intro" v-if="book">{{book.longIntro}}</p>
			
		</section>
	</div>
</template>

<script>
	import api from '@/api/api'
	//import moment from 'moment'
	import util from '@/utils/util'
//	import {
//	Indicator
//	} from 'mint-ui'
//	import {
//	SET_CURRENT_SOURCE,
//	SET_READ_BOOK
//	} from '@/store/mutationsType'

	//moment.locale('zh-cn')
	export default {
		name: 'Book',
		data() {
			return {
				book: null,
				isFollowed: false,
			}
		},
		//filters: {
		//  ago (time) {
		//    return moment(time).fromNow()
		//  }
		//},
		computed: {
			wordCount() {
				return parseInt(this.book.wordCount / 10000, 10)
			},
			imgUrl() {
				return 'http://statics.zhuishushenqi.com' + this.book.cover
			}
		},
		created() {
			//  Indicator.open()
			// 获取小说详情
			api.getBook(this.$route.params.bookId).then(response => {
				this.book = response.data
				this.isFollowBook()
				//    Indicator.close()
			}, err => {
				console.log(err)
			})
			/**
			 * 设置默认小说源为优质书源
			 */
//			  if (!this.$store.state.source) {
//			  	
//			    api.getMixSource(this.$route.params.bookId).then(response => {
//			    	console.log(response.data)
//			      this.$store.commit(SET_CURRENT_SOURCE, response.data[0]._id)
//			    }).catch(err => {
//			      console.log(err)
//			    })
//			  }
		},
//		beforeRouteEnter(to, form, next) {
//			next(vm => {
//				vm.backStep = form.path.indexOf('readbook') !== -1 ? -3 : -1
//			})
//		},
		//beforeRouteLeave (to, from, next) {
		//  /**
		//		 *  页面离开需要清除source 除了去阅读页面和换源页面
		//		 */
		//  if (to.path.indexOf('changeSource') !== -1 || to.path.indexOf('readbook') !== -1) {
		//    next()
		//  } else {
		//    this.$store.commit(SET_CURRENT_SOURCE, '')
		//    next()
		//  }
		//},
		methods: {
			readBook() {
//				this.$store.commit(SET_READ_BOOK, this.book)
				this.$router.push('/readbook/' + this.$route.params.bookId)
			},
			isFollowBook() {
				// 返回本地是否缓存（加入书架）
				let localShelf = util.getLocalStroageData('followBookList')
				this.isFollowed = !!(localShelf && localShelf[this.book._id])
			},
			followAction() {
				let localShelf = util.getLocalStroageData('followBookList') ? util.getLocalStroageData('followBookList') : {}
				if(this.isFollowed) {
					// 删除该书籍在本地的缓存记录
					delete localShelf[this.book._id]
					// 重新保存
					util.setLocalStroageData('followBookList', localShelf)
					this.isFollowed = !this.isFollowed
				} else {
					// 以bookId为键值，方便后续删除等操作
					localShelf[this.book._id] = {
						cover: this.book.cover,
						title: this.book.title,
//						source: this.$store.state.source
					}
					util.setLocalStroageData('followBookList', localShelf)
					this.isFollowed = !this.isFollowed
				}
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	$sc:50;
	
	.Book_box{
		padding-top:100/$sc+rem;
	}
	.head_item {
		width: 100%;
		position: fixed;
		/*top: 40/$sc+rem;*/
		top: 0;
		left: 0;
		height: 100/$sc+rem;
		background-color: brown;
		.head_title {
			&>p {
				position: absolute;
				top: 16/$sc+rem;
				left: 30/$sc+rem;
				color: #fff;
			}
			&>p.item {
				position: absolute;
				/*top: 16/$sc+rem;*/
				top: 0;
				left: 300/$sc+rem;
				color: #fff;
				font-size: 32/$sc+rem;
				line-height: 100/$sc+rem;
			}
		}
	}
	
	section {
		box-sizing: border-box;
		padding-right: 40/$sc+rem;
		padding-left: 40/$sc+rem;
		padding-bottom: 4/$sc+rem;
		padding-top: 10/$sc+rem;
		width: 100vw;
	}
	
	section:first-child {
		margin-bottom: 40/$sc+rem;
	}
	
	.book-info {
		display: flex;
		flex-direction: row;
		box-sizing: border-box;
		width: 100%;
		height: 200/$sc+rem;
		img {
			width: 160/$sc+rem;
			height: 200/$sc+rem;
		}
		.book-info-detail {
			display: flex;
			flex-direction: column;
			justify-content: center;
		}
		p {
			margin: 0;
			line-height: 60/$sc+rem;
			margin-left: 20/$sc+rem;
			&:nth-of-type(1) {
				font-size: 32/$sc+rem;
			}
			&:nth-of-type(2) {
				font-size: 28/$sc+rem;
			}
		}
	}
	
	.book-operation {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		margin-top: 40/$sc+rem;
		margin-bottom: 40/$sc+rem;
	}
	
	.book-operation .btn {
		width: 320/$sc+rem;
		background: #03a9f4;
		border: none;
		color: #fff;
		font-size: 32/$sc+rem;
		text-align: center;
		line-height: 88/$sc+rem;
		border-radius: 4/$sc+rem;
	}
	
	.book-operation .btn:focus {
		background: #2196f3;
		outline: none;
	}
	
	.book-status {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		flex-wrap: wrap;
		padding-bottom: 40/$sc+rem;
		border-bottom: 1px solid #f2f2f2;
		.list-item {
			display: flex;
			flex-direction: column;
			width: 33%;
			text-align: center;
			.item {
				font-size: 24/$sc+rem;
				color: #807070;
			}
			span {
				font-size: 32/$sc+rem;
			}
		}
	}
	
	.book-tag {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		flex-wrap: wrap;
		padding: 24/$sc+rem 0 0;
		border-bottom: 1px solid #f2f2f2;
		.tag {
			padding: 8/$sc+rem 28/$sc+rem;
			color: #fff;
			border-radius: 4/$sc+rem;
			margin-bottom: 24/$sc+rem;
			font-size: 24/$sc+rem;
			margin-left: 16/$sc+rem;
		}
		.tag:nth-child(1n) {
			background: burlywood;
		}
		.tag:nth-child(2n) {
			background: cadetblue;
		}
		.tag:nth-child(3n) {
			background: coral;
		}
		.tag:nth-child(4n) {
			background: cornflowerblue;
		}
	}
	
	.reader-info,
	.book-author {
		font-size: 28/$sc+rem;
	}
	
	.book-intro {
		margin-top: 40/$sc+rem;
		font-size: 32/$sc+rem;
	}
</style>




