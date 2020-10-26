<template>
  <div ref='wrapper'>
    <div>
      <slot></slot>
    </div>
  </div>
</template>
<script>
  import BScroll from 'better-scroll'
  export default {
    name:"Scroll",
    props: {
      probeType: {
          type:Number,
          default:0,
        },
      pullUpLoad:{
        type: Boolean,
        default: false
      }
    },
    data(){
      return {
        scroll: null,
      }
    },
    mounted(){
      //1.创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper,{
        click:true, //button可以监听点击,限制div或者span之类标签
        probeType:this.probeType, //滚动侦测属性 默认0不侦测
        pullUpLoad: this.pullUpLoad//上拉加载跟多
      })
      //2.事件滚动位置
      if (this.probeType === 2 || this.probeType === 3 ) {
          this.scroll.on('scroll',(position) => {
            this.$emit('scroll',position)
          })
      }
      // 3.监听上拉事件
      if (this.pullUpLoad) {
         this.scroll.on('pullingUp',() => {
            this.$emit('pullingUp')
          })
      }
    },

    methods: {
      //回到顶部
      scrollTo(x,y,time=500){
        this.scroll && this.scroll.scrollTo(x,y,time)
      },
      //下拉加载跟多
      finishPullUp(){
        this.scroll.finishPullUp()
      },
      //刷新滚动区域的参数
      refresh(){
        this.scroll && this.scroll.refresh()
      },
      getScrollY(){
        return this.scroll ? this.scroll.y : 0
      }
    }
  }
</script>
<style scoped>

</style>
