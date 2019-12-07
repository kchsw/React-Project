import React, { Component } from 'react';

export class Tabs extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            // activeIndex: props.activeIndex
        }
    }
    tabChange = (event, index) => {
        event.preventDefault()
        // this.setState({
        //     activeIndex: index
        // })
        this.props.onTabChange(index)
    }
    render() { 
        const { activeIndex } = this.props
        const { children } = this.props
        return (  
            <ul className="nav nav-tabs nav-fill my-4">
                {
                    React.Children.map(children, (child, index) => {
                        const activeClassName = activeIndex === index ? "nav-link active" : "nav-link"
                        return (
                            <li className="nav-item list-item">
                                <a className={activeClassName} 
                                    href="#"
                                    onClick={(e) => {this.tabChange(e, index)}}
                                    role="button"
                                >
                                    {child}
                                </a>
                            </li>
                        )
                    })
                }
            </ul>
        );
    }
}
 

export const Tab = ({children}) => {
    return <>{children}</>
}