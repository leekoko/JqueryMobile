<template>
  <div id="app">
    <div class="layout">
      <Layout>
        <v-header></v-header>
        <Content :style="{minHeight: '800px'}">
          <v-home></v-home>
        </Content>
        <Footer class="layout-footer-center">2011-2016 &copy; TalkingData</Footer>
      </Layout>
    </div>


  </div>
</template>

<script>
  import header from './components/header/header.vue'
  import home from './view/home.vue'

  export default {
    components: {
      'v-header': header,
      'v-home': home
    }

  }


</script>
<style>
</style>
