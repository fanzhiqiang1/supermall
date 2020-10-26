<template>
  <div class="buttom-bar">
    <div class="check-content">
          <check-button
            class="check-all"
            :is-checked='checkAll'
            @click.native='checkClick' />
          <span>全选</span>
    </div>
    <div class="price">
        合计:{{toPirce}}
    </div>
    <div class="calclate">
      结算:({{checkeLength}})
    </div>
  </div>
</template>
<script>
  import CheckButton from 'components/content/checkButton/CheckButton'
  import {mapGetters} from 'vuex'
  export default {
    name:"CartButtonBar",
    components: {
      CheckButton
    },
    computed:{
      ...mapGetters(['cartList','cartLength']),
      toPirce(){
        return this.$store.getters.cartList.filter(item => {
          return item.checked
        }).reduce((preValue,item) => {
          return preValue += item.price * item.count
        },0).toFixed(2)
      },
      checkeLength(){
        return this.$store.state.cartList.filter(item => {
          return item.checked
        }).length
      },
      checkAll(){
        if (this.cartLength === 0) return false
        //使用filter 返回的是没有被选中的长度 如果为0
        // return !(this.cartList.filter(item => !item.checked).length)

        // cartList 中 有一个没有被选中 就返回 false ,如果全部选中就返回true
        // return !this.cartList.find(item => !item.checked)

        //forEach
        for(let item of this.cartList){
          if (!item.checked) {
            return false
          }
        }
        return true
      }
    },
    methods: {
        checkClick(){
        // checkAll选中时 点击 修改item.checked , checkAll中的值也会发生改变
        if (this.checkAll) {
          this.cartList.forEach(item => item.checked = false)
        }else{
          this.cartList.forEach(item => item.checked = true)
        }

        //item.checked值被修改后 checkAll的值也会被修改
        // this.cartList.forEach(item => item.checked = !this.checkAll)
      }
    }
  }
</script>
<style scoped>
.buttom-bar{
  height: 40px;
  line-height: 40px;
  position: relative;
  display: flex;
  background-color: #eef;
  text-align: center;
  font-size: 14px;

}
.check-content{
  display: flex;
  width: 60px;
  align-items: center;
  margin-left: 10px;

}
.check-all{
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}
.price{
  flex: 1;
  /*margin-left: 20px;*/
}
.calclate{
  width: 80px;
  background-color: red;
  color: #fff;
}
</style>
