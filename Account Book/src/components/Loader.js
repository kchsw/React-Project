import React from 'react';
import Ionicon from 'react-ionicons'

const Loader = () => {
    return (
        <div className="loading-component text-center my-1"> 
            <Ionicon icon="ios-refresh"
                fontSize="40px"
                color="#347eff"
                rotate={true}
            />
            <span>努力加载中</span>
        </div>
    )
}

export default Loader