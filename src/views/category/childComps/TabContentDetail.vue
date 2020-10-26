<template>
<grid-view>
<!--  <pre>{{categoryDetail[0].img}}</pre>-->
  <good-list-item v-for="(item,index) in categoryDetail" :key="index" :goodsItem="item"></good-list-item>
</grid-view>
</template>

<script>
  import GoodListItem from "content/goods/GoodListItem";
  import gridView from 'common/gridView/GridView'
export default {
  name: "",
  props:{
    categoryDetail: {
      type: Array,
      default: []
    }
  },
  components:{
    gridView,
    GoodListItem
  }
}
</script>

<style scoped>

</style>
