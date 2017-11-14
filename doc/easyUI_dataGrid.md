# EasyUI DataGrid

## 1. add-嵌入代码

```javascript
function add(){
  var grid = getGridObject();
	var diag = promptWin();
		diag.Title = "新增社有资本经营预算支出明细";
  		diag.Width = 1100;
		diag.Height = 300;
	   diag.ShowOkButton = true;
	   var url  = projectPath + "/clubCapitalExpendDetail/addClubCapitalExpendDetail";
  		diag.OKEvent = function(){
        var success = diag.innerFrame.contentWindow.saveInfo();
        if(success){
				promptAlert(SAVE_SUCCESS_MSG);
        	getGridObject().loadData();
        	diag.close();  //窗口关闭
        }else{
        	promptAlert(SAVE_FAIL_MSG);
        }
    	};
	   diag.URL = url;
      diag.show();
      diag.max();
}
```

1. 跳转到前端页面，设置type

`` var type = "add";``   

`` var url  = projectPath + "/clubCapitalIncome/addClubCapitalIncome?type="+type;``     

controller:``return "modules/supply/clubCapitalIncome/addClubCapitalIncome";``

## 2.前端显示列表

```html
	  <table id="proReve" class="easyui-datagrid" title="一、利润收入:" style="width:100%;height:250px">
		<thead>
			<tr>
			    <th data-options="field:'code',width:50,checkbox:true"></th>
			    <th data-options="field:'budgetAccount',width:100,align:'center',editor:{type:'validatebox',options:{required:true}}">预算科目</th>
			    <th data-options="field:'entpName',width:100,align:'center',editor:{type:'combobox',options:{required:true,editable:false,valueField:'dictKey',textField:'dictValue',url:'${ctx}/entpPerson/getEntpList',panelHeight:'auto'}}">科目名称</th>
			    <c:if test="${type=='add' }">
			    <th data-options="field:'annualActualAmount',width:120,align:'center',editor:{type:'validatebox',options:{required:true}}">${year }年度执行数</th>
			    <th data-options="field:'annualBudgetAmount',width:120,align:'center',editor:{type:'validatebox',options:{required:true}}">${year }年度预算数</th>
			    <th data-options="field:'ratio',width:180,align:'center'">完成率(执行数/预算数*100%)</th>
				</c:if>
				<c:if test="${type=='edit' }">
				<th data-options="field:'annualActualAmount',width:120,align:'center',editor:{type:'validatebox',options:{required:true}}">${clubCapitalIncome.cyear }年度执行数</th>
			    <th data-options="field:'annualBudgetAmount',width:120,align:'center',editor:{type:'validatebox',options:{required:true}}">${clubCapitalIncome.eyear }年度预算数</th>
			    <th data-options="field:'ratio',width:180,align:'center'">完成率(执行数/预算数*100%)</th>
				</c:if>
			    <th data-options="field:'tsm1',width:60,align:'center',editor:{type:'validatebox',options:{required:true}}">月份</th>
			</tr>
		</thead>
	</table>
```

#### 1. type用来判断不同情况下显示不同的列

#### 2.每一列的内容配置

1. 多选框   

   ``<th data-options="field:'code',width:50,checkbox:true"></th>``   

2. 一般配置   

   ``<th data-options="field:'budgetAccount',width:100,align:'center',editor:{type:'validatebox',options:{required:true}}">预算科目</th> ``   

   - **type** : combobox为下拉框   
   - **添加字典** ：``valueField:'dictKey',textField:'dictValue',url:'${ctx}/entpPerson/getEntpList'``    
   - ​

#### 3.内容初始化

