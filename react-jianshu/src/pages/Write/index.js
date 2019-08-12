import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
class Write extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const { logined } = this.props
        if(logined){
            return (  
               <div>Writer</div>
            );
        }else{
            return <Redirect to="/login"/>
        }
        
    }
}

const mapState = (state) => ({
    logined: state.getIn(['login', 'logined'])
})

const mapAction = (dispatch) => ({
})
 
export default connect(mapState, mapAction)(Write);