<template>

	<div class="Deatail_box">
		<div class="head_item">
			<div class="head_title">
				<p @click="$router.push({path:'/Stackroom'})">&lt;</p>
				<p class="item">{{major}}</p>
			</div>
		</div>
		<mt-loadmore class="loadmore" :top-method="loadTop" :bottom-method="loadBottom" :auto-fill="false" ref="loadmore">
			<ul class="book-list">
				<Booklist v-for="book in books" :book="book" :key="book._id"></Booklist>
			</ul>
		</mt-loadmore>
	</div>
	
	
</template>

<script>
	import Booklist from "@/components/Booklist"
	import api from '@/api/api'
	import { Indicator } from 'mint-ui'

	export default {
		name: 'BookcatDetail',
		components: {
			Booklist
		},
		data() {
			return {
				books: null,
				type: 'hot',
				gender: '',
				major: '',
				minor: '',
				mins: null,
				majorSelected: 0,
				minorSelected: 0,
				currentPage: 1,
				allLoaded: false,
				types: [{
					type: 'hot',
					name: '热门'
				}, {
					type: 'new',
					name: '新书'
				}, {
					type: 'reputation',
					name: '好评'
				}, {
					type: 'over',
					name: '完结'
				}, {
					type: 'monthly',
					name: '包月'
				}]
			}
		},
		methods: {
			getNovelListByCat(gender, type, major, minor) {
				//				Indicator.open('加载中')
				api.getNovelListByCat(gender, type, major, minor).then(response => {
					//					Indicator.close()
					this.books = response.data.books

				}).catch(err => {
					console.log(err)
				})
			},
			/**
			 * 下拉刷新 
			 */
			loadTop() {
				// 加载更多数据
				this.getNovelListByCat(this.gender, this.type, this.major, this.minor)
				this.$refs.loadmore.onTopLoaded()
			},

			/**
			 * 加载更多
			 */
			loadBottom() {
				// 加载更多数据
				let that = this
				Indicator.open('加载中')
				api.getNovelListByCat(this.gender, this.type, this.major, this.minor, this.currentPage * 20).then(response => {
					that.books = [...that.books, ...response.data.books]
					that.currentPage++
						Indicator.close()
				}).catch(err => {
					console.log(err)
				})
				this.$refs.loadmore.onBottomLoaded()
			}
		},
		beforeRouteEnter(to, from, next) { //vue 中定义的，在进入路由前执行
			next(vm => {
				vm.major = vm.$route.query.major
				vm.gender = vm.$route.query.gender

				/**
				 * 获取大分类中的小类别
				 */
				api.getCategoryDetail().then(response => {
					response.data[vm.$route.query.gender].forEach((type) => {
						if(type.major === vm.$route.query.major) {
							vm.mins = type.mins
						}
					})
				}).catch(err => {
					console.log(err)
				})
				vm.getNovelListByCat(vm.$route.query.gender, vm.type, vm.$route.query.major)
				
				//					    vm.$store.commit(SET_BACK_POSITION, '分类')
			})
		}
	}
</script>

<style lang="scss" scoped="scoped">
	$sc:50;
	.Deatail_box{
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
		z-index: 1000;
		.head_title {
			&>p {
				position: absolute;
				top: 16/$sc+rem;
				left: 30/$sc+rem;
				color: #fff;
			}
			&>p.item {
				position: absolute;
				top: 16/$sc+rem;
				left: 300/$sc+rem;
				color: #fff;
			}
		}
	}
	
	.book-list{
		/*padding-bottom: 117/$sc+rem;*/
	}
	
	
</style>