import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutations-types'
export default {
//mutations 这里只处理state中的数据
    [ADD_TO_CART](state,payload){
      payload.checked = true
        state.cartList.push(payload)
    },
    [ADD_COUNTER](state,payload){
        payload.count++
    }
}
