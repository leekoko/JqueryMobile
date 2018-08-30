## CSS3基础

---

工具准备【[CSS3_tools文件夹中](../CSS3_tools)】：  
1. Sublime编辑器  
2. 中文插件：Chinese-Localization-master.zip  
3. CSS3插件：CSS3-master  
4. CSS3API文档：CSS3.0（飘零雾雨版）.chm  

---

### 1.过渡效果  

```html
<head>
	<title>过渡属性</title>
	<style type="text/css">
		div {   		/* 这个是共同的div属性*/
			width: 200px;
			height: 200px;
			background-color: black;   /*初始化为黑色 */
			color: #FFFFFF;   /*字体为白色 */
			text-align: center;    /*字体居中显示 */
		}

		div.d1	{     /*这是各自属性的样式*/
/* ease-in 以慢速开始的过渡效果;   
ease-out 以慢速结束;   
ease-in-out 以慢速开始和结束 */
			transition: background-color 2s ease-in;   
			/* transition-timing-function: ease-in; */

			/* 添加一个大小的过渡属性 */
			transition: width 2s;   /*表示变长过程的时间*/
			transition-delay: 2s;    /*表示停留多久开始执行*/
		}

		div.d2	{
			/* 添加一个颜色的过渡属性 */
			transition: background-color 2s;
			transition-timing-function: ease-out;

			/* 添加一个大小的过渡属性 */
			transition: width 2s;
		}

		p{
			line-height: 200px;
		}

		/* 
			1. 背景色变化：从黑色，过渡到红色（动画：从A到B）。
			2. CSS3 过渡属性。添加到我要操作的元素（选择器）上。


		*/
		div:hover{
			background-color: red;   /*伪类变量，颜色 宽度变化*/
			width: 400px;
		}

	</style>
</head>
<body>
<div class="d1">
	<p>你好啊！</p>
</div>

<div class="d2">
	<p>你好啊！</p>
</div>
</body>

```

[源码](../SourceCode/CssDemo1.html)

---

### 2.照片墙效果  

```html
<head>
	<title>照片墙</title>
	<style type="text/css">
		body {
			background: url(./img/bg.jpg);
			margin: 0;
		}

		.container{
			position: relative;   /*设置为相对定位*/		}

		img {
			width:350px;
			border: 1px solid #fff;   /*设置边框*/
			
			/* css3 新属性：圆角 */
			border-radius: 5px;
			/* css3 新属性：阴影 */
			box-shadow: 5px 5px 5px #333;
			
			padding: 5px;
			background-color: #fff;

			/* 绝对定位 外部div用相对定位，内部图片使用绝对定位*/
			position: absolute;

			/* 过渡属性   纯粹变形，没有颜色变化*/
			transition: all 2s;   
		}

		img.p1{
			/* css3属性：反转：缩放 */
			transform: scale(1) rotate(-30deg);   /*角度的变化*/

			top: 150px;    /*绝对的定位*/
			left: 150px;
		}

		img.p2{
			transform: scale(1) rotate(-10deg);
			top: 150px;
			left: 376px;
		}
		img.p3{
			transform: scale(1) rotate(20deg);
			top: 105px;
			left: 750px;
		}
		img.p4{
			transform: scale(1) rotate(-25deg);
			top: 300px;
			right: 300px;
		}

		img:hover{
			transform: scale(1.5);   /*2D转换*/
			z-index: 99999;    /*为了防止伪类的图片被遮挡，使用z-index*/
		}

	</style>
</head>
<body>
<!-- 
	1. 添加背景图片
	2. 照片添加到内容区域
	3. 给照片添加一些样式
	4. 开始制作动画
		A → B

 -->

<div class="container">    <!--外部包一个相对布局 -->
	<img src="./img/1.jpg" class="p1" alt="..." />	
	<img src="./img/2.jpg" class="p2" alt="..." />	
	<img src="./img/3.jpg" class="p3" alt="..." />	
	<img src="./img/4.jpg" class="p4" alt="..." />	
</div>

</body>

```

要点：  
1. 边距位置通过F12调试调整位置角度，再写到样式表中  
2. 共同的样式写一个属性，个别的另外起属性  

[源码](../SourceCode/CssDemo2.html)  