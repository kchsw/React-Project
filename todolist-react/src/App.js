import React, { Component, Fragment } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import './App.css'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
            list: ['hello']
        }
        this.handleToggole = this.handleToggole.bind(this)
        this.handleAddItem = this.handleAddItem.bind(this)
    }
    render() { 
        return ( 
            <Fragment>
                {/* <CSSTransition
                    in={this.state.show}
                    timeout={1000}
                    classNames='fade'
                    unmountOnExit
                    // 移除dom 
                    onEntered={(el) => {el.style.color = 'blue'}}
                    appear={true}
                >
                    <div>Hello Word!</div>
                </CSSTransition> */}
                {/* <div className={this.state.show ? 'show' : 'hide'}>Hello Word!</div> */}
                
                {/* <button onClick={this.handleToggole}>Toggole</button> */}
                <TransitionGroup>
                    {
                        this.state.list.map((item, index) => {
                            return (
                                <CSSTransition
                                    timeout={1000}
                                    classNames='fade'
                                    unmountOnExit
                                    onEntered={(el) => {el.style.color = 'blue'}}
                                    key={index}
                                >
                                    <div>{item}</div>
                                </CSSTransition>
                            )
                        })
                    }
                </TransitionGroup>
                <button onClick={this.handleAddItem}>Toggole</button>
            </Fragment> 
        );
    }

    handleToggole(){
        let show = this.state.show
        this.setState({
            show: !show
        })
    }
    handleAddItem(){
        this.setState((prevState) => {
            return {
                list: [...prevState.list, 'item']
            }
        })
    }
}
 
export default App;