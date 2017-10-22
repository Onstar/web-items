<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
	document.documentElement.style.fontSize=innerWidth/15+"px";
	import myHeader from "@/components/myHeader"
	import myFooter from "@/components/myFooter"
export default {
  name: 'app',
//components:{myHeader,myBody,myFooter}
}
</script>

<style lang="scss">
$sc:50;
html{
 	height: 100%;
 	body{
 		height: 100%;
 	}
 }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;
  color: #2c3e50;
  margin-top: 60px;*/
 box-sizing: border-box;
 height: 100%;
 /*padding-top:140/$sc+rem;*/
 
 padding-bottom: 117/$sc+rem;
}
@font-face {
  font-family: 'iconfont';
  src: url('../fonts/iconfont.eot');
  src: url('../fonts/iconfont.eot?#iefix') format('embedded-opentype'),
  url('../fonts/iconfont.woff') format('woff'),
  url('../fonts/iconfont.ttf') format('truetype'),
  url('../fonts/iconfont.svg#iconfont') format('svg');
}
.iconfont{
  font-family:"iconfont" !important;
  font-size:16px;font-style:normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
/*样式重置*/
body,div,ul,li,p,i,a,input{
	margin: 0;
	padding:0;
}
li{
	list-style: none;
}
a{
	text-decoration: none;
}

</style>
