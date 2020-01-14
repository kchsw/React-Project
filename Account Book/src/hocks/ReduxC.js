//使用useReducer实现redux功能

import React from 'react';
import ColorArea from './ColorArea'
import Buttons from './Buttons'
import Color from './Color'


function ReduxC() {
    return (
        <div>
            <Color>
                <ColorArea />
                <Buttons />
            </Color>
            
        </div>
    )
}

export default ReduxC