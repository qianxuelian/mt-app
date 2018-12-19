<template>
  <div class="search-panel">
    <el-row>
      el-c
    </el-row>
    <el-row :gutter="0">
      <el-col :span="5">
        <Menu />
      </el-col>
      <el-col :span="19">2</el-col>
      <el-col :span="24">
        <list />
      </el-col>
      <nuxt />
    </el-row>
  </div>
</template>

<script>
  import Menu from '../components/search/menu.vue';
  import List from '../components/search/list.vue'
  export default {
    components:{
      Menu,
      List
    },
    data(){
      return {


      }
    }
  }
</script>

<style lang="scss">
  @import '@/assets/css/search/menu.scss';
</style>


