# MUI   

M：MUI是什么东西？

Z：一款专门为手机Web端设计的UI框架。

#### 新建项目

M：怎么新建项目呢？

Z：在HBuilder下，右键--新建移动APP，选择MUI模板即可新建一个包含有js，css等mui资源的完整项目。

![](../image/n01.png)    

Z：这是基本的mui结构，由头部和内容部分构成

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
    <title></title>
    <script src="js/mui.min.js"></script>
    <link href="css/mui.min.css" rel="stylesheet"/>
    <script type="text/javascript" charset="utf-8">
      	mui.init();
    </script>
</head>
<body>
	<!--头部框s -->
	<header class="mui-bar mui-bar-nav">
		<a class="mui-icon mui-action-menu mui-icon-bars mui-pull-left"></a>
		<h1 class="mui-title">test</h1>
	</header>
	<!--头部框e -->
	<!--内容框s -->
	<div class="mui-content">

	</div>
	<!--内容框e -->
</body>
</html>
```

#### 折叠面板

M：怎么实现折叠面板呢？

Z：使用代码

```html
	<!--内容框s -->
	<div class="mui-content">
		<!--折叠面板s-->
		<ul class="mui-table-view">
			<li class="mui-table-view-cell mui-collapse">
				<a class="mui-navigate-right" href="#">面板</a>
				<div class="mui-collapse-content">
					<p>面板1内容</p>
					
				</div>
			</li>
			<li class="mui-table-view-cell mui-collapse">
				<a class="mui-navigate-right" href="#">面板2</a>
				<div class="mui-collapse-content">
					<p>面板2内容</p>
					
				</div>
			</li>
			
		</ul>
		<!--折叠面板e-->
	</div>
	<!--内容框e -->
```

M：那怎么让面板默认打开呢？

Z：添加``.mui-active``即可

```html
<li class="mui-table-view-cell mui-collapse">
```

![](../image/n02.png)  

#### 常用按钮

M：mui的常用按钮有哪些呢？

Z：













https://ke.qq.com/course/203400

http://edu.51cto.com/course/8001.html?source=so

http://edu.51cto.com/course/11637.html?source=so



