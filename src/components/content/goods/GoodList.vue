<template>
  <div class="goods">
    <good-list-item v-for='item in goods' :goods-item='item' />
  </div>
</template>
<script>
  import GoodListItem from './GoodListItem'
  export default {
    name:"GoodList",
    components:{
      GoodListItem
    },
    props:{
        goods: {
          type: Array,
          default: []
        }
    }
  }
</script>
<style scoped>
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
/*justify-content: space-evenly;*/
  padding:2px;
}
</style>
