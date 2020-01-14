import React, { useState, useEffect, createContext, useReducer } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import Count from './Count'

export const CountContext = createContext()
//父组件通过createContext传值子组件通过useContext接受

function Example() {
    // const [ count, setCount ] = useState(0)
    const [ count, dispatch ] = useReducer((state, action) => {
        switch(action){
            case 'add': 
                return state + 1
            case 'reduce':
                return state - 1
            default:
                return state
        }
    }, 0)
    return (
        <div>
            {/* <p>You clicked {count} times</p> */}
            {/* <button onClick={() => {setCount(count + 1)}}>click</button> */}
            <button onClick={() => {dispatch('add')}}>add</button>
            <button onClick={() => {dispatch('reduce')}}>reduce</button>
            <CountContext.Provider value={count}>
                <Count/>
            </CountContext.Provider>
            <Router>
                <ul>
                    <li> <Link to="/">首页</Link> </li>
                    <li><Link to="/list/">列表</Link> </li>
                </ul>
                <Route path="/" exact component={Index} />
                <Route path="/list/" component={List} />
            </Router>
        </div>
    )
}

function Index() {
    useEffect(()=>{
        console.log('useEffect=>来了！Index页面')
        return ()=>{
            console.log('走了!Index页面')
        }//解绑函数
    }, []) 
    return <h2>nmsl</h2>;
}
//组件销毁时执行解绑函数， [count] count值发生变化时执行effect函数, []只运行一次

function List() {
    useEffect(()=>{
        console.log('useEffect=> 来了！list页面')
        return ()=>{
            console.log('走了!list页面')
        }
    }, [])
    return <h2>nmhl</h2>;
}

export default Example