```javascript
	var dataGrid1=null;
	var dataGrid2=null;
	var dataGrid3=null;
	var dataGrid4=null;
	var dataGrid5=null;
	$(function(){
        <c:choose>
        <c:when test='${type eq "view"}'>
	        var setting1 = {"dataGridId":"proReve","dataUrl":"${ctx}/clubCapitalIncome/getClubCapitalIncome?code=${code}&typ=proReve","isClickRow":true,"isView":true,"isRow":true,"column":["entpName","annualActualAmount","annualBudgetAmount","ratio"]};
	        dataGrid1 = new MDdataGrid(setting1);
	        dataGrid1.init();
	        var setting2 = {"dataGridId":"income","dataUrl":"${ctx}/clubCapitalIncome/getClubCapitalIncome?code=${code}&typ=income","isClickRow":true,"isView":true,"isRow":true,"column":["entpName","annualActualAmount","annualBudgetAmount","ratio"]};
	        dataGrid2 = new MDdataGrid(setting2);
	        dataGrid2.init();
	        var setting3 = {"dataGridId":"tranIncome","dataUrl":"${ctx}/clubCapitalIncome/getClubCapitalIncome?code=${code}&typ=tranIncome","isClickRow":true,"isView":true,"isRow":true,"column":["entpName","annualActualAmount","annualBudgetAmount","ratio"]};
	        dataGrid3 = new MDdataGrid(setting3);
	        dataGrid3.init();
	        var setting4 = {"dataGridId":"lionIncome","dataUrl":"${ctx}/clubCapitalIncome/getClubCapitalIncome?code=${code}&typ=lionIncome","isClickRow":true,"isView":true,"isRow":true,"column":["entpName","annualActualAmount","annualBudgetAmount","ratio"]};
	        dataGrid4 = new MDdataGrid(setting4);
	        dataGrid4.init();
	        var setting5 = {"dataGridId":"restIncome","dataUrl":"${ctx}/clubCapitalIncome/getClubCapitalIncome?code=${code}&typ=restIncome","isClickRow":true,"isView":true,"isRow":true,"column":["entpName","annualActualAmount","annualBudgetAmount","ratio"]};
	        dataGrid5 = new MDdataGrid(setting5);
	        dataGrid5.init();
        </c:when>
        <c:otherwise>
	        var setting1 = {"dataGridId":"proReve","dataUrl":"${ctx}/clubCapitalIncome/getClubCapitalIncome?code=${code}&typ=proReve","delAction":"${ctx}/clubCapitalIncome/deleteClubCapitalIncome","saveAction":"${ctx}/clubCapitalIncome/saveCCI?code=${code}&year=${year}&typ=proReve","toolbars":["add","remove","edit","save","undo"],"isTot":true,"tots":["ratio"],"isRow":true,"column":["entpName","annualActualAmount","annualBudgetAmount","ratio"]};
	        dataGrid1 = new MDdataGrid(setting1);
	        dataGrid1.init();
	        var setting2 = {"dataGridId":"income","dataUrl":"${ctx}/clubCapitalIncome/getClubCapitalIncome?code=${code}&typ=income","delAction":"${ctx}/clubCapitalIncome/deleteClubCapitalIncome","saveAction":"${ctx}/clubCapitalIncome/saveCCI?code=${code}&year=${year}&typ=income","toolbars":["add","remove","edit","save","undo"],"isTot":true,"tots":["ratio"],"isRow":true,"column":["entpName","annualActualAmount","annualBudgetAmount","ratio"]};
	        dataGrid2 = new MDdataGrid(setting2);
	        dataGrid2.init();
	        var setting3 = {"dataGridId":"tranIncome","dataUrl":"${ctx}/clubCapitalIncome/getClubCapitalIncome?code=${code}&typ=tranIncome","delAction":"${ctx}/clubCapitalIncome/deleteClubCapitalIncome","saveAction":"${ctx}/clubCapitalIncome/saveCCI?code=${code}&year=${year}&typ=tranIncome","toolbars":["add","remove","edit","save","undo"],"isTot":true,"tots":["ratio"],"isRow":true,"column":["entpName","annualActualAmount","annualBudgetAmount","ratio"]};
	        dataGrid3 = new MDdataGrid(setting3);
	        dataGrid3.init();
	        var setting4 = {"dataGridId":"lionIncome","dataUrl":"${ctx}/clubCapitalIncome/getClubCapitalIncome?code=${code}&typ=lionIncome","delAction":"${ctx}/clubCapitalIncome/deleteClubCapitalIncome","saveAction":"${ctx}/clubCapitalIncome/saveCCI?code=${code}&year=${year}&typ=lionIncome","toolbars":["add","remove","edit","save","undo"],"isTot":true,"tots":["ratio"],"isRow":true,"column":["entpName","annualActualAmount","annualBudgetAmount","ratio"]};
	        dataGrid4 = new MDdataGrid(setting4);
	        dataGrid4.init();
	        var setting5 = {"dataGridId":"restIncome","dataUrl":"${ctx}/clubCapitalIncome/getClubCapitalIncome?code=${code}&typ=restIncome","delAction":"${ctx}/clubCapitalIncome/deleteClubCapitalIncome","saveAction":"${ctx}/clubCapitalIncome/saveCCI?code=${code}&year=${year}&typ=restIncome","toolbars":["add","remove","edit","save","undo"],"isTot":true,"tots":["ratio"],"isRow":true,"column":["entpName","annualActualAmount","annualBudgetAmount","ratio"]};
	        dataGrid5 = new MDdataGrid(setting5);
	        dataGrid5.init();
        </c:otherwise>
```

