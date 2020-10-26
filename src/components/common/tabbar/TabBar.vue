<template>
  <div class='tab-bar'>
    <slot></slot>
  </div>
</template>
<script>
  export default {
    name:"Tabbar"
  }
</script>
<style scoped>
.tab-bar{
    display: flex;
    height: 49px;
    background-color: #f9f9f9;
    position: fixed;
    left:0;
    right: 0;
    bottom: 0;
    box-shadow: 0px -1px 10px rgba(100,100,100,.2);
}
</style>
