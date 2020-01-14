import React, { createContext, useReducer, useState, useEffect, useCallback } from 'react';

export const ColorContext = createContext({})
export const UPADTE_COLOR = 'UPADTE_COLOR'

const reducer = (state, action) => {
     switch(action.type){
        case UPADTE_COLOR:
            return action.color
        default:
            return state
     }
}

//自定义Hooks函数

function useWinSize(){
    const [ size, setSize ] = useState({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
    })

    const onResize = useCallback(() => {
        setSize({
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        })
    }, [])
    useEffect(() => {
        window.addEventListener('resize', onResize)
        return () => {
            window.removeEventListener('resize', onResize)
        }
    }, [])

    return size
}

function Color(props) {
    const [ color, dispatch ] = useReducer(reducer, 'blue')
    const size = useWinSize()
    console.log(size)
    return (
        <ColorContext.Provider value={{color, dispatch}}>
            {props.children}
        </ColorContext.Provider>
    )
}

export default Color