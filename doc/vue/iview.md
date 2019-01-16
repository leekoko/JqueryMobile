# iView前端使用   

## 1.校验添加

M：怎么添加前端校验呢？

Z：如下：

1. 在Form标签中添加``:rules="ruleValidate"`` 和``:model="sub"``指定json根元素

2. 在标签上添加prop标识``<FormItem label="成立时间" prop="foundDate">``  

3. 添加校验的内容

   ```javascript
   export default {
       data () {
           return {
               ruleValidate: {
                   foundDate: [
                       { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                   ]
               }
           }
       }
   }
   ```

Z：以下是ruleValidate下引用的规则：

#### 时间非空校验

```javascript
<FormItem label="区级孵化器认定时间" prop="qujiAcceDate">
    <DatePicker format="yyyy-MM-dd" size="large" type="date" placeholder="选择时间" :value="formData.qujiAcceDate" @on-change="formData.qujiAcceDate=$event"></DatePicker>
</FormItem>
```

Z：可以解决日期保存时报错

#### 文本非空

```javascript
companyName: [
    {required: true,message: "企业名称不能为空",trigger: "blur"}
],
```

#### 下拉框非空

```javascript
city: [
    { required: true, message: 'Please select the city', trigger: 'change' }
],
```

#### num类型

```javascript 
regPay: [
    {type: 'number',message: '请输入正确数值',trigger: 'blur',transform(value) {return Number(value);}}
],
```

#### 自定义规则

M：怎么添加自定义规则校验呢？

1. data函数下设定校验的规则

   ```javascript
   var  validatecomCode = function(rule, value, callback){
       if (value.length > 0 && value.length != 18) {
           return callback(new Error("不是有效的统一社会信用编码！"));
       }
       callback();
   };
   ```

2. ruleValidate下引用规则

   ```javascript
   comCode: [
       {validator: validatecomCode,message: '请检查统一信用代码格式，长度为18位',trigger: 'blur'}
   ]
   ```

#### 手机类型

```javascript
//手机号码规则
var validateTelPhone = function(rule, value, callback){
    if (value.length > 0 && value.length != 11) {
        return callback(new Error("不是有效的手机号码！"));
    }
    callback();
};
```

```javascript
linktel:[
    {validator: validateTelPhone, message: '请填写正确手机号码', trigger: 'blur'}
],
```

#### 电话类型

```javascript
//电话号码规则
var validateTel = function(rule, value, callback){
    if(value.length > 0 && !/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(value)){
        return callback(new Error("固定电话有误，请重填"));
    }
    callback();
};
```

```javascript
linktel:[
    {validator: validateTel, message: '请填写正确电话号码', trigger: 'blur'}
]
```

#### 动态生成元素校验   

Z：动态生成的元素直接指定校验规则会出现问题，所以需要将校验规则添加到行内

```javascript
<FormItem :label="subject.titbf.isqa === true ? '必填' : ''" :prop="'subjects.'+ index + '.answer'" :rules="{required: true,message: '填写内容不能为空', trigger: 'blur' }">
    <RadioGroup vertical v-model="subject.answer">
        <Radio :label="value" v-for="(value, key, index) in subject.contentbf" :key="index" :value="value">
            <span>【{{key}}】</span><span>{{value}}</span>
		</Radio>
	</RadioGroup>
</FormItem>
```

强制绑定prop和rules

#### 多选框非空校验

Z：多选框的初始化数据需要用数组，否则非空校验会出现问题。（可以统一使用空数组初始化）

## 2.列表显示

Z：列表显示的代码如下：

```html
<Table border :columns="columns1" :data="data1"></Table>
```

