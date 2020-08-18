import React, { Component } from 'react';
import UserHeader from './components/UserHeader'
import UserMain from './components/UserMain'

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { 
    actions as UserActions,
    getCurrentTab,
    getOrders
} from '../../redux/modules/user'
import { 
    actions as LoginActions,
} from '../../redux/modules/login'

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const { orders, currentTab} = this.props
        return (  
            <div>
                <UserHeader onBack={this.handleBack} onLogout={this.Logout}/>
                <UserMain 
                    orders={orders} 
                    currentTab={currentTab}
                    onTabClick={this.handleTabClikc}
                />
            </div>
        );
    }
    handleBack = () => {
        this.props.history.push('/')
    }
    Logout = () => {
        this.LoginActions.logout()
    }
    componentDidMount() {
        this.props.UserActions.loadOrders()
    }
    handleTabClikc = index => {
        this.props.UserActions.setCurrentTab(index)
    }
}


const mapStateToProps = (state, props) => {
    return {
        currentTab: getCurrentTab(state),
        orders: getOrders(state)
    };
  };
  
const mapDispatchToProps = dispatch => {
    return {
        UserActions: bindActionCreators(UserActions, dispatch),
        LoginActions: bindActionCreators(LoginActions, dispatch)
    };
};
 
 
export default connect(mapStateToProps, mapDispatchToProps)(User)