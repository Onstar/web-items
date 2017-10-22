<template>
	<div class="Search">
		<p @click="back">&lt;</p>
		<input type="text" placeholder="请输入书名或作者名"/>
	</div>
</template>

<script>
	export default{
		methods:{
			back(){
				this.$router.go(-1)
			}
		}
	}
</script>

<style>
	.Search{
		width: 100%;
		height: 100%;
		background-color: #ccc;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 11111;
		overflow-y: hidden;
		&>p{
			font-size: 40/$sc+rem;
			color: #fff;
		}
	}
</style>