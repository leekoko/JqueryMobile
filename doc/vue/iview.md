# iView前端使用   

## 1.校验添加

M：怎么添加前端校验呢？

Z：如下：

1. 在Form标签中添加``:rules="ruleValidate"``   

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

#### 时间非空

```javascript
foundDate: [
    {type: "date",required: true,message: "成立时间不能为空",trigger: "change"}
],
```

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





