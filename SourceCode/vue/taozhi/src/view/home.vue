<template>

  <div class="layout">
    <Layout>
      <v-header></v-header>
      <Content :style="{minHeight: '800px'}">
        <div class="home" style="margin-top: 100px;margin-left: 50px;">
          <!--Inspired By Services You’ve Viewed-->
          <h1>Inspired By Services You’ve Viewed</h1>

          <!--展示商品块start-->
          <v-goods></v-goods>
          <!--展示商品块end-->


          <!--Explore The Marketplace-->

          <!--Get Work Done Faster On Fiverr, With Confidence-->

        </div>
      </Content>
      <Footer class="layout-footer-center">2011-2016 &copy; TalkingData</Footer>
    </Layout>
  </div>




</template>

<script>
  import header from '../components/header/header.vue'
  import goods from '../components/goods/goods.vue'

    export default {
      name: "home",
      components: {
        'v-goods': goods,
        'v-header': header
      },
      data() {
        return{
        }
      },
      methods: {
      }
    }
</script>

<style scoped>

</style>
