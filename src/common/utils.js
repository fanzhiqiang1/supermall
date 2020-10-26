export function debounce(func, delay){
 //防抖：当短期内有大量的事件触发时，只会执行最后一次触发的事件。
        let timer = null
        return function (...args){
          if (timer) clearTimeout(timer)
          timer = setTimeout(() => {
            //改变func指向为this
            func.apply(this,args) //args作为this的参数传递给refresh中参数
          },delay)
        }

        //   timer = setTimeout(() => {
        //     func(...args)
        //   },delay)
        // }
}

export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero (str) {
  return ('00' + str).substr(str.length);
};


