# 下面node.js

M：怎么用node.js执行js文件？

Z：进入文件所在目录，使用命令``node hello_world.js``即可   

M：那怎么用node.js创建应用呢？

Z：保存以下代码为js文件，执行该文件，最后访问定义的端口即可

```js
//引入http模块
var http = require('http');

http.createServer(function (request, response) {   //创建服务器

    // 发送 HTTP 头部 
    // HTTP 状态值: 200 : OK
    // 内容类型: text/plain
    response.writeHead(200, {'Content-Type': 'text/plain'});

    // 发送响应数据 "Hello World"
    response.end('Hello World\n');
}).listen(8888);    //绑定8888端口

// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8888/');
```

#### NPM

M：NPM是安装node.js带的包管理工具，有点像maven仓库

M：我的NPM版本太旧，怎么升级呢？

Z：使用命令``npm install npm -g``

M：要怎么利用NPM安装框架模块呢？

Z：``npm install express``,express 包会下载到node_modules 目录中  ，通过``var express = require('express');``即可进行引用。



M：全局安装和本地安装是用来干嘛的呢？

M：package.json的作用是什么呢？

#### 回调函数

Z：我们一般的js代码是阻塞的，当使用了回调函数之后，则可以并发处理其他命令，提高性能。

1. 阻塞代码示例

   ```javascript
   var fs = require("fs");
   
   var data = fs.readFileSync('input.txt');
   
   console.log(data.toString());
   console.log("程序执行结束!");
   ```

2. 改写成回调函数，异步执行

   ```javascript
   var fs = require("fs");
   
   fs.readFile('input.txt', function (err, data) {	//执行IO时将同时下面输出功能
       if (err) return console.error(err);
       console.log(data.toString());	
   });
   
   console.log("程序执行结束!");	//同时执行的内容
   ```

   回调函数是不按顺序执行的，如果要处理回调函数的参数，需要添加到回调函数中。



事件循环

http://www.runoob.com/nodejs/nodejs-event-loop.html



























