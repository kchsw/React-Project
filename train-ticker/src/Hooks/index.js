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