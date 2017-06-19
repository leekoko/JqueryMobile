# K-Cat学院后台页面实战项目  

---

## 1.导航

### 1.导航内容

导航内容栏放左边，再做一个登录退出导航放右边。  

添加下拉框，顺便添加图标，因为下拉框本来是按钮，所以要修改为li变成导航的一部分，再修改为a去掉按钮样式  

```html
<ul class="nav navbar-nav navbar-right">

	<li class="dropdown">
		<!--修改div为li-->
		<a type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
			admin
			<span class="caret"></span>
		</a>
		<!-- 修改button为a -->
		<ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
			<li>
				<a href="index.html"><span class="glyphicon glyphicon-screenshot"></span>&nbsp;&nbsp;前台首页</a>
			</li>
			<li>
				<a href="#"><span class="glyphicon glyphicon-user"></span>&nbsp;&nbsp;个人主页</a>
			</li>
			<li>
				<a href="#"><span class="glyphicon glyphicon-asterisk"></span>&nbsp;&nbsp;个人设置</a>
			</li>
			<li>
				<a href="#"><span class="glyphicon glyphicon-credit-card"></span>&nbsp;&nbsp;账户中心</a>
			</li>
			<li>
				<a href="#"><span class="glyphicon glyphicon-heart"></span>&nbsp;&nbsp;我的收藏</a>
			</li>
		</ul>
	</li>

	<li>
		<a href="#bbs"><span class="glyphicon glyphicon-off"></span>&nbsp;&nbsp;退出</a>
	</li>
</ul>
```

### 2.导航页面    

1. 新建user_list.html,content.html,tag.html三个页面  
2. 修改导航链接，并且添加 ``class="active"``已选项  

效果图：  

![](../image/bs7.png)





---

## 2.网站统计和热帖

将所有的网页内容放在container里的row里面  

### 1.警告框  

警告框的button按钮添加``data-dismiss="alert"``可以把整个警告框关闭  

```html
<!--警告框s-->
<div class="col-md-12">
	<div class="alert alert-danger alert-dismissible fade in" role="alert"> <!--fade in消失动画效果-->
		<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button>
		<h4>网站程序有漏洞，急需修复！</h4>
		<p>当前版本程序(V1.22)存在严重安全问题，容易造成攻击，请即可修复！</p>
		<p>
			<button type="button" class="btn btn-danger">立即修复</button>
			<button type="button" class="btn btn-default" data-dismiss="alert">稍后处理</button>   <!--data-dismiss="alert"点击后，框消失-->
		</p>
	</div>
</div>
<!--警告框e-->
```

### 2.网站统计  

网站统计数据也放在同一个row中

1. 新建一个面板  
2. 往面板的panel-body中添加表格  

```html
<!--网站统计数据e-->
	<div class="col-md-6">   <!--下一行包含在同一个row里面-->
		<div class="panel panel-default">   <!--添加一个面板-->
			<div class="panel-heading">网站统计数据</div>
			<div class="panel-body">
				<table class="table table-hover">   <!--添加表格-->
					<thead>    <!--表头-->
						<tr>
							<th>统计项目</th>
							<th>今日</th>
							<th>昨日</th>
						</tr>
					</thead>
					<tbody>   <!--表格主体-->
						<tr>
							<th scope="row">注册会员</th>
							<td>100</td>
							<td>80</td>
						</tr>
						<tr>
							<th scope="row">登录会员</th>
							<td>1295</td>
							<td>931</td>
						</tr>
						<tr>
							<th scope="row">今日发帖</th>
							<td>1231</td>
							<td>1023</td>
						</tr>
						<tr>
							<th scope="row">转载次数</th>
							<td>1231</td>
							<td>1023</td>
						</tr>
					</tbody>
					
				</table>
			</div>
		</div>
	</div>
<!--网站统计数据e-->
```

### 3.网站热帖  

1. 为了防止边框，去掉panel-body类标签  
2. 添加a链接，添加图标，用small标签添加时间  

```html
<!--网站热帖s-->
	<div class="col-md-6">
		<div class="panel panel-default">
			<div class="panel-heading">网站热帖</div>  <!--为了防止边框，去掉内容区标签-->
				<ul class="list-group">   <!--添加列表组-->
					<li class="list-group-item"><a href="#"><span class="glyphicon glyphicon-list-alt"></span>&nbsp;&nbsp;泛Mooc职业教育， 效果和就业为王<small class="pull-right">2017/06/19</small></a></li>
					<li class="list-group-item"><a href="#"><span class="glyphicon glyphicon-list-alt"></span>&nbsp;&nbsp;泛Mooc职业教育， 效果和就业为王<small class="pull-right">2017/06/19</small></a></li>
					<li class="list-group-item"><a href="#"><span class="glyphicon glyphicon-list-alt"></span>&nbsp;&nbsp;泛Mooc职业教育， 效果和就业为王<small class="pull-right">2017/06/19</small></a></li>
					<li class="list-group-item"><a href="#"><span class="glyphicon glyphicon-list-alt"></span>&nbsp;&nbsp;泛Mooc职业教育， 效果和就业为王<small class="pull-right">2017/06/19</small></a></li>
					<li class="list-group-item"><a href="#"><span class="glyphicon glyphicon-list-alt"></span>&nbsp;&nbsp;泛Mooc职业教育， 效果和就业为王<small class="pull-right">2017/06/19</small></a></li>
					<li class="list-group-item"><a href="#"><span class="glyphicon glyphicon-list-alt"></span>&nbsp;&nbsp;泛Mooc职业教育， 效果和就业为王<small class="pull-right">2017/06/19</small></a></li>
				</ul>
		</div>
	</div>
<!--网站热帖e-->
```

效果图：  

![](../image/bs8.png)

 ---

## 3.今日访问统计图

1. 下载引入chartjs.js文件:http://www.chartjs.org/  
2. 使用栅格化，里面放面板  
3. panel-body中添加画布，画布id设为canvas，并且占面板100%（12格）,引入曲线图插件（放在script.js里面）  

```html
<!--今日访问统计图s-->
	<div class="col-md-6">
		<div class="panel panel-default">
			<!--添加一个面板-->
			<div class="panel-heading">网站统计数据</div>
			<div class="panel-body">
				<canvas id="canvas" class="col-md-12"></canvas>
			</div>
		</div>	
	</div>
<!--今日访问统计图e-->
```

图标数据信息在script.js中修改，注释里面有写，数据的多少在data数组里面修改  

效果图：  

![](../image/bs9.png)

---

## 4.