1. 先初始化一个数据网格：``var dataGrid1=null;``   

2. 根据type的判断，先设置网格的id：``"dataGridId":"restIncome"``   

3. 查询列表的请求：

   `` "dataUrl":"${ctx}/clubCapitalIncome/getClubCapitalIncome?code=${code}&typ=restIncome"``

   typ用来区分同个表的不同字段，而code是在修改的时候传过来的   

4. 指定按钮的类型：

   ``"toolbars":["add","remove","edit","save","undo"]``   

5. 位置属性：

   ``"isTot":true,"tots":["ratio"],"isRow":true,``   

6. 配置列信息：

   ``["entpName","annualActualAmount","annualBudgetAmount","ratio"]}``

## 3.后台获取内容    

跳转到前端页面之后，datagrid还要通过controller向后台索取内容（edit情况下datagrid的内容回显）      

```java
     /**
   	 * 查社有资本经营预算收入汇总信息
   	 * @param request
   	 * @param response
   	 * @param page
   	 * @return
   	 */
   	@ResponseBody
   	@RequestMapping(value = "getClubCapitalIncome")
   	public Map<String,Object> getClubCapitalExpend(HttpServletRequest request,
   			HttpServletResponse response,PageInfo<ClubCapitalIncome> page) {
   			//取出code 
   			String code= request.getParameter("code");
   			String typ= request.getParameter("typ");
   			ClubCapitalIncome clubCapitalIncome=new ClubCapitalIncome();
   			clubCapitalIncome.setParentCode(code);
   			clubCapitalIncome.setTyp(typ);
   			Integer pageNum=Integer.parseInt(request.getParameter("page"));
   			Integer pageSize=Integer.parseInt(request.getParameter("rows"));
   			page.setPageNum(pageNum);
   			page.setPageSize(pageSize);
   			List<ClubCapitalIncome> list = clubCapitalIncomeApi.findList(clubCapitalIncome);
   			PageInfo<ClubCapitalIncome> pageInfo = clubCapitalIncomeApi.findPage(page,clubCapitalIncome);
   			List<ClubCapitalIncome> rows=pageInfo.getList();
   			Map<String, Object> json = new HashMap<String, Object>();
   			json.put("total", list.size());
   			json.put("rows", rows);
   			return json;
   	}
```

