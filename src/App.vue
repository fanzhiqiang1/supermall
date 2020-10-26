<template>
  <div id="app">
    <!-- Detail详情页中不同的商品是不同的数据，所以不能保持组件的状态 -->
    <keep-alive exclude='Detail'>
      <router-view></router-view>
    </keep-alive>
    <main-tab-bar></main-tab-bar>
    <icon></icon>
    <svg-icon></svg-icon>
  </div>
</template>

<script>
import MainTabBar from 'content/mainTabbar/MainTabBar'
import Icon from "content/Icon/Icon";
import SvgIcon from 'content/Icon/svg.vue'

export default {
  name: 'App',
  components: {
    MainTabBar,
    Icon,
    SvgIcon
  }
}
</script>

<style scoped>
@import url('assets/css/base.css');
</style>
