<template>
  <el-container class="layout-default">
    <el-header>
      <my-header />
    </el-header>
    <el-main>
      <nuxt />
    </el-main>
    <el-footer>Footer</el-footer>
    <div>test</div>
  </el-container>
</template>

<script>
  import MyHeader from '../components/public/header/index.vue'
  export default{
    components:{
      MyHeader
    }
  }
</script>

<style lang="scss">
   @import '@/assets/css/search/menu.scss';
</style>


