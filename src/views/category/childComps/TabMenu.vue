<template>
  <scroll ref="scroll" class="tab-menu">
       <div  :class="{active : currentIndex === index}"
             class="list-item"
             v-for="(item,index) in categories"
             :key="index"
             @click="itemClick(index)">{{item.title}}</div>
  </scroll>
</template>

<script>
  import Scroll from 'components/common/scroll/Scroll'
  export default {
    name: "TabMenu",
    props:{
      categories:{
        type:Array,
        default:null
      }
    },
  components: {
    Scroll
  },
    data(){
      return {
        currentIndex: 0
      }
    },
    updated() {
      this.$refs.scroll.refresh()//刷新一次
    },
    methods: {
      itemClick(index){
        this.$emit('itemClick',index)
        this.currentIndex = index
      }
    }
  }
</script>

<style scoped>
  .tab-menu{
    width: 30%;
    height: 100%;
  }
  .list-item{
    height: 45px;
    line-height: 45px;
    background-color: #f6f6f6;
    color: var(--color-text);
    text-align: center;
    font-size: 14px;
  }
  .active{
    font-weight: 700;
    color: var(--color-high-text);
    background-color: #fff;
    border-left: 3px solid var(--color-high-text);
  }
</style>
