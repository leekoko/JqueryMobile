# EasyUI DataGrid

## 1.前端显示列表

```html
 	    <h3 align="center">兼职信息</h3>
        <table id="partTime" class="easyui-datagrid" title="兼职信息:" style="width:100%;height:250px" rownumbers="true">
               <thead>
                     <tr>
                           <th data-options="field:'ck',checkbox:true"></th>
                           <th style="width:25%" data-options="field:'partTimeComCode',align:'center',editor:{type:'validatebox',options:{required:true}}">兼职公司</th>
                           <th style="width:25%" data-options="field:'ptePost',align:'center',editor:{type:'validatebox',options:{required:true}}">兼职职位</th>
                           <th style="width:25%" data-options="field:'startDate',align:'center',editor:{type:'validatebox',options:{required:true}}">任期时间</th>
                           <th style="width:25%" data-options="field:'whetherGetSalary',align:'center',editor:{type:'validatebox',options:{required:true}}">是否获取报酬</th>
                     </tr>
               </thead>
         </table>
```

#### 1.每一列的内容配置

1. 多选框   

   ``<th data-options="field:'code',width:50,checkbox:true"></th>``   

2. 一般配置   

   ``<th data-options="field:'budgetAccount',width:100,align:'center',editor:{type:'validatebox',options:{required:true}}">预算科目</th> ``   

   - **type** : combobox为下拉框   
   - **添加字典** ：``valueField:'dictKey',textField:'dictValue',url:'${ctx}/entpPerson/getEntpList'``    

#### 2.内容初始化

```javascript
        var setting = {"dataGridId":"resume","dataUrl":"${ctx}/entpResume/getResumeList?code=${code}","delAction":"${ctx}/entpResume/deleteEntpResume","saveAction":"${ctx}/entpResume/saveRes?code=${code}","toolbars":["add","remove","edit","save","undo"]};
        dataGrid = new MDdataGrid(setting);
        dataGrid.init();
```

1. 先初始化一个数据网格：``var dataGrid1=null;``   

2. 根据type的判断，先设置网格的id：``"dataGridId":"restIncome"``   

3. 查询列表的请求：

   `` "dataUrl":"${ctx}/clubCapitalIncome/getClubCapitalIncome?code=${code}&typ=restIncome"``

   typ用来区分同个表的不同字段，而code是在修改的时候传过来的   

4. 指定按钮的类型：

   ``"toolbars":["add","remove","edit","save","undo"]``   


## 3.后台获取内容    

### 1.查询

```java
    /**
     * 查询兼职信息
     * @param request
     * @param response
     * @return
     */
	@ResponseBody
	@RequestMapping(value = "getentpManagerPartTimeList")
	public Map<String,Object> getentpManagerPartTimeList(HttpServletRequest request, HttpServletResponse response,PageInfo<EntpManagerPartTime> page) {
		
		//取出code 
		String code= request.getParameter("code");
		EntpManagerPartTime entpManagerPartTime = new EntpManagerPartTime();
		entpManagerPartTime.setParentCode(code);
		Integer pageNum=Integer.parseInt(request.getParameter("page"));
		Integer pageSize=Integer.parseInt(request.getParameter("rows"));
		page.setPageNum(pageNum);
		page.setPageSize(pageSize);
		List<EntpManagerPartTime> list = entpManagerPartTimeApi.findList(entpManagerPartTime);
		PageInfo<EntpManagerPartTime> pageInfo = entpManagerPartTimeApi.findPage(page,entpManagerPartTime);
		List<EntpManagerPartTime> rows=pageInfo.getList();
		Map<String, Object> json = new HashMap<String, Object>();
		json.put("total", list.size());
		json.put("rows", rows);
		return json;
	}
```

### 2.保存   

```java
	/**
	 * easyUI保存兼职信息
	 */
	@RequestMapping(value="saveEntpManagerPartTime")
 	@ResponseBody
    public Object saveEntpManagerPartTime(HttpServletRequest request,HttpServletResponse res) throws Exception{
 		//设置请求编码
 		request.setCharacterEncoding("UTF-8");
 		String inserted = request.getParameter("inserted");
 		String updated = request.getParameter("updated");
		
 		EntpManagerPartTime entpManagerPartTime = null;
 		if(inserted != null){
 			List<EntpManagerPartTime> jsonArr =JSON.parseArray(inserted,EntpManagerPartTime.class);
 			String parentCode=request.getParameter("code");
 			
 			for (int i = 0; i < jsonArr.size(); i++) {
 				entpManagerPartTime = jsonArr.get(i);
 				entpManagerPartTime.setCode(IdGen.uuid());
 				entpManagerPartTime.setParentCode(parentCode);
 				entpManagerPartTime.setPartTimeComName(jsonArr.get(i).getPartTimeComName());
 				entpManagerPartTime.setPtePost(jsonArr.get(i).getPtePost());
 				entpManagerPartTime.setStartDate(jsonArr.get(i).getStartDate());
 				entpManagerPartTime.setWhetherGetSalary(jsonArr.get(i).getWhetherGetSalary());
 				entpManagerPartTime.setIsNewRecord(true);
 				entpManagerPartTime.setCommonValue(SysUtils.getUser().getUserCodes(),SysUtils.getUser().getApplicationCode());
 				this.entpManagerPartTimeApi.save(entpManagerPartTime);
 			}
 		}
 		if(updated != null){
 			List<EntpManagerPartTime> jsonArr =JSON.parseArray(updated,EntpManagerPartTime.class);
 			for (int i = 0; i < jsonArr.size(); i++) {
 				entpManagerPartTime = jsonArr.get(i);
 				entpManagerPartTime.setIsNewRecord(false);
 				entpManagerPartTime.setCommonValue(SysUtils.getUser().getUserCodes(),SysUtils.getUser().getApplicationCode());
 				this.entpManagerPartTimeApi.update(entpManagerPartTime);
			}
 		}
		return null;
	}
```

### 3.删除   

```java
    /**
	 * 删除
	 * @param request
	 * @param response
	 * @param ids
	 * @return
	 */
    @ResponseBody
    @RequestMapping(value = "deleteEntpManagerPartTime")
	public void deleteEntpManagerPartTime(@RequestParam(value="codes") String codes, HttpServletResponse response){
		String[] codeStr = codes.split(",");
		EntpManagerPartTime entpManagerPartTime=null;
		for (String code : codeStr) {
			entpManagerPartTime=new EntpManagerPartTime();
			entpManagerPartTime.setCode(code);
			entpManagerPartTimeApi.delete(entpManagerPartTime);
        }
		this.renderString(response, true);
	}
```


