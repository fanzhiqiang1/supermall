import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutations-types'
export default {
    addCart(content,payload){ //actions处理异步状态
      return new Promise((resolve,reject) => {
        let oldProduct = content.state.cartList.find(item =>  item.iid == payload.iid )// 注意ES6函数的返回值问题
          if (oldProduct) {
            // oldProduct.count += 1
            content.commit(ADD_COUNTER,oldProduct)
            resolve('当前商品数量+1')
          }else{
            payload.count = 1
            content.commit(ADD_TO_CART,payload)
            resolve('添加了新的商品')
          }
        })
    }
}
