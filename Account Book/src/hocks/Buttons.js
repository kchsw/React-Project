import React, { useContext } from 'react';
import { ColorContext, UPADTE_COLOR } from './Color'

function Buttons() {
    const { dispatch } = useContext(ColorContext)
    return (
        <div>
            <button onClick={() => {dispatch({type: UPADTE_COLOR, color: 'red'})}}>红色</button>
            <button onClick={() => {dispatch({type: UPADTE_COLOR, color: 'yellow'})}}>黄色</button>
        </div>
    )
}

export default Buttons