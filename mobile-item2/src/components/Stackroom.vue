<template>
	<div class="stackroom_box">
		<div class="head_item">
			<div class="head_title">
				书库
			</div>
			<router-link to="/Find" class="head_search">
				<i class="iconfont">&#xe641;</i>
			</router-link>
		</div>
		<section v-for="(item ,key, index) in category" :key="index" v-if="index<4">
			<p class="category-type" >{{categoryType[key]}}</p>
			<ul>
				<li v-for="(cat, index) in item" :key="index" @click="$router.push({path:'/bookcat/detail',query:{gender:key,major:cat.name}})">
					<p class="category">{{cat.name}}</p>
					<!--<span class="book-count">{{cat.bookCount}}</span>-->
				</li>
			</ul>
		</section>
		<myFooter></myFooter>
	</div>
</template>

<script>
	import api from '@/api/api'
	import myFooter from "@/components/myFooter"
	export default {
		name: 'Booklcat',
		components:{myFooter},
		data() {
			return {
				category: null,
				categoryType: {
					male: '男生',
					female: '女生',
					picture: '漫画',
					press: '出版',
				},
				flag:false,
			}
		},
		created() {
			api.getCategory().then(response => {
				this.category = response.data
				this.loading = false
			}).catch(err => {
				console.log(err)
			})
			
		},
		
	}
</script>

<style lang="scss" scoped="scoped">
	$sc:50;
	active{
		display: block;
	}
	.stackroom_box{
		padding-top:100/$sc+rem;
		padding-bottom: 117/$sc+rem;
	}
	.head_item {
		width: 100%;
		position: fixed;
		/*top: 40/$sc+rem;*/
		top: 0;
		left: 0;
		height: 100/$sc+rem;
		background-color: #04b1ff;
		.head_title {
			position: absolute;
			font-size: 38/$sc+rem;
			top: 25/$sc+rem;
			left: 300/$sc+rem;
			color: #fff;
		}
		.head_search {
			display: inline-block;
			position: absolute;
			left: 580/$sc+rem;
			top: 16/$sc+rem;
		}
	}
	section{
		display: flex;
		flex-wrap: wrap;
		
		&>p{
			width: 100%;
			height: 94/$sc+rem;
			padding: 0 28/$sc+rem;
			line-height: 94/$sc+rem;
			box-sizing: border-box;
		}
		&>ul{
			width: 100%;
			display: flex;
			flex-wrap: wrap;
			border-top: 1px solid #ccc;
			&>li{
				width: 33%;
				height: 88/$sc+rem;
				text-align: center;
				border-right: 1px solid rgb(229,229,229);
				border-bottom: 1px solid rgb(229,229,229);
				.category {
					font-weight: bold;
					font-size: 32/$sc+rem;
					font-weight: normal;
					line-height: 88/$sc+rem;
				}
				.book-count {
					color: #959595;
					font-size: 0.6rem;
				}
			}
		}
	}
</style>