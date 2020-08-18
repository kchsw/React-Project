import React, { Component } from 'react';
import ProductOverview from './components/ProductOverview'
import ShopInfo from './components/ShopInfo'
import Detail from './components/Detail'
import Remark from './components/Remark'
import BuyButton from './components/BuyButton'
import Header from '../../components/Header'

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actions as DetailActions, getProduct, getRelatedShop } from '../../redux/modules/detail'

class ProductDeail extends Component {
    state = { }
    render() { 
        const { product, relatedShop  } = this.props
        return (  
            <>
                <Header title='团购详情' onBack={this.onBack} grey/>
                { product && <ProductOverview data={product}/> }
                { product && relatedShop && <ShopInfo data={relatedShop} total={product.shopIds.length}/>}
                {
                    product &&
                    <>
                        <Detail data={product}/>
                        <Remark data={product}/>
                        <BuyButton productId={product.id}/>
                    </>
                }
            </>
        );
    }
    componentDidMount() {
        const { product } = this.props
        if(!product) {
            const productId = this.props.match.params.id
            this.props.detailActions.loadProductDetail(productId)
        } else if(!this.props.relatedShop) {
            this.props.detailActions.loadShopById(product.nearestShop)
        }
    }

    componentDidUpdate(preProps) {
        if(!preProps.product && this.props.product) {
            this.props.detailActions.loadShopById(this.props.product.nearestShop)
        }
    }

    onBack = () => {
        this.props.history.goBack()
    }
}

const mapStateToProps = (state, props) => {
    const productId = props.match.params.id
    return {
        product: getProduct(state, productId),
        relatedShop: getRelatedShop(state, productId)
    };
  };
  
const mapDispatchToProps = dispatch => {
    return {
        detailActions: bindActionCreators(DetailActions, dispatch)
    };
};
 
export default connect(mapStateToProps, mapDispatchToProps)(ProductDeail);