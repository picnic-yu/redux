## 实现简易版本redux 
主要用到的是发布订阅模式来实现

```
function dispatch(action) {
    state = reducer(state,action);
    // 通知所有的监听函数执行
    listeners.forEach((listener) => {
        listener()
    });
}
// 传入空对象是为了实现state初始化
dispatch({})
// 订阅，供外界订阅仓库中状态的变化，如果变化了执行订阅的逻辑
function subscribe(listener){
    // 订阅
    listeners.push(listener);
    // 返回取消订阅函数
    // 过滤数组
    return function (){
        listeners = listeners.filter(item => item != listener);
    }
}
```