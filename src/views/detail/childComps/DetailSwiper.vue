<template>
  <swiper class='detail-swiper'>
    <swiper-item v-for='item in topImages'>
      <img :src="item" alt="">
    </swiper-item>
  </swiper>
</template>
<script>
  import {Swiper,SwiperItem} from 'common/swiper'
  export default {
    name:"DetailSwiper",
    props:{
      topImages:{
        type: Array,
        default:[]
      }
    },
    components: {
      Swiper,
      SwiperItem
    }
  }
</script>
<style scoped>
  .detail-swiper {
    height: 300px;
    overflow: hidden;
  }
 /* .detail-swiper img{
    height: 300px;
  }*/
</style>
