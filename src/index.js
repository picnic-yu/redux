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
function renderApp(state) {
    renderTitle(state.title);
    renderContent(state.content)
}
const UPDATE_TITLE_COLOR = 'UPDATE_TITLE_COLOR'
const UPDATE_TITLE_TEXT = 'UPDATE_TITLE_TEXT'
const UPDATE_CONTENT_COLOR = 'UPDATE_CONTENT_COLOR'
const UPDATE_CONTENT_TEXT = 'UPDATE_CONTENT_TEXT'
/**
 * 创建一个仓库
 */
function createStore(){
    let state = {
        title: {
            color: 'red',
            text: '标题1'
        },
        content: {
            color: 'green',
            text: '标题2'
        }
    }
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
        switch (action.type) {
            case 'UPDATE_TITLE_COLOR':
                state.title.color = action.color;
                break;
            case 'UPDATE_TITLE_TEXT':
                state.title.text = action.text;
                break;
            case 'UPDATE_CONTENT_COLOR':
                state.content.color = action.color;
                break;
            case 'UPDATE_CONTENT_TEXT':
                state.content.text = action.text;
                break;
            default:
                break;
        }
    }
    return{
        getState,
        dispatch
    }
} 
let store = createStore();
renderApp(store.getState());
setTimeout(()=>{
    store.dispatch({
        type: UPDATE_TITLE_COLOR,
        color: 'skyblue'
    })
    store.dispatch({
        type: UPDATE_TITLE_TEXT,
        text: 'skyblue'
    })
    renderApp(store.getState());
},2000);























ReactDOM.render(
    <Button />,document.getElementById('root') 
)
