# bootstrap多级菜单   

## 1.基本结构   

```html
	<div class="dropdown">
      
		<a id="dLabel" role="button" data-toggle="dropdown" class="btn btn-default" data-target="#" href="javascript:;">
			下拉多级菜单 <span class="caret"></span>
		</a>
      
		<ul class="dropdown-menu multi-level" role="menu" aria-labelledby="dropdownMenu">
			<li class="dropdown-submenu"><a tabindex="-1" href="javascript:;">总经理</a>
				<ul class="dropdown-menu">
					<li><a tabindex="-1" href="javascript:;">经理1</a></li>
					<li><a tabindex="-1" href="javascript:;">经理2</a></li>
				</ul>
			</li>
			<li class="dropdown-submenu"><a tabindex="-1" href="javascript:;">研发部</a>
				<ul class="dropdown-menu">
					<li><a tabindex="-1" href="javascript:;">主管</a></li>
					<!--<li class="divider"></li>-->
					<li class="dropdown-submenu"><a href="javascript:;">员工</a>
						<ul class="dropdown-menu">
							<li><a href="javascript:;">互    评</a></li>
							<li><a href="javascript:;">不互评</a></li>
						</ul>
					</li>
				</ul>
			</li>
		</ul>
	</div>
```

### 组成元素：  

#### 1.按钮：  

< a > 标签用来实现按钮效果   

 data-toggle  表示数据的展示方式    

#### 2.列表：   

- 第一个< ul >代表所有的项   


- 而嵌套的< li >如果没有结束符，就说明该列下有子项    
- 其可以嵌套多个< li > ,也是放在< ul >下面    


【[源码](../SourceCode/bootstrap/mulMenu.html)】  