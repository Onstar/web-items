window.onload = function(){
	var nav = document.querySelector("nav");
	var flashSale = document.getElementById("flashSale");
	var searchTop = document.getElementById("searchTop");
	var ulImg = document.getElementById("img"); 
	var headerItem = document.getElementById("headerItem");
	var liImgs = document.querySelectorAll("#img>li");	//背景图列表li
	var tags = document.querySelectorAll("#tag>li");	//轮播标记li
	var goods = document.getElementById("goodsLis").children;//商品列表ul
	var goodsLis = goods[0].children; //商品li
	var detailLis = document.getElementById("detailBox").children;
	var sections = document.getElementsByTagName("section");
	var asideLeft = document.getElementById("popLeft"); //做侧边栏，弹出框
	var asideBgs = ["rgb(234, 95, 141)","rgb(10, 166, 232)","rgb(100, 195, 51)",
					"rgb(241, 84, 83)","rgb(25, 200, 169)","rgb(0, 0, 0)"
					];
	var asideAlis = asideLeft.querySelectorAll(".popList>a");
	
//	console.log(asideAlis);
	var bgColors = ["#6abb9a","#e8e8e8","#f9f0eb","#e8e8e8","#ffc3d3","#173a74"]
	var fontColors = ["rgb(229,64,119)","rgb(66,125,239)","rgb(99,71,237)","rgb(229,64,119)","rgb(99,71,237)",
					  "rgb(66,125,239)","rgb(250,92,92)","rgb(247,168,49)","rgb(247,168,49)","rgb(66,125,239)",
					  "rgb(221,39,39)","rgb(66,125,239)","rgb(247,168,49)","rgb(59,199,176)","rgb(221,39,39)","rgb(59,199,176)"];
	var num = 0;
	var l =0;
	var inda=0;
	var timer = null;
	var delayer = null;
	var lock = false;
//	console.log(tags)
  /*轮播图 mouseover事件*/
	for(var i=0;i<tags.length;i++){
		tags[i].index=i;
		tags[i].onmouseover=function(){
			clearInterval(timer);
			timer=null;
			for(var j=0;j<tags.length;j++){
				liImgs[j].className="";
				tags[j].style.backgroundColor="#000";
//				headerItem.style.backgroundColor="";
			}
			liImgs[this.index].className="play";
			tags[this.index].style.backgroundColor="#fff";
			headerItem.style.backgroundColor=bgColors[this.index];
			num = this.index;
		}
	}
	
	/*轮播图定时器*/
	function autoPlay(){
		timer=setInterval(function() {
			if(num >= tags.length) {
				num = 0;
			}
//			headerItem.style.backgroundColor=bgColors[num+1];
			for(var i = num; i < tags.length; i++) {
				liImgs[num].className = "";
				liImgs[num].style.transition="";
				tags[num].style.backgroundColor = "#000";
				if(num + 1 < tags.length) {
					liImgs[num+1].style.transition=" all 1s ease";
					headerItem.style.backgroundColor=bgColors[num+1];
					liImgs[num + 1].className = "play";
					tags[num + 1].style.backgroundColor = "#fff";
					
				} else {
					liImgs[0].style.transition=" all 1s ease";
					liImgs[0].className = "play";
					tags[0].style.backgroundColor = "#fff";
					headerItem.style.backgroundColor=bgColors[0];
					
				}
			}
			num++;
		}, 3000)
	}
	
	autoPlay(); //启动定时器
	
	ulImg.addEventListener("mouseover",function(){
		clearInterval(timer);
		timer=null;
	})
	ulImg.addEventListener("mouseout",function(){
		autoPlay();
	})
	
	/*商品分类列表，绑定mouseover事件*/
	for(var i=0;i<goodsLis.length;i++){
		goodsLis[i].index = i;
		
		goodsLis[i].addEventListener("mouseenter",mouseEnter);
		goodsLis[i].addEventListener("mouseleave",mouseLeave);
		
		detailLis[i].addEventListener("mouseenter",function(){
			detailLis[l].className="details";
			goodsLis[l].style.backgroundColor="#fff";
			for(var m=0;m<goodsLis[l].children.length;m++){
					goodsLis[l].children[m].style.color=fontColors[l];
				}
			lock=true;
		});
		detailLis[i].addEventListener("mouseleave",mouseLeave)
	}
	
	/* 侧边栏  */
	
	window.onscroll=function(){
		var h = document.documentElement.clientHeight;
		var t = document.body.scrollTop;	// 滚动条滚动的距离
		
		if(t>nav.offsetTop-h/2){
			asideLeft.style.display="block";
		}else{
			asideLeft.style.display="none";
		}
		if(t>flashSale.offsetTop-h/3){
			searchTop.style.height="50px";
		}else{
			searchTop.style.height="0px";
		}
		if(t>=sections[0].offsetTop-h/2&&t<sections[1].offsetTop-h/2){
			inda =0;
			exslusive(asideAlis,inda,asideBgs);
		}else if(t>=sections[1].offsetTop-h/2&&t<sections[2].offsetTop-h/2){
			inda =1;
			exslusive(asideAlis,inda,asideBgs);
		}else if(t>=sections[2].offsetTop-h/2&&t<sections[3].offsetTop-h/2){
			inda =2;
			exslusive(asideAlis,inda,asideBgs);
		}else if(t>=sections[3].offsetTop-h/2&&t<sections[4].offsetTop-h/2){
			inda =3;
			exslusive(asideAlis,inda,asideBgs);
		}else if(t>=sections[4].offsetTop-h/2&&t<sections[5].offsetTop-h/2){
			inda =4;
			exslusive(asideAlis,inda,asideBgs);
		}else if(t>=sections[5].offsetTop-h/2){
			inda =5;
			exslusive(asideAlis,inda,asideBgs);
		}
	}
	window.onresize=function(){
		var w = document.documentElement.clientWidth; //屏幕宽度
		var h = document.documentElement.clientHeight;
		console.log(w,h);
	}
	
	
	
	//函数封装 begining
	
	function exslusive(obj,ind,tar){
		for(var i=0;i<obj.length;i++){
				obj[i].style.backgroundColor="";
			}
		obj[ind].style.backgroundColor=tar[ind];
	}
	
	function mouseEnter(e){
		var that = this;
			for(var j=0;j<goodsLis.length;j++){
				detailLis[j].className = "details none";
				goodsLis[j].style.backgroundColor="rgba(0,0,0,0.55)";
				for(var k=0;k<goodsLis[j].children.length;k++){
					goodsLis[j].children[k].style.color="#fff";
				}
			}
			detailLis[that.index].className="details";
			goodsLis[that.index].style.backgroundColor="#fff";
			
			for(var m=0;m<goodsLis[that.index].children.length;m++){
					goodsLis[that.index].children[m].style.color=fontColors[that.index];
				}
			l=that.index;
		}
	
	function mouseLeave(){
			detailLis[l].className = "details none";
				goodsLis[l].style.backgroundColor="rgba(0,0,0,0.55)";
				for(var k=0;k<goodsLis[l].children.length;k++){
					goodsLis[l].children[k].style.color="#fff";
				}
		}
}
