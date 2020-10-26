<template>
  <div class="goods-item" @click='itemClick'>
    <!-- @load 图片加载完成绑定事件 -->
<!--     <img :src="showImage" alt="" @load='imageLoad'>-->
    <!-- 使用图片懒加载 -->
    <img v-lazy="showImage" alt="" @load='imageLoad' />
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">￥{{showPrice}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>
<script>
  export default {
    name:"GoodListItem",

    props:{
      goodsItem: {
        type: Object,
        default: {}
      }
    },
    computed: {
      showPrice(){
        return  this.goodsItem.price || this.goodsItem.orgPrice
      },
      showImage(){
        return this.goodsItem.img || this.goodsItem.image || this.goodsItem.show.img
        //换位置会出错 是因为 keep-alive中 保存了组件中的数据不被销毁 this.goodsItem.show.img中的数据还存在
        //所以才会返回this.goodsItem.show.img 可是在这里需要使用 this.goodsItem.image数据
        // return this.goodsItem.show.img  || this.goodsItem.image
      }
    },
  created() {
  },
    methods: {
        imageLoad(){
          //通过事件总线发射一个事件
          this.$bus.$emit('itemImageLoad')
        },
        //点击时跳转并传递参数
        itemClick(){
          this.$router.push('/detail/'+ (this.goodsItem.iid || this.goodsItem.item_id))
        }
      }

  }
</script>
<style scoped>
.goods-item {
  position: relative;
  padding-bottom: 40px;
  width: 48%;
}
.goods-item img {
  width: 100%;
  border-radius: 5px;
}
.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}
.goods-info p {
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}
.goods-info .price{
  color: var(--color-high-text);
  margin-right: 20px;
}
.goods-info .collect{
  position: relative;
}
.goods-info .collect::before{
  content: '';
  position: absolute;
  bottom: 0;
  left: -15px;
  right: 0;
  width: 14px;
  height: 14px;
    /*0 0 是图片的位置 14px 14px 是图片的大小*/
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  /*background: url(~assets/img/common/collect.svg);*/
}



















/* .goods-item {
    padding-bottom: 40px;
    position: relative;
    width: 48%;
  }
  .goods-item img {
    width: 100%;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: 0;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }*/
</style>
