import React, { Component } from 'react';

// const test = <h1>Hello React</h1>

class Welcome extends Component {
    constructor(props){
        super(props) 
        this.state = {  }
    }
    increase() {
        alert('123')
        console.log(this)
    }
    
    render() { 
        return (
            <h1 
                onClick={() => {this.increase()}}
                //箭头函数指定this的指向
            >Hello Word</h1>
        );
    }
}
 
export default Welcome;