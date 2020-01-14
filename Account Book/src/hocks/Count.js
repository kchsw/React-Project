import React, { useState , useContext } from 'react';
import { CountContext } from './Hocks'

function Count(){
    const count = useContext(CountContext)
    return (<h2>{count}</h2>)
} 

export default Count
