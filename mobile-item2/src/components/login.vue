<template>
	<div class="login_box">
		<div class="header_item">
			<div class="back" @click="$router.go(-1)">&lt;</div>
			<p class="txt">用户登录</p>
			<p class="sign" @click="$router.push({path:'/sign'})">注册</p>
		</div>
		<div class="login">
			<input type="text" placeholder="用户名" v-model="userName"/>
			<input type="password" placeholder="密码" v-model="userPassword"/>
			<input type="button" value="登录" @click="login"/>
		</div>
	</div>
</template>

<script>
	import {Toast} from "mint-ui"
	import server from "@/server/server"
	import {loginStateChange,userIdNameChange} from "@/store/index"
	export default{
		data(){
			return {
				userName:"",
				userPassword:"",
				uname:"",
				logining:"",
				isExit:false,
			}
		},
		methods:{
			login(){
				var self = this;
				if(this.userName!=""&&this.userPassword!=""){
					self.isExit = false;
					var data = openDatabase('userdata', '1.0', 'userinfo', 2 * 1024 * 1024);
					data.transaction(function(ds){
						ds.executeSql("select * from users where user_name=?",[self.userName],function(re,data){
							var datainfo = data.rows[0];
							if(datainfo){
								self.isExit = true;
								var resPassword = datainfo.user_password;
								if(self.userPassword === resPassword){     //  登录成功了
									Toast({
										message:'登录成功',
										duration:1000,
									})
									setTimeout(function(){
										self.$router.push({path:"/Bookshelf"});
										self.$store.commit("userIdNameChange",datainfo.user_name);
										self.$store.commit("loginStateChange");
										if(window.localStorage){
											localStorage.setItem("userName",datainfo.user_name);
											localStorage.setItem("loginState",self.$store.state.loginState);
										}
									},1000)
								}else{
									Toast({
										message:'密码错误',
										duration:1000,
									})
								}
							}else{
								Toast({
									message:'用户名不存在',
									duration:1000,
								})
							}
							
						})
				})
			}
		}
		
		}
	}
</script>

<style lang="scss" scoped>
$sc:50;
	.login_box{
		width: 100%;
		.header_item{
			height: 100/$sc+rem;
			background-color: #bf2c24;
			position: relative;
			.back{
				display: inline-block;
				margin-left: 30/$sc+rem;;
				line-height: 100/$sc+rem;
				color: #fff;
				width: 32/$sc+rem;
				font-size: 48/$sc+rem;
			}
			.txt{
				display: inline-block;
				font-size: 36/$sc+rem;
				color: #fff;
				margin-left: 220/$sc+rem;
			}
			.sign{
				/*position: absolute;
				left: 10/$sc+rem;
				top:*/
				display: inline-block;
				font-size: 32/$sc+rem;
				color: #fff;
				margin-left: 190/$sc+rem;
			}
		}
		.login{
			width: 100%;
			input{
				display: block;
				width: 80%;
				margin:30/$sc+rem auto ;
				height: 60/$sc+rem;
				outline: none;
				text-indent: 10/$sc+rem;
				&:nth-of-type(3){
					background-color: #bf2c24;
					color: #fff;
					height: 70/$sc+rem;
					line-height: 70/$sc+rem;
					text-align: center;
					border: none;
					font-size: 36/$sc+rem;
					letter-spacing: 40/$sc+rem;
				}
			}
		}
	}
</style>