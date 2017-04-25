
jqueryMobile基础
===

## html5新特点：  

1. SQLite  小型数据库 ，  index DB  
2. Api的调用   
3. WebSocket 连接通讯
4. canvas三维技术
5. CSS3+js支持

---

## 开发移动常用：

1. web响应式开发，无法使用高级功能
2. Natuve app原生态app，性能最好
3. Hybird app混合式开发，性能较差，开发成本很低  
（PhoneGap可以调用底层的APi：h5+phoneGap+jquermobile）

---

## div基础样式：

1. 样式的引用需要CSS&jquery和image  
可以用外部链接的方式

2. 页面模块的声明  
data-role ="page"    说明这是个页面  
（还有header,content,footer 添加之后就会变成相应的模块，listview是一个列表）

3. 页面之间的跳转  
因为是同一个html文件，所以用锚进行跳转  
id设为page2，然后href="#page2"  
返回按钮的data-role ="back"

---

## 按钮样式

1. form中用 <button>button按钮</button> ，外面用 <a href="#" data-role="button">按钮</a> 
 
如果要修改表格的外观，需要添加样式：  
表格默认是行元素，修改为块元素添加data-inline="true"  
添加阴影 data-shadow  
添加圆角 data-corner  

2. 使用按钮组,使用controlgroup，其data-type="horizontal"

```html
		<div data-role="controlgroup" data-type="horizontal">
			<a href="#" data-role = "button">首页</a>	
			<a href="#" data-role = "button">介绍</a>	
			<a href="#" data-role = "button">联系</a>		
			<!-- 头尾自动为圆角 --！>
		</div>
```
data-theme样式可以需要主题类型

---








