1. 字之间的间距：letter-spacing

2. input里的placeholder的样式修改：input::-webkit-input-placeholder{color:red;font-size:16px}

3. input的边框去掉：input{border：none;}

4. 点击input时，不显示边框：input{outline:none}

5. cursor: text; 呈现 I 字形状。

6.  backface-visibility: hidden;

7. 重新调用定时器失败

8. text-align-last 属性规定如何对齐文本的最后一行。  
注意：text-align-last 属性只有在 text-align 属性设置为 "justify" 时才起作用。

9. text-size-adjust

10. 让行内块元素顶部对齐 ： vertical-aling:top;

11. 在一个块级元素中有几个行内块元素，行内块元素的高度由font-size,line-height撑开，最后的导致父级元素的高度会比子行内块元素高出一点，  
解决方案：将父级的font-size设置为0(父级继承了html的字体大小)。导致问题的具体原因，还不清楚。

12. 在行内元素内，想让容器和字体一样高，可以先把行内元素变成块级元素，再设置字体大小，让后设置行高。

13. 行内块元素之间会出现间距，消除方法。1.給父容器添加`font-size:0`.[更多方法](http://www.zhangxinxu.com/wordpress/2012/04/inline-block-space-remove-%E5%8E%BB%E9%99%A4%E9%97%B4%E8%B7%9D/)

14. ??行内块元素的父级，可能会出现比子元素高的情况，解决办法，可以参照上面的方法。(`font-size:0`)

15. sacc 写css样式，注释中不能带中文???

16. 监听页面滚动条：window.onscorll=function(){
	
	vat t =  document.documentElement.scrollTop || document.body.scrollTop; //滚动条距离顶部的距离  
}

17. 监听浏览器屏幕变化: window.onresize = function(){
	
	var w = document.documentElement.clientWidth; //屏幕宽度
	var h = document.documentElement.clientHeight; //屏幕高度
}

18. 元素距离文档顶端距离:  DOM元素对象.offsetTop 

19. 网页工作区域的高度和宽度: document.documentElement.clientHeight

