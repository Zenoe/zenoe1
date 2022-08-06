
const removeFromArray = (arr, ele)=>{
  const idx = arr.indexOf(ele);
  if(idx > -1){
    arr.splice(idx, 1)
  }
}

const toISOStringWithTimezone = date => {
  // 2022-05-11T13:21:13+08:00
  const tzOffset = -date.getTimezoneOffset();
  const diff = tzOffset >= 0 ? '+' : '-';
  const pad = n => `${Math.floor(Math.abs(n))}`.padStart(2, '0');
  return date.getFullYear() +
    '-' + pad(date.getMonth() + 1) +
    '-' + pad(date.getDate()) +
    'T' + pad(date.getHours()) +
    ':' + pad(date.getMinutes()) +
    ':' + pad(date.getSeconds()) +
    diff + pad(tzOffset / 60) +
    ':' + pad(tzOffset % 60);
};

/* control the frequency of function execution */
const throttleFn  = (fn, delay) =>{
  // set a flag outside the return function to determine if the interval threshold has been reached
  let lastCall = 0
  return function (...args) {
    const now = new Date().getTime()
    if (now - lastCall < delay) {
      return
    }
    lastCall = now
    return fn(...args)
  }
}
// const throttleFunc = (func, interval) => {
//   let shouldFire = true;
//   return function() {
//     if (shouldFire) {
//       func();
//       shouldFire = false;
//       setTimeout(() => {
//         shouldFire = true;
//       }, interval)
//     }
//   }
// }
/* wait for a certain amount of time before running */
const debounceFn = (fn, delay) => {
  let timer
  return function(...args) {
    // clear the timer before calling setTimeout(this help in restricing multiple timer instances)
    clearTimeout(timer)
    // copy the 'this' context outside the asynchronous setTimeOut
    const context = this
    timer = setTimeout(()=>{
      // As it's a asynchronous function, we need to pass the context object
      fn.apply(context, args)
    }, delay)
  }
}
module.exports = {
  debounceFn,
  throttleFn,
  removeFromArray,
}
