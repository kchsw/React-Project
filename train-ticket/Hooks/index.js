import React, { Component, useContext, createContext, lazy, Suspense, memo, PureComponent, useState }from 'react';
const BatteryContext = createContext()
const onLineContext = createContext()

const About = lazy(() => import(/* webpackChunkName: 'about' */'./About.js'))
// lazy需和Suspen配合使用
//ErrorBoundary 错误边界
//componentDIdCatch
// static getDerivedStateFromError() {
//     return {
//         hasError: true
//     }
// }
//memo 用在函数式组件中实现 PureComponent 的效果
//useState 按照运行的顺序来返回特定的state

// const double = useMemo(() => {
//     return count * 2
// }, [count === 2]) 
//当数组中的值发生变化时会重新计算 false=>true true => false
const LeafA = memo(function LeafA() {
    return (
        <BatteryContext.Consumer>
            {
               battery => (
                   <onLineContext.Consumer>
                       {
                           value => <h1>LeafA: {battery} LeafB: {value}</h1> 
                       }
                   </onLineContext.Consumer>
               ) 
            }
        </BatteryContext.Consumer> 
    )
})

class LeafC extends Component {
    static contextType = BatteryContext
    state = {  }
    render() { 
        const battery = this.context
        return (  
            <h1>contextType: {battery}</h1> 
        );
    }
}
 

function LeafB() {
    const value = useContext(onLineContext)
    return (
        <h1>LeafB: {value}</h1> 
    )
}



function Minddle() {
    return (
        <>
            <LeafA/>
            <LeafB/>
            <LeafC/>
        </>
    )
}

function HKApp() {
    // console.log(useState(0))
    const battery = 100
    return (
        <onLineContext.Provider value={20}>
        <BatteryContext.Provider value={battery}>
            <Minddle/>
            <Suspense fallback={<h1>loading...</h1>}>
                <About/>
            </Suspense> 
        </BatteryContext.Provider >
        </onLineContext.Provider>
    ) 
}

export default HKApp

// Context 用于跨组件传递数据 
// 3种接受方式 1. Comsumer 2.contextType 3.useContext
//memo 对应shouldComponentShouldUpdate 决定组件是否重新渲染提高性能
// shouldComponentShouldUpdate(nextProps, nextState) {
//     return !(nextProps.value === this.props.value )
// }
// const child = memo(function child(props) {
//     return (
//         <></>
//     )
// })
// useEffect(() => {
    // return  () => {}
// }) 每次都会执行 包括回调清理函数
// useEffect(() => {
    // return  () => {}
// }, []) 只会执行一次 回调清理函数相当于componentWillUnmount

// }) 每次都会执行
// useEffect(() => {

// }, [a]) a的值发生变化时执行
// useMemo 定义一段函数逻辑是否重复执行

// useCallback 确保传入函数的句柄不发生变化
//useRef 获取dom或子组件 同步不同渲染周期之间需要共享的数据
