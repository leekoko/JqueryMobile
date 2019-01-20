<template>
  <div class="home" style="margin-top: 100px;margin-left: 50px;">
    <!--Inspired By Services You’ve Viewed-->
    <h1>Inspired By Services You’ve Viewed</h1>

    <!--展示商品块start-->
    <v-goods></v-goods>
    <!--展示商品块end-->

    <!--Explore The Marketplace-->

    <!--Get Work Done Faster On Fiverr, With Confidence-->

<!--    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品1</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <router-view></router-view>-->
<!--    <i-button @click="show">Click me!</i-button>
    <Modal v-model="visible" title="Welcome">Welcome to iView</Modal>-->
  </div>
</template>

<script>
  import goods from '../components/goods/goods.vue'

    export default {
      name: "home",
      components: {
        'v-goods': goods,
      },
      data() {
        return{
          visible: false
        }
      },
      methods: {
        show: function () {
          this.visible = true;
        }
      }
    }
</script>

<style scoped>

</style>
