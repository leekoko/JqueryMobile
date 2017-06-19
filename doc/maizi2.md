# K-Cat学院后台页面实战项目  

---

## 1.导航

### 1.导航内容

导航内容栏放左边，再做一个登录退出导航放右边。  

添加下拉框，顺便添加图标，因为下拉框本来是按钮，所以要修改为li变成导航的一部分，再修改为a去掉按钮样式  

```html
		        <ul class="nav navbar-nav navbar-right">
		            
					<li class="dropdown">  <!--修改div为li-->
						<a type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					    admin
					    		<span class="caret"></span>
					    </a>  <!-- 修改button为a -->
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
		            
		            <li><a href="#bbs"><span class="glyphicon glyphicon-off"></span>&nbsp;&nbsp;退出</a></li>
		        </ul>
```

### 2.导航页面    

1. 新建user_list.html,content.html,tag.html三个页面  
2. 修改导航链接，并且添加 ``class="active"``已选项  

## 2.











