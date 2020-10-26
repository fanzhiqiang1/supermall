import Toast from './Toast'

const obj = {}

obj.install = function (Vue){
  // Toast.$el 没有通过render渲染
  // Vue.extend(Toast)
  // console.log(Toast.$el)
  // document.body.appendChild(Toast.$el)

  //1.创建组件构造器
  const toastConstructor = Vue.extend(Toast)
  //2.new的方式 根据组件构造器 创建初组件对象
  const toast = new toastConstructor()
  //3.将组件对象，手动挂载到一个元素上
  toast.$mount(document.createElement('div'))
  //4。将toast追加到div中
  document.body.appendChild(toast.$el)

  //传入Vue实例中
  Vue.prototype.$toast = toast

}
export default obj
