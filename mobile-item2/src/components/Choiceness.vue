<template>
	<div class="choiceness_box">
		<div class="head_item">
			<router-link to="/Find">
				<div class="inp">
					<input type="text" placeholder="大主宰" />
					<i class="iconfont">&#xe641;</i>
				</div>
			</router-link>
		</div>

		<div class="book-list-wrap">
			<!--<mt-loadmore :bottom-method="loadBottom" ref="loadmore">-->
			<v-touch tag="ul" @swipeleft="swipeleft" @swiperight="swiperight">
				<Booklist v-for="book in rank.books" :book="book" :key="book._id"></Booklist>
			</v-touch>	
			<!--</mt-loadmore>-->
		</div>

		<myFooter></myFooter>
	</div>

</template>

<script>
	import myFooter from "@/components/myFooter"
	import Booklist from '@/components/Booklist'
	import api from '@/api/api'
	import { Indicator } from 'mint-ui'

	export default {
		components: {
			myFooter,
			Booklist
		},
		data() {
			return {
				rank: {},
				books: [],
				ranktype: '',
				rankTypeStack: ['/ranklist/weekRank', '/ranklist/monthRank', '/ranklist/totalRank'],
				currentRank: 0,
				currentLoadPage: 1
			}
		},
		methods: {
			fetchData() {
				Indicator.open()
				switch(this.$route.path) {
					case '/ranklist/weekRank':
						this.rankType = '54d42d92321052167dfb75e3'
						this.currentLoadPage = 0
						break
					
					default:
						this.$router.push('/rank')
						break
				}
				api.getRankList(this.rankType).then(response => {
					this.rank = response.data.ranking
					// 首次加载前20条数据
					this.books = response.data.ranking.books.slice(0, 20)
					Indicator.close()
				}).catch(error => {
					Indicator.close()
					console.log(error)
				})
			},
			swipeleft() {
				if(this.currentRank >= 2) {
					return
				}
				this.currentRank++
					this.$router.push(this.rankTypeStack[this.currentRank])
			},
			swiperight() {
				if(this.currentRank <= 0) {
					return
				}
				this.currentRank--
					this.$router.push(this.rankTypeStack[this.currentRank])
			},
			loadBottom() {
				this.books = this.rank.books.slice(0, this.currentLoadPage * 20 + 20)
				this.currentLoadPage++
			}
		},
		watch: {
			'$route': 'fetchData'
		},
		created() {
			this.fetchData()
		}
	}
</script>

<style lang="scss" scoped="scoped">
	$sc:50;
	.choiceness_box {
		padding-top: 100/$sc+rem;
	}
	
	.head_item {
		width: 100%;
		position: fixed;
		/*top:  40/$sc+rem;*/
		top: 0;
		left: 0;
		height: 100/$sc+rem;
		background: #04b1ff;
		a {
			display: block;
			height: 100/$sc+rem;
			width: 100%;
			.inp {
				width: 338/$sc+rem;
				position: absolute;
				left: 206/$sc+rem;
				top: 22/$sc+rem;
				height: 54/$sc+rem;
				input {
					outline: none;
					border: none;
					border-radius: 4px;
					text-indent: 1rem;
					height: 54/$sc+rem;
					position: absolute;
					top: 0px;
					left: 0px;
					background-color: #fff;
				}
				i {
					position: absolute;
					top: 7px;
					left: 2px;
					font-size: 24/$sc+rem;
					color: #eee;
					text-indent: 5/$sc+rem;
				}
			}
		}
	}
	ul {
	display: flex;
	flex-direction: column;
}

.book-list-wrap {
	width: 100vw;
	/*background: #f2f2f2;*/
	/*margin-top: 4.5rem;*/
	padding-bottom: 117/$sc+rem;
}
</style>