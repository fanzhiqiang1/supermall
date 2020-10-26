<template>
   <swiper>
      <swiper-item v-for='item in banners' :key='item.index'>
        <a :src='item.link'>
          <img :src='item.image' alt="" @load='imageLoad'>
        </a>
      </swiper-item>
    </swiper>
</template>
<script>
import {Swiper,SwiperItem} from 'common/swiper'
  export default {
    name:"HomeSwiper",
    props:{
      banners:Array
    },
    data(){
      return {
        isLoad: false
      }
    },
    methods: {
      imageLoad (){
        if (!this.isLoad) {
          this.$emit('swiperImageLoad')
          this.isLoad = true
        }
      }
    },
    components:{
      Swiper,
      SwiperItem
    }
  }
</script>