1. 设置有属性的对象，获得List    

   ```java
      			String code= request.getParameter("code");
      			String typ= request.getParameter("typ");
      			ClubCapitalIncome clubCapitalIncome=new ClubCapitalIncome();
      			clubCapitalIncome.setParentCode(code);
      			clubCapitalIncome.setTyp(typ);

   			List<ClubCapitalIncome> list = clubCapitalIncomeApi.findList(clubCapitalIncome);
   ```

2. 获取row，通过json传到前台       

   ```java
      			Integer pageNum=Integer.parseInt(request.getParameter("page"));
      			Integer pageSize=Integer.parseInt(request.getParameter("rows"));
      			page.setPageNum(pageNum);
      			page.setPageSize(pageSize);

     			PageInfo<ClubCapitalIncome> pageInfo = clubCapitalIncomeApi.findPage(page,clubCapitalIncome);
      			List<ClubCapitalIncome> rows=pageInfo.getList();
      			Map<String, Object> json = new HashMap<String, Object>();
      			json.put("total", list.size());
      			json.put("rows", rows);
      			return json;

   ```

## 4.edit-嵌入代码   

获取code，设置type，跳转到controller页面。（主要用在非datagrid的内容回显）

```javascript
   var code = rowindex[0].CODE;
   var type = "edit";
```

```javascript
	   diag.ShowOkButton = true;
	   var url  = projectPath + "/clubCapitalIncome/editClubCapitalIncome?code="+code+"&type="+type;
```

controller部分通过code获取clubCapitalIncome，进行回显：

```java
       @RequestMapping(value = "editClubCapitalIncome")
       public String editClubCapitalExpendDetail(@RequestParam(value = "code", required = false) String code,
    		   @RequestParam(value = "type", required = false) String type,HttpServletRequest request, HttpServletResponse response,Model model){
       	model.addAttribute("code", code);
       	model.addAttribute("type", type);
       	ClubCapitalIncome clubCapitalIncome=new ClubCapitalIncome();
       	clubCapitalIncome.setParentCode(code);
       	List<ClubCapitalIncome> findList = clubCapitalIncomeApi.findList(clubCapitalIncome);
       	if(findList.size()>0) {
       		model.addAttribute("clubCapitalIncome", findList.get(0));
       	}else {
       		model.addAttribute("clubCapitalIncome", new ClubCapitalIncome());
       	}
       	model.addAttribute("year", findList.get(0).getCyear());
       	model.addAttribute("deptName", "管理员");
       	return "modules/supply/clubCapitalIncome/addClubCapitalIncome";
       }
```

1. 将code和type传到前端

```java
       	model.addAttribute("code", code);
       	model.addAttribute("type", type);
```

2. 根据code获取对象,传到前端显示       

```java
       	ClubCapitalIncome clubCapitalIncome=new ClubCapitalIncome();
       	clubCapitalIncome.setParentCode(code);
       	List<ClubCapitalIncome> findList = clubCapitalIncomeApi.findList(clubCapitalIncome);
       	if(findList.size()>0) {
       		model.addAttribute("clubCapitalIncome", findList.get(0));
       	}else {
       		model.addAttribute("clubCapitalIncome", new ClubCapitalIncome());
       	}
```

## 5.del-嵌入代码   





## 6.del-后台删除代码   

```java
    /**
	 * 删除
	 * @param request
	 * @param response
	 * @param ids
	 * @return
	 */
    @ResponseBody
    @RequestMapping(value = "delete")
    public Map<String,Object> delete(HttpServletRequest request , HttpServletResponse response , String ids){
        Map<String,Object> result = new HashMap<String, Object>();
        try {
        	ClubCapitalIncome clubCapitalIncome = new ClubCapitalIncome();
        	clubCapitalIncome.setCode(ids);
        	clubCapitalIncomeApi.delete(clubCapitalIncome);
            result.put("result",true);
        }catch (Exception e){
            e.printStackTrace();
            result.put("result",false);
        }
        return result;
    }
```







