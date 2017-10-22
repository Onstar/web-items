<template>
	<div class="Bookshelf_box">
		<div class="head_item">
			<div class="head_sculpture" @click="isLogin">
				<img src="../../img/sculpture.jpg" alt="" />
			</div>
			<router-link to="/Find" class="head_search">
				<i class="iconfont">&#xe641;</i>
			</router-link>
			<div class="head_more">
				<i class="iconfont">&#xe603;</i>
			</div>
		</div>

		<div class="book_shelf">
			<router-link to="/Stackroom" v-if="!books.length">+添加</router-link>
			<ul class="book-shelf" v-if="books.length">
				<v-touch tag="li" class="book-list-wrap" v-for="(book, index) in books" :key="index">
					<v-touch class="book-list" @tap="readbook(book)">
						<div class="read-book-history">
							<img :src="book.cover">
							<div class="info">
								<p class="title">{{book.title}}</p>
								<p class="updated">{{book.lastChapter}}</p>
							</div>
						</div>
						<v-touch class="del-book-btn" @tap="delBook($event,index)">删除</v-touch>
					</v-touch>
				</v-touch>
			</ul>
		</div>

		<!--登录后可以显示的界面-->
		<div class="account_box" v-show="isShowAccount" @click="hidden">
			<div class="bg" @click="stopBubble">
				<div class="account-info">
					<div class="head-sculpture" @tap="showAccount">
						<img src="../../img/sculpture.jpg" alt="" />
					</div>
					<p class="user-name">{{accountName}}</p>
				</div>
				<ul class="account-fun">
					<li>我的消息</li>
					<li>我的收藏</li>
					<li>浏览历史</li>
				</ul>
				<div class="account-bottom">
					<p @click="exit">退出</p>
				</div>

			</div>
		</div>

		<myFooter></myFooter>
	</div>
</template>
<script src="http://files.cnblogs.com/files/zycbloger/vue-resource.min.js"></script>
<script>
	import myFooter from "@/components/myFooter"
	import { Indicator } from 'mint-ui'
	import api from '@/api/api'
	import util from '@/utils/util'
	export default {
		components: {
			myFooter
		},
		data() {
			return {
				isShowAccount: false,
				accountName: "",
				books: []
			}
		},
		methods: {
			gets() {
				this.$http.get('/ranking/gender').then(function(res) {
					console.log(res)
				})
			},
			getBookList() {
				let localShelf = util.getLocalStroageData('followBookList')
				let bookListArray = []
				for(let bookId in localShelf) {
					bookListArray.push(bookId)
				}
				return bookListArray
			},
			getBookUpdate() {
				let localShelf;
				let self = this;
				Indicator.open();
				api.getUpdate(this.getBookList()).then(response => {
					localShelf = util.getLocalStroageData('followBookList')
					response.data.forEach((book) => {
						Object.assign(book, localShelf[book._id])
						book.cover = util.staticPath + book.cover
						self.books.push(book)
					})
					Indicator.close()
				}).catch(err => {
					console.log(err)
					Indicator.close()
				})
			},
			readbook(book) {
//				this.$store.commit(SET_READ_BOOK, book)
//				this.$store.commit(SET_CURRENT_SOURCE, book.source)
				this.$router.push('/readbook/' + book._id)
			},
			isLogin() {
				var self = this;
				if(localStorage.getItem("loginState")) {
					this.showAccount()
				} else {
					self.$router.push("/login")
				}
			},
			loginState() {
				var self = this;
				if(localStorage.getItem("loginState")) {
					this.accountName = localStorage.getItem("userName");
				}
			},
			showAccount() {
				this.isShowAccount = true;
			},
			hidden() {
				this.isShowAccount = false;
			},
			stopBubble(e) {
				window.event ? window.event.cancelBubble = true : e.stopPropagation();
			},
			exit() {
				localStorage.removeItem("loginState");
				this.$store.commit("loginStateChange");
				this.hidden();
			}
		},
		created() {
			this.loginState();
			this.getBookUpdate()
		}
	}
</script>

