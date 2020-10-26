<template>
  <div id='detail'>
    <detail-nav-bar class="detail-nav"
    @titleClick='titleClick' ref='nav' />
   <scroll class='content'
          ref='scroll'
          :probeType='3'
          @scroll='tabControl'>
      <detail-swiper :top-images='topImages'></detail-swiper>
      <detail-base-info :goods='goods'></detail-base-info>
      <detail-shop-info :shop='shop'></detail-shop-info>
      <detail-goods-info :detailInfo='detailInfo' @imageLoad='imageLoad'></detail-goods-info>
      <detail-param-info :param-info='paramInfo' ref='params'></detail-param-info>
      <detail-comment-info :comment-info='commentInfo' ref='comment'></detail-comment-info>
      <good-list :goods='recommends' ref='recommends' />
   </scroll>
   <back-top @click.native='backTop' v-show='isShowBackTop'></back-top>
   <detail-bottom-bar @addCart='addToCart'></detail-bottom-bar>
   <!-- <toast :message='message' :show='show' /> -->
  </div>
</template>
<script>

import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'

import {debounce} from '@/common/utils'

//使用了GoodsList里面的事件也会执行 图片加载后会发射事件到home中
import GoodList from 'content/goods/GoodList'
import Scroll from 'common/scroll/Scroll'
// import Toast from 'common/toast/Toast'

import {itemListenerMixin,backTopMixin} from '@/common/mixins'

import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail'

import {mapActions} from 'vuex'

export default {
  name:"Detail",
  data(){
    return {
      iid: null,
      topImages: [],
      goods:{},
      shop:{},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends:[],
      themeTopYs:[],
      getThemeTopY: null,
      currentIndex: 0,
      // message: '',
      // show: false
    }
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    GoodList,
    Scroll,
    // Toast
  },
  mixins: [itemListenerMixin, backTopMixin],
  created(){
    //1.获取iid
     this.iid = this.$route.params.iid
    console.log('刷新')
     //2.请求详情数据
     getDetail(this.iid).then( res => {
        //1.获取数据
       const data = res.result
       //2.取出轮播图数据
        this.topImages = res.result.itemInfo.topImages
        //3.创建商品信息的对象
        this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
        // console.log(this.goods)
        //4.取出店铺信息
        this.shop = new Shop(data.shopInfo)
        //5.取出详情信息
        this.detailInfo = data.detailInfo
        //6.取出商品参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)

        //7.取出评论信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }
     })
      //3.获取推荐数据
    getRecommend().then(res => {
          this.recommends = res.data.list
    })
     //1.第一次获取,DOM对象没有渲染
        // this.themeTopYs = []
        // this.themeTopYs.push(0)
        // this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        // this.themeTopYs.push(this.$refs.recommends.$el.offsetTop)

    // 2.第二次获取，图片没有完成渲染，高度不对
      // this.$nextTick(() => {
      //     this.themeTopYs = []
      //     this.themeTopYs.push(0)
      //     this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      //     this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      //     this.themeTopYs.push(this.$refs.recommends.$el.offsetTop)
      //     console.log(this.themeTopYs)
      // })

      //防抖之后得到的函数，防止函数被多次创建
      this.getThemeTopY = debounce(() => {
            this.themeTopYs = []
            this.themeTopYs.push(0)
            this.themeTopYs.push(this.$refs.params.$el.offsetTop)
            this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
            this.themeTopYs.push(this.$refs.recommends.$el.offsetTop)

            // this.themeTopYs.push(this.$refs.recommends.$el.offsetTop+100)
            this.themeTopYs.push(Number.MAX_VALUE)
      },100)
  },
  methods: {
    // ...mapActions(['addCart']),
    ...mapActions({
      add:'addCart'
    }),
    imageLoad(){
        //使用防抖增加体验
       // const refresh = debounce(this.$refs.scroll.refresh)
        // refresh()
        // this.$refs.scroll.refresh()
        this.newRefresh() //混入的内容
        //图片加载完成调用
        this.getThemeTopY()

    },
    //点击滚动到标题内容
    titleClick(index){
        // this.themeTopYs[index] 索引值对应的是title的
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index]+44,200)
    },
    tabControl(position){
      //保存滚动的Y轴
      const positionY = -position.y
      let length = this.themeTopYs.length
      // for (let i = 0; i < length; i++) {
      //   if ((this.currentIndex !== i ) && (i < length - 1 && positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i+1])||(i === length - 1 && positionY > this.themeTopYs[i])) {
      //     // console.log(i)
      //       this.currentIndex = i
      //       this.$refs.nav.currentIndex = this.currentIndex
      //   }
      // }
      for (let i = 0; i < length-1; i++) {
          if ((this.currentIndex !== i ) && ( positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i+1])) {
          // console.log(i)
            this.currentIndex = i
            this.$refs.nav.currentIndex = this.currentIndex
          }
      }

      // this.isShowBackTop = positionY > 1000
      // 显示返回顶部按钮
      this.ListenShowBackTop(positionY)

    },
    addToCart(){
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid

      // console.log(product)
      // this.$store.commit('addCart',product)

      // this.$store.dispatch('addCart',product).then(res => {
      //   console.log(res)
      // })
      //mapActions vuex中的辅助函数
      this.add(product).then(res =>{
        // this.message = res
        // this.show = true
        // console.log(res)
        // setTimeout(() =>{
        //   this.message = ''
        //   this.show = false
        // },2000)

        this.$toast.show(res,2000)
      })
    }
  },
  destroyed(){
     this.$bus.$off('itemImageLoad',this.itemImageListener)
  },
  mounted(){
    // itemListenerMixin 混合处理
      // const refresh = debounce(this.$refs.scroll.refresh)
      // this.itemImageListener = () => {
      //     // this.$refs.scroll.refresh() //不加防抖每一张图片加载完毕，都会去执行
      //     refresh()
      //   }
      // //组件goodlistitem中发出的事件 在这里响应事件
      //  this.$bus.$on('itemImageLoad',this.itemImageListener)

      // 1.这里获取不到$el属性
      // this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      // this.themeTopYs.push(this.$refs.recommends.$el.offsetTop)
      // console.log(this.themeTopYs)

  },
  updated(){
      // this.themeTopYs = []

      // this.themeTopYs.push(0)

      // this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      // this.themeTopYs.push(this.$refs.recommends.$el.offsetTop)

      // console.log(this.themeTopYs)
  }

}
</script>
<style scoped>
#detail {
  position: relative;
  z-index: 6;
  background-color: #fff;
  height: 100vh;
}
.content{
  /*需要刷新refresh 不然有时获取的高度不准确*/
  height: calc(100% - 44px - 49px);
  /*防止鼠标滚动 */
  overflow: hidden;
}
.detail-nav{
  position: relative;
  z-index: 6;
  background-color: #fff;
}
</style>
