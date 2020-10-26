<template>
  <div id='home'>
    <nav-bar class='home-nav'><div slot='center'>购物街</div></nav-bar>
     <tab-control ref='tabControl1'
          :titles='["流行","新款","精选"]'
          @tabClick='tabClick'
          v-show='isTabFixed' :class='{fixed:isTabFixed}'/>
    <scroll
    class='content'
    ref='scroll'
    :probe-type='3'
    @scroll='contentScroll'
    :pull-up-load='true'
    @pullingUp='loadMore' >
      <div>
        <home-swiper :banners='banners' @swiperImageLoad='swiperImageLoad'></home-swiper>
        <recommend-view :recommends='recommends' />
        <feature-view/>
        <tab-control ref='tabControl2'
          :titles='["流行","新款","精选"]'
          @tabClick='tabClick' />
        <good-list :goods='showGoods' />
      </div>
    </scroll>
    <!-- 在父组件中 对子组件的根绑定一个事件 需要通过native修饰 -->
    <back-top @click.native='backTop' v-show='isShowBackTop'/>
  </div>
</template>
<script>

  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'

  import NavBar from 'common/navbar/NavBar'
  import Scroll from 'common/scroll/Scroll'

  import GoodList from 'content/goods/GoodList'
  import TabControl from 'content/tabControl/TabControl'
  import BackTop from 'content/backTop/BackTop'

  import {itemListenerMixin,backTopMixin} from '@/common/mixins'

  import {
    getHomeMultidata,
    getHomeGoods
  } from 'network/home'

export default {
    name:"Home",
    components:{
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      Scroll,
      GoodList,
      TabControl,
      BackTop
    },
    // 混入的内容 图片加载刷新高度 和 返回顶部
    mixins: [itemListenerMixin,backTopMixin],
    data (){
      return {
        banners: [],
        recommends:[],
        goods:{
          'pop': {page:0, list:[]},
          'new': {page:0, list:[]},
          'sell': {page:0, list:[]}
        },
        currentType: 'pop',
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0,

      }
    },
    computed: {
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    created (){
      //请求多个数据
      this.getHomeMultidata()

      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

        //vue创建好之后 scroll是在mounted才创建的，所以有时候会拿不到
      // this.$bus.$on('itemImageLoad', () => {
      //     this.$refs.scroll.refresh()
      //   })

    },
    mounted(){
      // //1.获取图片加载完成的监听事件
      // //没有传递时间就会等待上一个任务执行完毕，才会继续触发定时任务
      // const refresh = debounce(this.$refs.scroll.refresh)

      // this.itemImageListener = () => {
      //     // this.$refs.scroll.refresh() //不加防抖每一张图片加载完毕，都会去执行
      //     refresh()
      //   }
      // //组件goodlistitem中发出的事件 在这里响应事件
      //  this.$bus.$on('itemImageLoad',this.itemImageListener)
      //  //2.获取tabControl的offset (由于banner中的图片还没有加载完成，所以获取的不准确)
      // // console.log(this.$refs.tabControl.$el.offsetTop)
    },
    //销毁后
    destroyed(){
      console.log('home destroyed')
    },
    //处于活跃时
    activated(){
      this.$refs.scroll.refresh()//刷新一次
      this.$refs.scroll.scrollTo(0,this.saveY,0)
    },
    //停用后
    deactivated(){ //保存原来的位置
      this.saveY = this.$refs.scroll.getScrollY()
      this.$bus.$off('itemImageLoad',this.itemImageListener)
    },
    methods: {
      /*
      * 事件监听相关方法
      *
       */
       //点击切换当前类型
      tabClick(index){
        switch (index){
          case 0 : this.currentType = 'pop';
          break;
          case 1 : this.currentType = 'new';
          break;
          case 2 : this.currentType = 'sell';
          break;
        }
        this.$refs.tabControl1.currentIndex =  index
        this.$refs.tabControl2.currentIndex =  index
      },
      // 此功能已经混入=====================================mixins
      //  // 点击顶部按钮返回
      // backTop(){
      //   //父组件通过$refs拿到子组件中的数据
      //   // console.log(this.$refs.scroll.scroll)
      //   this.$refs.scroll.scrollTo(0,0) //第三个值默认500
      // },
      //上拉操作
      contentScroll(position){
        const positionY = -position.y
        // 此功能已经混入===================================mixins
        // this.isShowBackTop = (-position.y) > 1000
        this.ListenShowBackTop(positionY) //混入的方法

        this.isTabFixed = positionY > this.tabOffsetTop
      },
      //下拉加载跟多
      loadMore(){
        // this.$refs.scroll.refresh()
        this.getHomeGoods(this.currentType)
        // this.$bus.$on('itemImageLoad', () => {
        //   this.$refs.scroll.refresh()
        // })
      },
      swiperImageLoad (){
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },
      /**
       * 网络请求相关操作
       */
      getHomeMultidata(){
          getHomeMultidata().
          then(res => {
            // console.log(res.data.recommend.list)
            this.banners = res.data.banner.list
            this.recommends= res.data.recommend.list
          }).
          catch(err => {
            console.log(err)
          })
      },
      getHomeGoods(type){
        //加载时页码加一页
        const page = this.goods[type].page + 1
        getHomeGoods(type,page).then(res =>{
          // console.log(res)
          //不能直接赋值，因为向上拉时，需要请求得到数据，，
          // this.goods[type] = res.data.list
          //res.data.list中的每一个元素单独追加到list数组中
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1 //请求后多了一页数据，页码也要加1

          this.$refs.scroll.finishPullUp()
        })
      }


    }
  }
</script>
<style scoped>
#home {
  /*padding-top: 44px;*/
  /*vh: viewport height */
  height: 100vh; /*获取视口的高度*/
  position: relative;
}
.home-nav{
  background-color: var(--color-tint);
  font-weight: 700;
  color: #fff;
/*
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 6;*/
}
.fixed{
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  z-index: 6;
}

/*在content里面会随着scroll的滚动而滚动*/
/*.fixed{
  position: fixed;
  left: 0;
  right: 0;
  top: 44px;
}*/
.content{
  /*前面父级元素的高度给了视口的高度，content也就继承了视口的高度，在视口中高度*/
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden;
}
.content{
  /*给home加pddding 44 就是 100%-49  因为在base.css中设置了box-sizing模式*/
  /*给content加margin-top 44 就是 100%-93 */
  /*height: calc(100% - 93px);*/
  /*overflow: hidden;*/
  /*margin-top: 44px;*/
  /*margin-bottom: 49px;*/
}
</style>
