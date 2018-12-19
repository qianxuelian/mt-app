<template>
  <div class="m-nav">
    <ul class="nav">
      <li>
        <nuxt-link to="/my">我的美团</nuxt-link>
        <dl>
          <dt>
            <nuxt-link to="/order">我的订单</nuxt-link>
          </dt>
          <dt>
            <nuxt-link to="/collect">我的收藏</nuxt-link>
          </dt>
          <dt>
            <nuxt-link to="/ticket">抵用券</nuxt-link>
          </dt>
          <dt>
            <nuxt-link to="/userInfo">账户设置</nuxt-link>
          </dt>
        </dl>
      </li>
      <li>
        <nuxt-link to="/app">手机App</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/shop">商家中心</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/site">网站导航</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
  }
</script>

<style lang="scss">
  @import '@/assets/css/public/header.scss';
</style>
