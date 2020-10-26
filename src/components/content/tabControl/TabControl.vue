<template>
  <div class="tab-control">
      <div v-for="(item,index) in titles" class="tab-control-item"
          :class="{active: currentIndex === index }"
          @click='itemClick(index)'>
        <span>{{item}}</span>
      </div>
  </div>
</template>
<script>
  export default {
    name:'TabControl',
    props:{
      titles: {
        type:Array,
        default:[]
      }
    },
    data(){
      return {
        currentIndex: 0
      }
    },
    methods: {
      itemClick(index){
        this.currentIndex = index
        this.$emit('tabClick',index) //在父组件绑定自定义事件时，不用在标签中传递参数，绑定参数名称即可
      }
    }

  }
</script>
<style scoped>
.tab-control{
  display: flex;
  height: 44px;
  line-height: 44px;
  text-align: center;
  background-color: #fff;
}
.tab-control-item{
  flex: 1;
}
.active{
  color: var(--color-high-text);
}
.active span{
  padding: 5px;
  border-bottom: 3px solid var(--color-high-text)
}
</style>
