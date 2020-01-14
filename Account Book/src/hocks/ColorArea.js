import React, { useContext }from 'react';
import { ColorContext } from './Color'

function ColorArea() {
    const { color } = useContext(ColorContext)
    return (
        <h2 style={{color: color}}>字体颜色为{color}</h2>
    )
}

export default ColorArea