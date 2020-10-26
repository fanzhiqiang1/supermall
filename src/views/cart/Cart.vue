<template>
  <div class="cart">
    <nav-bar class='nav-bar'>
      <div slot='center'>购物车({{length}})</div>
    </nav-bar>
    <cart-list />
    <cart-button-bar></cart-button-bar>
  </div>
</template>
<script>
  import NavBar from 'components/common/navbar/NavBar'
  import CartList from './childComps/CartList'
  import CartButtonBar from './childComps/CartButtonBar'

  //将 store 中的 getter 映射到局部计算属性
  import {mapGetters} from 'vuex'
  export default {
    name:"Cart",
    components:{
      NavBar,
      CartList,
      CartButtonBar
    },
    computed: {
      // 使用对象展开运算符将 getter 混入 computed 对象中
      //两种方式
        // ...mapGetters(['cartLength'])
      ...mapGetters({
        length:'cartLength'
      })
    }
  }
</script>
<style scoped>
.cart{
  height: 100vh;
}
.nav-bar{
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 700;
}
</style>
