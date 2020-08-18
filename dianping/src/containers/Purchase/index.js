import React, { Component } from 'react';
import Header from '../../components/Header'
import PurchaseForm from './components/PurchaseForm'
import Tip from '../../components/Tip'

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { 
    actions as purchaseActions,
    getQuantity,
    getTipStatus,
    getProduct,
    getTotalPrice
} from '../../redux/modules/purchase'
import { getUsername } from '../../redux/modules/login'
import { actions as detailActions } from '../../redux/modules/detail'

class Purchase extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    handleBcak = () => {
        this.props.history.goBack()
    }
    handleSubmit = () => {
        const productId = this.props.match.params.id
        this.props.purchaseActions.submitOrder(productId)
    }
    handleSetQuantity = (quantity) => {
        this.props.purchaseActions.setOrderQuantity(quantity)
    }
    handleCloseTip = () => {
        this.props.purchaseActions.closeTip()
        this.props.history.push('/user')
    }
    render() { 
        const { product, quantity, phone, showTip, totalPrice } = this.props
        return (  
            <div>
                <Header title='下单' onBack={this.handleBcak}/>
                { product &&  
                    <PurchaseForm 
                        quantity={quantity}
                        phone={phone}
                        onSubmit={this.handleSubmit}
                        onSetQuantity={this.handleSetQuantity}
                        totalPrice={totalPrice}
                    />
                }
                {
                   showTip && <Tip message="下单吗" onClose={this.handleCloseTip}/>
                }
            </div>
        );
    }
    componentDidMount() {
        const { product } = this.props
        if(!product) {
            const productId = this.props.match.params.id
            this.props.detailActions.loadProductDetail(productId)
        }
    }
    // componentWillMount() {
    //     this.props.purchaseActions.setOrderQuantity(1)
    // }
    UNSAFE_componentWillMount() {
        this.props.purchaseActions.setOrderQuantity(1)
    }
}

const mapStateToProps = (state, props) => {
    const productId = props.match.params.id
    return {
        product: getProduct(state, productId),
        quantity: getQuantity(state),
        showTip: getTipStatus(state),
        phone: getUsername(state),
        totalPrice: getTotalPrice(state, productId)
    };
  };
  
const mapDispatchToProps = dispatch => {
    return {
        purchaseActions: bindActionCreators(purchaseActions, dispatch),
        detailActions: bindActionCreators(detailActions, dispatch)
    };
};
 
export default connect(mapStateToProps, mapDispatchToProps)(Purchase)
 