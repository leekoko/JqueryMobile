# 学院bootstrap实战项目（前台+后台）  

---

## 1.环境配置
1. 设置中文语言：``<html lang="zh-CN">``  
2. IE8开启渲染模式：``<meta http-equiv="x-ua-compatible" content="IE=Edge">``  
3. 视窗的配置：``<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">``  
initial-scale:初试的缩放比例，user-scalable=no:禁止用户缩放比例  
4. 引入jq文件，bootstrap css文件，js文件（使用加速器的方式引入）  
（百度静态网站加载库：http://cdn.code.baidu.com/）  

---

## 2.导航
### 1.结构
1. 固定上方：navbar-fixed-top  
2. 居右显示：ul中添加navbar-right

```html
<!--导航s-->
		<nav class="navbar navbar-default navbar-fixed-top">
		    <div class="container">
		    <div class="navbar-header">
	<!--小屏幕按钮-->
		        <button class="navbar-toggle" data-toggle="collapse"
		                data-target=".navbar-collapse">
		            <span class="sr-only">切换导航</span>
		            <span class="icon-bar"></span>
		            <span class="icon-bar"></span>
		            <span class="icon-bar"></span>
		        </button>
	<!--logo-->
		        <a class="navbar-brand" href="index.html">麦子学院</a>
		    </div>
		    
	<!-- 导航内容-->
		    <div class="collapse navbar-collapse">
		        <ul class="nav navbar-nav navbar-right">
		            <li><a href="index.html">首页</a></li>
		            <li><a href="#">论坛</a></li>
		            <li><a href="#">前端开发</a></li>
		            <li><a href="#">最新课程</a></li>
		            <li><a href="#">移动APP</a></li>
		            <li><a href="#">联系我们</a></li>
		        </ul>
		    </div>
		    </div>
		</nav>
<!--导航e-->
```
### 2.样式  
调整样式的方式：在google浏览器中f12寻找对应的选择器，然后在element.style中调试好之后再写到样式表中  
样式出不来一般是因为等级不够，所以要在看右边哪些被覆盖掉来判断等级  
1. 修改全局字体为微软雅黑  
2. 字体加粗：font-weight: bold;  
3. 设置行高：line-height: 35px;  

```css
.navbar-default .navbar-nav>li>a {
    font-size: 16px;
    font-weight: bold;
    color: #666;
    height: 70px;
    line-height: 35px;
}
.navbar-default .navbar-toggle:focus, .navbar-default .navbar-toggle:hover {
    background: #40d2b1;
    border-color: #40d2b1;
}
.navbar-default .navbar-toggle .icon-bar {
    background-color: #129073;
}
.navbar-toggle{
	margin-top: 18px;
}

```
效果图：  
![](../image/bs1.png)  

---

## 3.第一屏  
### 1.结构
1. section代表的是章节，这里使用section来做模块  
2. 空的栅格化系统可以用来占位置  
3. img要自适应需要添加.img-responsive  
```html
<!--第一屏s-->
		<section id="home">
			<div class="lvjing">
				<div class="row"> <!-- 添加删格系统-->
					<div class="col-md-1"></div>   <!--用来占位置-->
					<div class="col-md-10">
						<h1>bootstrap实战课程等你来战！</h1>
						<p>
							本套课程适用于：1.WEB开发人员；2.网站维护人员、管理人员<br />
							培训技能的目标：使用bootstrap框架快速构建响应式网页，颠覆传统WEB前端！
						</p>
						<img src="images/php.jpg" alt="php" class="img-responsive"/> <!--img-responsive让图片自适应-->
					</div>
					<div class="col-md-1"></div>
				</div>
			</div>
		</section>
<!--第一屏e-->
```  

### 2.样式  
1. 当我们排版文字的时候，常用的有``text-align：center``设置居中  
2. 做透明颜色，使用rgba``background:rgba(0,0,0,0.7); ``  
3. 为了让该元素不受上方元素影响，添加``display: inline-block;``  

```css
#home{
	margin-top: 70px;
	background: url(../images/home-bg.jpg);
	background-size: cover;
/*	height: 500px;*  高度不设，自己填充*/
	
	color: #FFFFFF;  /*文字颜色*/
	text-align: center;  /*文字居中*/
	width: 100%;   /*文字宽度100%*/

}
.lvjing{  /* 建一个滤镜*/
	width: 100%;
	height: 100%;
	background:rgba(0,0,0,0.7);  /*用rgba透明设置背景色*/
	padding: 90px;   /*为文字添加内边距*/
}
#home h1{
	font-weight: bold;
	margin-top: 0;  /*去掉上边距*/
	margin-bottom: 25px;   /*与下边内容拉开距离*/
}
#home p{
	font-weight: 400;
	line-height: 35px;
}
#home img{
	margin-top: 30px;
	display: inline-block;  /*加了之后,前面的内容对后面的排版不会产生影响*/
}
```

效果图：  
![](../image/bs2.png)  

---




