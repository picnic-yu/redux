import  React from 'react';
import  ReactDOM from 'react-dom';
function Button(){
    return(
        <div>222</div>
    )
}


let appState = {
    title:{
        color:'red',
        text:'标题1'
    },
    content:{
        color:'green',
        text: '标题2'
    }
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
function renderApp(appState) {
    renderTitle(appState.title);
    renderContent(appState.content)
}
renderApp(appState)
ReactDOM.render(
    <Button />,document.getElementById('root') 
)