```javascript
    data() {
        return {
            modalExamine: false,
            columns1: [
                {
                    title: "问卷名称",
                    key: "tit",
                    align: "center"
                },
                {
                    title: "发布日期",
                    key: "year",
                    align: "center",
                    width: 150
                },
                {
                    title: "操作",
                    key: "handle",
                    align: "center",
                    width: 150,
                    render: (h, params) => {
                        return h("div", [
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "primary",
                                        size: "small"
                                    },
                                    style: {
                                        marginRight: "5px"
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.row.code);
                                        }
                                    }
                                },
                                "填写问卷"
                            )
                        ]);
                    }
                }
            ],
            data1: []
        };
    },
```

columns1定义标题栏的内容；data1存储数据的内容，key对应属性值

```json
{
    code: "599d88b937dd452aa87a99335a5ec509",
    year: "2018",
    state: "2",
    tit: "1111--"
},
{
    code: "23d59b34a46340aa9bf63bcb9d3c3cab",
    year: "2019",
    state: "说明内容",
    tit: "标题内容"
}...
```

Z：按钮使用render属性，可以触发当前的show方法，并且将当前行的属性传过去

M：那做填写框的时候，怎么做一行显示两列呢？

Z：如下

```javascript
<Row :gutter="16">
    <i-col :xs="{ span: 24}" :sm="{ span: 12}" :md="{ span: 12 }" :lg="{ span: 12 }">
        <FormItem label="产业特色">
            <i-input size="large" v-model="formData.induChar"></i-input>
		</FormItem>
	</i-col>
	<i-col :xs="{ span: 24}" :sm="{ span: 12}" :md="{ span: 12 }" :lg="{ span: 12 }">
    	<FormItem label="上年度区级孵化器绩效评价结果">
        	<i-input size="large" v-model="formData.lastYearAcceJxpj"></i-input>
		</FormItem>
	</i-col>
</Row>
```

## 3.模态框

M：我现在要实现一个模块框，怎么做呢？

Z：如下代码，html定义模态框的内容

```html
<a title="网上调查">
    <span>网上调查</span>
    <Modal :footer-hide="true" v-model="modalExamine" title="网上调查" class-name="vertical-center-modal" fullscreen>
        <eda-examine v-on:listen="submitStatus"></eda-examine>
    </Modal>
</a>
```

M：那如果这个按钮时再列表中的呢，列表是不适合写那么长的Modal的？

Z：先将modal定义在html中

```html
<Modal :footer-hide="true" v-model="showModal" title="网上调查" class-name="vertical-center-modal" fullscreen>
    <eda-examine v-on:listen="submitStatus" :code="rowCode"></eda-examine>
</Modal>
```

初始化showModal的值为false``showModal: false`` ，在按钮点击的时候将showModal设置为true

M：模态框要关闭和提示已保存怎么实现呢？

Z：如下代码

```javascript
Api.saveExamineAnswer({
    res: sub.code + "," + sub.titNo
});

that.$Message.success("已保存");
that.$emit("listen", {
    type: "examine",
    status: true
});
```

## 4.分页   

M：分页效果怎么实现呢？

Z：代码如下：

```html
<Page :total="total" :page-size="showSize" :current="currentPage" show-sizer @on-change="pageChange" @on-page-size-change="pageSizeChange"/>
```

初始化data数据：

```javascript
data() {
    return {
        currentPage: 1,
        total: 100,
        showSize: 10,
        ...
```

添加分页方法：

```javascript
methods: {
    pageChange(page) {
        this.currentPage = page;
    },
    pageSizeChange(num) {
        this.showSize = num;
    },
    ...    
```

添加监视页码变化代码：

```javascript
watch: {
    currentPage: function() {
        this.initTable();
    },
    showSize: function() {
        this.initTable();
    }
}
```

请求数据时将页面传过去

```javascript
        //初始化通知公告列表数据
        async initBbsList() {
            let that = this;
            let result = (await Api.getBbsList({
                current: that.currentPage,
                size: that.showSize,
                sort: "desc"
            })).data;
            that.bbsTableData = result.list;
            if (result.total === 0) {
                that.bbsTableData = [];
            } else {
                that.bbsTableData = result.list;
            }
            that.total = result.total;
            that.showBbsModal = false;
        },
```







