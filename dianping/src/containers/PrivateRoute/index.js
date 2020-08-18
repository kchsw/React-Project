import React from 'react';
import { Route, Redirect } from 'react-router-dom'
import { connect } from "react-redux";
import { 
    isLogin
} from '../../redux/modules/login'
const PrivateRoute = (props) => {
    const { component: Component, isLogin, ...rest } = props
    return (  
        <Route 
            {...rest}
            render={
                props => {
                    return isLogin ?
                        (<Component {...props}/>) :
                        (<Redirect to={{pathname: '/login', state: {from: props.location}}} />)
                }
            }
        />
    );
}

const mapStateToProps = (state, props) => {
    return {
        isLogin: isLogin(state)
    };
};
  
export default connect(mapStateToProps, null)(PrivateRoute);