/**
 * 创建一个仓库
 */
function createStore(reducer) {
    let state ;
    let listeners = []
    function getState(){
        // 深拷贝
        return JSON.parse(JSON.stringify(state))
    }
    /**
     * 
     * @param {*} action 
     */
    // 接收一个action动作 描述你想干啥
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
    return{
        getState,
        dispatch,
        subscribe
    }
}
export default createStore;