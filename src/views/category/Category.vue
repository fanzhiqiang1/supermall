<template>
  <div id="category">
    <nav-bar class="category-nav"><div slot="center">商品分类</div></nav-bar>
    <div class="content">
<!--      被点击后记录索引值 触发事件拿到数据-->
      <tab-menu ref='tabMenu' :categories="categories" @itemClick="itemClick"></tab-menu>
      <scroll id="tab-content" ref="scroll" @pullingUp='loadMore'>
          <tab-content @imageLoad="imageLoad" :subcategories="showSubcategory"></tab-content>
          <tab-control :titles="['综合','新品','销量']" @tabClick='tabClick'></tab-control>
         <tab-content-detail :category-detail="showCategoryDetail"></tab-content-detail>
      </scroll>
    </div>
  </div>
</template>
<script>
  import NavBar from 'components/common/navbar/NavBar'
  import TabMenu from './childComps/TabMenu'
  import TabContent from './childComps/TabContent'
  import TabContentDetail from './childComps/TabContentDetail';
  import {getCategory,getSubCategory,getCategoryDetail} from 'network/category'
  import {backTopMixin, itemListenerMixin} from '@/common/mixins'
  import {POP,NEW,SEll} from '@/common/const'
  //不能太依赖一个项目，一般要封装，在投入使用
  import Scroll  from 'components/common/scroll/Scroll'
  import TabControl from 'content/tabControl/TabControl'

  export default {
    name:"Category",
    components: {
      NavBar,
      TabMenu,
      TabContent,
      Scroll,
      TabControl,
      TabContentDetail
    },
    data(){
      return {
        categories: [],
        categoryData: {},
        currentIndex: -1,
        currentType: 'pop'
      }
    },
  computed: {
    showSubcategory() {
      if (this.currentIndex === -1) return {}
      return this.categoryData[this.currentIndex].subcategories
    },
    showCategoryDetail() {
      if (this.currentIndex === -1) return []
      return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
    }
  },
    mixins: [itemListenerMixin, backTopMixin],
    created(){
      this._getCategory()
    },
  updated() {
    this.$refs.scroll.refresh()
  },
    methods: {
      _getCategory(){
        getCategory().then(res => {
          this.categories = res.data.category.list
          for (let i = 0; i < this.categories.length; i++){
            this.categoryData[i] = {
              subcategories:{},
              categoryDetail: {
                'pop': [],
                'new': [],
                'sell': []
              }
            }
          }
          // console.log(this.categories); // tab对应的分类
          this._getSubCategory(0)
        })
      },
      _getSubCategory(index){
        this.currentIndex = index
        const maitKey = this.categories[index].maitKey;
        getSubCategory(maitKey).then(res => {
          this.categoryData[index].subcategories = res.data
          this.categoryData ={...this.categoryData}
          this._getCategoryDetail(POP)
          this._getCategoryDetail(SEll)
          this._getCategoryDetail(NEW)
        })
      },
      _getCategoryDetail(type){
        const miniWallkey = this.categories[this.currentIndex].miniWallkey
        getCategoryDetail(miniWallkey,type).then(res => {
          this.categoryData[this.currentIndex].categoryDetail[type] = res
          this.categoryData = {...this.categoryData}
        })
      },
      itemClick(index){
        this.currentIndex = index
        this._getSubCategory(this.currentIndex)
      },
      tabClick(index){
        switch (index){
          case 0: this.currentType = POP;
          break;
          case 1: this.currentType = NEW;
          break;
          case 2: this.currentType = SEll;
          break;
        }
      },
      loadMore() {
        this._getCategoryDetail(this.currentType)
      },
      imageLoad() {
        this.newRefresh()
      }
    }
  }
</script>
<style scoped>
  .dv1{
    height: 3000px;
    background-color: #999999;
  }
  #category{
    height: 100vh;
    position: relative;
  }
  .content {
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;
    overflow: hidden;
    display: flex;
  }

  #tab-content {
    width: 70%;
  }
.category-nav{
  background-color: var(--color-tint);
  font-weight: 700;
  color: #fff;
}
</style>
