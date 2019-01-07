import * as React from 'react';

export interface ButtonProps {
    scale:'small' | 'normal' | 'big',
    type:'primary' | 'secondary' | 'cancel' | 'dark' | 'gray',
    outline: boolean
}

export default class Button extends React.Component<ButtonProps,{}>{
    render(){
        console.log(this.props)
        return(
            <div>222</div>
        )
    }
}