<style lang="scss" scoped="scoped">
	$sc:50;
	/****begining header*****/
	
	.Bookshelf_box {
		padding-top: 100/$sc+rem;
	}
	
	.head_item {
		position: fixed;
		/*position: absolute;*/
		/*top: 40/$sc+rem;*/
		top: 0;
		left: 0;
		height: 100/$sc+rem;
		width: 100%;
		background-color: #04b1ff;
		.head_sculpture {
			display: inline-block;
			position: absolute;
			left: 32/$sc+rem;
			top: 14/$sc+rem;
			z-index: 10000;
			img {
				width: 72/$sc+rem;
				height: 72/$sc+rem;
				border-radius: 50%;
			}
		}
		.head_search {
			display: inline-block;
			position: absolute;
			left: 580/$sc+rem;
			top: 16/$sc+rem;
		}
		.head_more {
			display: inline-block;
			position: absolute;
			left: 695/$sc+rem;
			top: 16/$sc+rem;
			/*line-height: 100/$sc+rem;*/
		}
		i {
			color: #fff;
		}
	}
	/****ending header*****/
	/** begining book_shelf**/
	
	.book_shelf {
		width: 100%;
		&>a {
			display: block;
			width: 200/$sc+rem;
			height: 100/$sc+rem;
			line-height: 100/$sc+rem;
			text-align: center;
			background-color: blue;
			color: #fff;
			margin: 40% auto;
		}
	}
	
	.book-shelf {
		width: 100vw;
		overflow: hidden;
		box-sizing: border-box;
		padding: 20/$sc+rem 0 0 20/$sc+rem;
	}
	
	.book-list-wrap {
		position: relative;
		height: 200/$sc+rem;
		margin-bottom: 80/$sc+rem;
	}
	
	.book-list {
		position: absolute;
		left: 0;
		width: 140vw;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin-bottom: 8/$sc+rem;
	}
	
	.book-list img {
		height: 200/$sc+rem;
		float: left;
		margin-right: 16/$sc+rem;
	}
	
	.info {
		display: flex;
		flex-direction: column;
		justify-content: center;
		box-sizing: border-box;
		width: 100%;
		height: 200/$sc+rem;
		margin-left: 24/$sc+rem;
		border-bottom: 1px solid #f2f2f2;
		.title {
			font-size: 32/$sc+rem;
		}
	}
	
	.info p {
		margin-top: 8/$sc+rem;
		margin-bottom: 8/$sc+rem;
		font-size: 32/$sc+rem;
	}
	
	.updated {
		color: #6d6666;
		font-size: 32/$sc+rem;
	}
	
	.del-book-btn {
		color: #fff;
		background: red;
		width: 40vw;
		line-height: 200/$sc+rem;
		text-align: center;
	}
	
	.read-book-history {
		display: flex;
		width: 100vw;
	}
	/** ending book_shelf**/
	
	.account_box {
		position: absolute;
		top: 0;
		height: 100vh;
		width: 100vw;
		z-index: 1100;
		background-color: rgba(0, 0, 0, .1);
		.bg {
			height: 100vh;
			width: 82vw;
			background-color: #fff;
			z-index: 1111;
			position: relative;
			.account-info {
				height: 160/$sc+rem;
				/*width:100%;*/
				padding: 40/$sc+rem 28/$sc+rem;
				background: -webkit-linear-gradient(top, #3460cc, #3cb6cc);
				position: relative;
				.head-sculpture {
					display: inline-block;
					position: absolute;
					top: 70/$sc+rem;
					img {
						vertical-align: top;
						width: 100/$sc+rem;
						height: 100/$sc+rem;
						border-radius: 50%;
					}
				}
				.user-name {
					position: absolute;
					top: 80/$sc+rem;
					left: 180/$sc+rem;
					color: #fff;
					font-size: 32/$sc+rem;
				}
			}
			.account-fun {
				width: 100%;
				border-bottom: 2px solid rgb(41, 122, 204);
				&>li {
					height: 100/$sc+rem;
					line-height: 100/$sc+rem;
					padding-left: 80/$sc+rem;
					font-size: 28/$sc+rem;
					border-bottom: 1px solid rgb(242, 242, 242);
					&:last-of-type {
						border: none;
					}
				}
			}
			.account-bottom {
				position: fixed;
				width: 82vw;
				box-sizing: border-box;
				bottom: 0;
				height: 100/$sc+rem;
				padding: 0 28/$sc+rem;
				border-top: 2px solid rgb(242, 242, 242);
				p {
					font-size: 32/$sc+rem;
					line-height: 100/$sc+rem;
					color: rgb(41, 122, 204);
				}
			}
		}
	}
</style>