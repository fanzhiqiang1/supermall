<template>
  <div class="tab-bar-item" @click='itemClick'>
    <div class="item-icon" v-if='!isActive'><slot name='item-icon'></slot></div>
    <div class="item-active-icon" v-else><slot name='item-icon-active'></slot></div>
    <div :style='activeStyle' class="item-text"><slot name='item-name'></slot></div>
  </div>
</template>
<script>
  export default {
    name:"TabbarItem",
    props:{
      path:String,
      activeColor:{
        type:String,
        default:'red'
      }
    },
    computed:{
      isActive(){
        //this.$router 当前处于活跃中的
        // return this.$route.path.indexOf(this.path) != -1
        return this.$route.path === this.path
      },
      activeStyle(){
        return this.isActive ? {color:this.activeColor} : {}
      }
    },
    methods:{
      itemClick(){
        this.$router.replace(this.path)
      }
    }
  }
</script>
<style scoped>
.tab-bar-item{
    flex:1;
    text-align: center;
    font-size: 14px;
}
.item-icon img, .item-active-icon img {
  width: 24px;
  height: 24px;
  margin-top: 5px;
  vertical-align: middle;
}

.item-text {
  font-size: 12px;
  margin-top: 3px;
  color: #333;
}
</style>
