# Bootstrap校验表单问题   

## 1.html基础结构   

```html
	  <!--引入bootstrapValidator-->
	  <link href="https://cdn.bootcss.com/bootstrap-validator/0.5.2/css/bootstrapValidator.min.css" rel="stylesheet">
	  <script src="https://cdn.bootcss.com/bootstrap-validator/0.5.2/js/bootstrapValidator.min.js"></script>
```

1. 需要引入bootstrapValidator文件   

```html
   <body>
　　　　<form>
			<div class="form-group">
				<label>Username</label>
				<input type="text" class="form-control" name="username" />
			</div>
			<div class="form-group">
				<label>Email address</label>
				<input type="text" class="form-control" name="email" />
			</div>
			<div class="form-group">
				<button type="submit" name="submit" class="btn btn-primary">Submit</button>
			</div>
		</form>
   </body>
```

1. 需要放在``<from>``中    
2. 需要给input复制name   

## 2.script初始化校验   

```javascript
		$(function () {
			$('form').bootstrapValidator({
	　　　　　　　message: 'This value is not valid',
				　feedbackIcons: {
					　　　　　　　　valid: 'glyphicon glyphicon-ok',
					　　　　　　　　invalid: 'glyphicon glyphicon-remove',
					　　　　　　　　validating: 'glyphicon glyphicon-refresh'
				　},
				fields: {
					username: {
						message: '用户名验证失败',
						validators: {
							notEmpty: {
								message: '用户名不能为空'
							}
						}
					},
					email: {
						validators: {
							notEmpty: {
								message: '邮箱地址不能为空'
							}
						}
					}
				}
			});
		});
```

1. 定义错误的提醒图标：feedbackIcons    

2. 在fields中设定提示的信息   

3. 除了可以添加非空判断，还可以添加重叠验证：

   1. 长度判断

      ```javascript
                              stringLength: {
                                  min: 6,
                                  max: 18,
                                  message: '用户名长度必须在6到18位之间'
                              },
      ```

   2. 格式判断    

      ```javascript
                              regexp: {
                                  regexp: /^[a-zA-Z0-9_]+$/,
                                  message: '用户名只能包含大写、小写、数字和下划线'
                              }
      ```

      (e-mail)

      ```javascript
                             emailAddress: {
                                  message: '邮箱地址格式有误'
                              }
      ```

      其他：

      ```
      base64：64位编码验证；
      between：验证输入值必须在某一个范围值以内，比如大于10小于100；
      creditCard：身份证验证；
      date：日期验证；
      ip：IP地址验证；
      numeric：数值验证；
      phone：电话号码验证；
      uri：url验证；
      (more: http://bv.doc.javake.cn/validators/)
      ```

      ​

[查看源码](../SourceCode/bootstrap/validator.html)   



















