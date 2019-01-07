import  React from 'react';
import  ReactDOM from 'react-dom';
function Button(){
    return(
        <div>222</div>
    )
}

function renderTitle(title) {
    let element = document.querySelector('#title');
    element.innerHTML = title.text;
    element.style.color = title.color;
}
function renderContent(content){
    let element = document.querySelector('#content');
    element.innerHTML = content.text;
    element.style.color = content.color;
}

const UPDATE_TITLE_COLOR = 'UPDATE_TITLE_COLOR'
const UPDATE_TITLE_TEXT = 'UPDATE_TITLE_TEXT'
const UPDATE_CONTENT_COLOR = 'UPDATE_CONTENT_COLOR'
const UPDATE_CONTENT_TEXT = 'UPDATE_CONTENT_TEXT'
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
let initState = {
    title: {
        color: 'red',
        text: '标题1'
    },
    content: {
        color: 'green',
        text: '标题2'
    }
}
// 处理器，根据老的状态和拿到的动作，返回心得zhuang'ta
let reducer = function (state = initState, action) {
    switch (action.type) {
        case 'UPDATE_TITLE_COLOR':
            return {
                ...state,
                title:{
                    ...state.title,
                    color:action.color
                }
            }
            break;
        case 'UPDATE_TITLE_TEXT':
            return {
                ...state,
                title: {
                    ...state.title,
                    text: action.text
                }
            }
            break;
        case 'UPDATE_CONTENT_COLOR':
            return {
                ...state,
                content: {
                    ...state.content,
                    text: action.color
                }
            }
            break;
        case 'UPDATE_CONTENT_TEXT':
            return {
                ...state,
                content: {
                    ...state.content,
                    text: action.text
                }
            }
            break;
        default:
            return state;
            break;
    }
}
let store = createStore(reducer);
function render() {
    renderTitle(store.getState().title);
    renderContent(store.getState().content)
}
render();

let unsubscribe =  store.subscribe(render)
setTimeout(()=>{
    store.dispatch({
        type: UPDATE_TITLE_COLOR,
        color: 'skyblue'
    })
    unsubscribe()
    store.dispatch({
        type: UPDATE_TITLE_TEXT,
        text: 'skyblue'
    })
},2000);























ReactDOM.render(
    <Button />,document.getElementById('root') 
)
