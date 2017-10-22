<template>
	<div class="footer">
		<ul>
			<li @click="$router.push({path:'/Bookshelf'})">
				<i class="iconfont">&#xe600;</i>
				<p>
					<a>书架</a>
				</p>
			</li>
			<li @click="$router.push({path:'/ranklist/weekRank'})">
				<i class="iconfont">&#xe656;</i>
				<p>
					<a>精选</a>
				</p>
			</li>
			<li @click="$router.push({path:'/Stackroom'})">
				<i class="iconfont">&#xe622;</i>
				<p>
					<a>书库</a>
				</p>
			</li>
			<li @click="$router.push({path:'/Find'})">
				<i class="iconfont">&#xe67b;</i>
				<p>
					<a>发现</a>
				</p>
			</li>
		</ul>
		<!--<router-view></router-view>-->
	</div>
</template>

<script>
</script>

<style lang="scss" scoped="scoped">
	$sc:50;
	div.footer {
		position: fixed;
		height: 117/$sc+rem;
		bottom: 0;
		left: 0;
		width: 100%;
		z-index: 999;
		background-color: #fff;
		border: 1px solid #ccc;
		ul {
			height: 100%;
			width: 100%;
			display: flex;
			li {
				list-style: none;
				flex-grow: 1;
				overflow: hidden;
			}
		}
	}
	
	div.footer ul li{
		text-align: center;
		i{
			display: inline-block;
			font-size: 50/$sc+rem;
			margin-top: 13/$sc+rem;
		}
		p{
			&>a{
				display:block;
				color:rgb(154,154,154);
				font-size: 25/$sc+rem;
				line-height: 58/$sc+rem;	
			}
		}
	}
	
</style>