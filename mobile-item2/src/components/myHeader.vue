<template>
	<div class="header">
		<div class="head_top"></div>
		<div class="head_sculpture">
			<img src="../../img/sculpture.jpg" alt="" />
		</div>
	</div>
</template>

<script>
</script>

<style lang="scss" scoped="scoped">
	$sc:50;
	.header{
		position: fixed;
		width: 100%;
		background-color: rgb(51,153,255);
		top: 0;
		height: 140/$sc+rem;
		/*position: relative;*/
		.head_top{
			/*background-color: rgb(51,153,153);*/
			background-color: red;
			height: 40/$sc+rem;
			width: 100%;
		}
		.head_sculpture{
			display: inline-block;
			position: absolute;
			left: 32/$sc+rem;
			top:56/$sc+rem;
			z-index: 10000;
			img {
				width: 72/$sc+rem;
				height: 72/$sc+rem;
				border-radius: 50%;
			}
		}
		
	}
	
	
</style>