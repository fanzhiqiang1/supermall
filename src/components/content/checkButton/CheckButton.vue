<template>
  <div class="check-button" :class="{active: isChecked}">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>
<script>
  export default {
    name:"CheckButton",
    props:{
      isChecked:{
        type:Boolean,
        default: false
      }
    }
  }
</script>
<style scoped>
.check-button {
  text-align: center;
  border: 2px solid #aaa;
  border-radius: 50%;
}
.active {
  background-color: var(--color-high-text);
  border-color: var(--color-high-text);

  /*display: flex;
  align-items: center;*/

}
</style>
