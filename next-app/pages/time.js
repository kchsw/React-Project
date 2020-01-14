import React, { useState } from 'react';
// import moment from 'moment'
import dynamic from 'next/dynamic'

//第三方库的懒加载

//组件懒加载
const DynamicLazy = dynamic(import('../components/lazy'))

function Time() {
    const [ currentTime, setTime ] = useState(Date.now())
    const changeTime = async () => {
        const moment = await import('moment')
        setTime(moment.default(Date.now()).format())
    }
    return (
        <>
        <h1>{currentTime}</h1>
        <button onClick={changeTime}>切换时间格式</button>
        <DynamicLazy />
        </>
    )
}

export default Time