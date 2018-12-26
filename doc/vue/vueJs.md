

### vue基础使用

M：怎么输出文字到html上？

Z：new一个Vue，指定元素插入占位符

```javascript
new Vue({
  el: '#app',
  data: {
    message: 'Hello node.js!'
  }
})
```

```html
<div id="app">
  <p>{{ message }}</p>
</div>
```



http://www.runoob.com/vue2/vue-watch.html