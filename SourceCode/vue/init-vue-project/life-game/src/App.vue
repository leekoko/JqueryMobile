<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div id="app">
    {{msg}}
    <div>
      <input type="text" v-model="info">
      <button @click="handleClick">添加</button>
    </div>

    <ul>
      <todo-item v-for="item in list" :key="item">
        <template v-slot:item="itemProps">
          <span :style="{fontSize: '20px',color: itemProps.checked ? 'red':'blue'}">{{item}}</span>
        </template>
      </todo-item>
    </ul>
  </div>
</template>

<script>
import TodoItem from './components/TodoItem.vue'
export default {
  name: 'app',
  data(){
    return{
      msg: 'hello, i am liyb. VUE , i am coming',
      info: '',
      list: [],
    }
  },
  methods: {
    handleClick(){
      console.log(this.info);
      this.list.push(this.info);
      this.info = '';
    }
  },
  components: {
    TodoItem
  }
}
</script>

<style>
</style>
