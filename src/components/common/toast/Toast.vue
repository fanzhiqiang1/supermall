<template>
  <div v-show='isShow' class="toast">
    {{message}}
  </div>
</template>
<script>
  export default {
    name:"Toast",
    props:{
      // message:{
      //   type:String,
      //   default:''
      // },
      // show:{
      //   type:Boolean,
      //   default: false
      // }
    },
    data(){
      return {
        message: ' ',
        isShow: false
      }
    },
    methods:{
      show(message,duration = 2000){
        this.message = message
        this.isShow = true
        setTimeout(() => {
          this.message = ''
          this.isShow = false
        },duration)
      }
    }
  }
</script>
<style>
.toast{
  position: fixed;
  z-index: 999;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  border-radius: 5px;
  background-color: rgb(0,0,0,.6);
  color: #fff;
  text-align: center;
  padding: 5px 8px;
  font-size: 14px;
}
</style>
