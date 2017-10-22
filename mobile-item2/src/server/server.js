//import Vue from "vue";
export default{
	serverLogin(self,name,pwd){
		return self.$http.post(
			"http://localhost/reader-login.php",
			{name:name,pwd:pwd},
			{credentials:false,emulateJSON: true}
		)
	},
	serverRegister(self,name,pwd){
		return self.$http.post(
			"http://localhost/reader-register.php",
			{name:name,pwd:pwd},
			{credentials:false,emulateJSON: true}
		)
	}
}


