<template>
  <div class="tab-content">
      <div class="item-list" v-for="item in subcategories.list">
<!--        <img v-lazy="showImage" alt="" @load='imageLoad'>-->
        <a :href="item.link"><img v-lazy="item.image" :src="item.image" @load="imageLoad" alt=""></a>
        <div class="item-text">{{item.title}}</div>
      </div>
  </div>
</template>

<script>
  export default {
    name: "TabContent",
    props: {
      subcategories:{
        type:Object,
        default: null
      }
    },
    methods: {
      imageLoad() {
        this.$emit('imageLoad')
      }
    }
  }
</script>

<style scoped>
  .tab-content{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    font-size: 12px;
    padding: 20px 8px;
  }
  .item-list{
    width: 75px;
    margin-right: 5px;
    list-style-type: none;
    display: flex;
    flex-flow: row wrap;
  }
  .item-list a{

  }
  .item-list img {
    width: 80%;
  }
  .item-text{
    width: 100%;
    margin: 10px 0;
  }
</style>
