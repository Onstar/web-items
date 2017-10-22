<template>
	<div class="sign_box">
		<div class="header_item">
			<div class="back" @click="$router.go(-1)">&lt;</div>
			<p class="txt">用户注册</p>
			<!--<p class="sign" @click="$router.push({path:'/sign'})">注册</p>-->
		</div>
		<div class="login">
			<input type="text" placeholder="用户名" v-model="newUserName" />
			<input type="password" placeholder="密码" v-model="newUserPassword" />
			<input type="password" placeholder="确认密码" v-model="confirmPassword" />
			<input type="button" value="注册" @click="register" />
		</div>
		<div class="success_info">

		</div>
	</div>
</template>

<script>
	import { Toast } from "mint-ui"
	import server from "@/server/server"
	export default {
		data() {
			return {
				newUserName: "",
				newUserPassword: "",
				confirmPassword: "",
				uname: "",
				isName: false,
				isPwd: false,
				isExit:false,
			}
		},
		watch: {
			newUserName() {
				var reg = /^[\w\u4e00-\u9fa5]{4,16}$/g;
				if(reg.test(this.newUserName)) {
//					console.log("符合")
					this.isName = true;
				} else {
					this.isName = false;
//					console.log("false")
				}
			},
			newUserPassword() {
				var reg = /^[A-Za-z0-9_]{6,20}$/g;
				if(this.confirmPassword === this.newUserPassword && reg.test(this.newUserPassword)) {
					this.isPwd = true;
				} else {
					this.isPwd = false;
				}
			},
			confirmPassword() {
				var reg = /^[A-Za-z0-9_]{6,20}$/g;
				if(this.confirmPassword === this.newUserPassword && reg.test(this.newUserPassword)) {
					this.isPwd = true;
				} else {
					this.isPwd = false;
				}
			}
		},
		methods: {
			register() {
				var self = this;
				if(this.isName && this.isPwd) {
					var data = openDatabase('userdata', '1.0', 'userinfo', 2 * 1024 * 1024);
					data.transaction(function(ts) {
						ts.executeSql("create table if not exists users(user_id,user_name,user_password)", [], function(re, data) {
							//   执行成功
//							console.log("创建表成功");
						}, function(er, mes) {
							//   执行失败
//							console.log("创建失败");
						});
					});
					data.transaction(function(ts){
						ts.executeSql("select * from users where user_name=?",[self.newUserName],function(re,datas){
							self.isExit = true;
							var datainfo = datas.rows[0];
							if(datainfo){
								if(self.newUserName===datainfo.user_name){
									Toast({
										message:'用户名已存在',
										duration:500,
									})
								}
							}else{
								data.transaction(function(ts) {
									ts.executeSql("insert into users(user_name,user_password) values(?,?)", [self.newUserName,self.newUserPassword], function() {
										Toast({
											message: "注册成功!",
											duration: 1000,
										})
										setTimeout(function(){
											self.$router.push({path:"/Bookshelf"});
											self.$store.commit("userIdNameChange",self.newUserName);
											self.$store.commit("loginStateChange");
											if(window.localStorage){
												localStorage.setItem("userName",self.newUserName);
												localStorage.setItem("loginState",self.$store.state.loginState);
											}
										},1000)
									});
								});
							}
						});
//						if(!self.isExit){
//							data.transaction(function(ts) {
//								ts.executeSql("insert into users(user_name,user_password) values(?,?)", [self.newUserName,self.newUserPassword], function() {
//									Toast({
//										message: "注册成功!",
//										duration: 1000,
//									})
//									setTimeout(function(){
//										self.$router.push({path:"/Bookshelf"});
//										self.$store.commit("userIdNameChange",self.newUserName);
//										self.$store.commit("loginStateChange");
//										if(window.localStorage){
//											localStorage.setItem("userName",self.newUserName);
//											localStorage.setItem("loginState",self.$store.state.loginState);
//										}
//									},1000)
//								});
//								self.isExit = false;
//						});
//						}
					});
//					
				}

			}
		}
	}
</script>

<style lang="scss" scoped>
	$sc:50;
	.sign_box {
		width: 100%;
		.header_item {
			height: 100/$sc+rem;
			background-color: #bf2c24;
			position: relative;
			.back {
				display: inline-block;
				margin-left: 30/$sc+rem;
				;
				line-height: 100/$sc+rem;
				color: #fff;
				width: 32/$sc+rem;
				font-size: 48/$sc+rem;
			}
			.txt {
				display: inline-block;
				font-size: 36/$sc+rem;
				color: #fff;
				margin-left: 220/$sc+rem;
			}
			.sign {
				/*position: absolute;
				left: 10/$sc+rem;
				top:*/
				display: inline-block;
				font-size: 32/$sc+rem;
				color: #fff;
				margin-left: 190/$sc+rem;
			}
		}
		.login {
			width: 100%;
			input {
				display: block;
				width: 80%;
				margin: 30/$sc+rem auto;
				height: 60/$sc+rem;
				outline: none;
				text-indent: 10/$sc+rem;
				&:nth-of-type(4) {
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