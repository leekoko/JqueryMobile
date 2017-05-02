﻿
jqueryMobile基础
===

## 1.html5新特点：  

1. SQLite  小型数据库 ，  index DB  
2. Api的调用   
3. WebSocket 连接通讯
4. canvas三维技术
5. CSS3+js支持

---

## 2.开发移动常用：

1. web响应式开发，无法使用高级功能
2. Natuve app原生态app，性能最好
3. Hybird app混合式开发，性能较差，开发成本很低  
（PhoneGap可以调用底层的APi：h5+phoneGap+jquermobile）

---

## 3.div基础样式：

1. 样式的引用需要CSS&jquery和image  
可以用外部链接的方式

2. 页面模块的声明  
data-role ="page"    说明这是个页面  
（还有header,content,footer 添加之后就会变成相应的模块，listview是一个列表   返回按钮的data-role ="back"） 
id设为page2，然后href="#page2"    因为是同一个html文件，所以用锚进行跳转  
（也可以通过不同文件跳转，只要在url访问demo02.html即可）  

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>简单页面跳转</title>
<!--加速器-->
<link rel="stylesheet" href="https://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.css">
<script src="https://code.jquery.com/jquery-1.11.3.min.js"></script>
<script src="https://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.js"></script>
</head>
<body>
<div data-role="page" id="page">
  <div data-role="header">
  	<h1>第 1 页</h1>
  </div>
  <div data-role="content">
    <ul date-role="listview">
        <li><a href="#page2">第 2 页</a></li>
    </ul>
  </div>
  <div data-role="footer">
  	<h1>页面跳转</h1>
  </div>
</div>

<div data-role="page" id="page2"> 
  <div data-role="header">
  	<h1>第 2 页</h1>
  </div>
  <div data-role="content">
	内容
  </div>
  <div data-role="footer">
  	<h1>页面跳转</h1>
  </div>
</div>
</body>
</html>
```

---

## 4.按钮样式

1. form中用 <button>button按钮</button> ，外面用 <a href="#" data-role="button">按钮</a> 
 
如果要修改表格的外观，需要添加样式：  
表格默认是行元素，修改为块元素添加data-inline="true"  
添加阴影 data-shadow  
添加圆角 data-corner  

添加图标 ： data-icon="arrow-l"（各种图标去搜索）      图标的位置 ：  data-iconpos="top"

2. 使用按钮组,使用controlgroup，其data-type="horizontal"

```html
		<div data-role="controlgroup" data-type="horizontal">
			<a href="#" data-role = "button">首页</a>	
			<a href="#" data-role = "button">介绍</a>	
			<a href="#" data-role = "button">联系</a>		
			<!-- 头尾自动为圆角 --！>
		</div>
```

---

## 5.ListView
在ul中添加 data-role = "listview" 
设置外边距 data-inset= "true"
添加分组标签  <ul data-role = "listview" data-inset= "true">
添加搜索栏  data-filter="true"   添加搜索文本框 data-filter-placeholder="请输入类型"
添加带图列表  	
     <img src="https://www.baidu.com/img/bd_logo1.png">  
     <h2>Baidu</h2>  
     <p>这是一款高级的搜索引擎</p>  
添加数字气泡   <span class="ui-li-count">110</span>

```html
    <ul data-role = "listview" data-inset= "true" data-filter="true" data-filter-placeholder="请输入类型">
    	<li data-role="list-divider">按钮</li>
        <li><a href="#" data-inline="true" data-role="button" data-icon="arrow-u">上</a></li>
        <li><a href="#" data-inline="true" data-role="button" data-icon="arrow-r">右</a></li>
        <li><a href="#" data-inline="true" data-role="button" data-icon="arrow-l" data-iconpos="top">上边左图标</a><span class="ui-li-count">110</span></li>
    </ul>
    
    <ul data-role = "listview" data-inset= "true" >
        <li>
            <a href="#">
            	<img src="https://www.baidu.com/img/bd_logo1.png">
                <h2>Baidu</h2>
                <p>这是一款高级的搜索引擎</p>
            </a>
        </li>
    </ul>
```

---

## 6.表单控件

1. class="ui-hidden-accessible"  隐藏当前lable 
2. data-role="fieldcontain"  让元素有条件在同一行显示

```html
<body>

    <div data-role="page" id="page">
      
        <div data-role="header">
        	<h1>Form表单</h1>
        </div>
        
        <div data-role="content">
        	<form method="post" action="#">
        		<div data-role="fieldcontain">
                	<!--class="ui-hidden-accessible"  隐藏当前lable  -->
                    <label for="search" class="ui-hidden-accessible">搜索：</label>
                    <input type="search" name="search" id="search" placeholder="请输入搜索内容" />
					
                </div>
                <button type="submit" data-inline="true">提交</button>
            </form>
            
            <form method="post" action="#">
				<div data-role="fieldcontain">
                	<!--搜索栏-->
                	<label for="search">搜索：</label>
                    <input type="search" name="search" id="search" placeholder="请输入搜索内容" />
					<!--内容栏-->
                    <label for="info">介绍</label>
                    <textarea id="info" placeholder="请输入经历"></textarea>
                    <!--下拉选择框-->
                    <label for="sel"></label>
                    <select name="day" id="sel">
                    	<option value="" selected>请选择...</option> 
                        <option value="mon" >星期一</option> 	
                        <option value="tue" >星期二</option> 
                        <option value="wed" >星期三</option> 
                    </select>
                    <!--单选按钮-->
                    <fieldset data-role="controlgroup" data-type="horizontal">
                    	<legend>choose your gender:</legend>
                        <label for="boy">boy:</label>
                        <input type="radio" id="boy" name="sex" value="boy">
                        
                        <label for="girl">girl:</label>
                        <input type="radio" id="girl" name="sex" value="girl">
                    </fieldset>
                    <!--多选按钮-->
                    <fieldset data-role="controlgroup" data-type="horizontal">
                    	<legend>choose your gender:</legend>
                        <label for="book">book:</label>
                        <input type="checkbox" id="book" name="book" value="book">
                        
                        <label for="tv">tv:</label>
                        <input type="checkbox" id="tv" name="tv" value="tv">
                    </fieldset>
                    <!--滑块-->
                    <label for="phonts">Points:</label>
                    <input type="range" name="points" id="points" calue="50" min="0" max="100"/>
                    <!--开关-->
                    <label for="switch">开关:</label>
                    <select id="switch" data-role="slider">
                    	<option value="on" selected>on</option>
                    	<option value="off">off</option>
                    </select>
                </div>
                <button type="submit" data-inline="true">提交</button>
            </form>
            
            
        </div>
        
        <div data-role="footer">
        	<h1>页面脚注</h1>
        </div>
      
    </div>

</body>
```




