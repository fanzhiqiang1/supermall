import {debounce} from '@/common/utils'
import BackTop from 'content/backTop/BackTop'
export const itemListenerMixin = {
  data(){
    return {
      itemImageListener: null,
      newRefresh: null
    }
  },
  mounted(){
    this.newRefresh = debounce(this.$refs.scroll.refresh)
    this.itemImageListener = () =>{
      this.newRefresh()
    }
    this.$bus.$on('itemImageLoad',this.itemImageListener)
    // console.log('我是混入的内容')

  }
}
export const backTopMixin = {
  components: {
    BackTop,
  },
  data(){
    return {
      //记录显示返回顶部按钮
      isShowBackTop: false
    }
  },

  methods: {
      // 点击顶部按钮返回
      backTop(){
        //父组件通过$refs拿到子组件中的数据
        // console.log(this.$refs.scroll.scroll)
        this.$refs.scroll.scrollTo(0,0) //第三个值默认500
      },
      ListenShowBackTop(positionY){
        this.isShowBackTop = positionY > 1000
      }
  }

}
