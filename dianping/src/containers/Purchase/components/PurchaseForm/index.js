import React from 'react';
import './index.css'

const PurchaseForm = (props) => {
    const { quantity, phone, totalPrice } = props
    // const totalPrice = (product.currentPrice * quantity).toFixed(1)
    const handleDecrease = () => {
        if(quantity === 1) return 
        props.onSetQuantity(quantity - 1)
    }   
    const handleIncrease = () => {
        props.onSetQuantity(quantity + 1)
    }
    const handleChange = (e) => {
        const quantity = e.target.value < 0 ? 1 : e.target.value

        props.onSetQuantity(+quantity)
    }
    const handleSubmit = () => {
        if(quantity > 0) {
            props.onSubmit()
        }
    }
    return (  
        <div className="PurchaseForm">
            <div className="PurchaseForm__wrapper">
                <div className="PurchaseForm__row">
                    <div className="PurchaseForm__rowLabel">数量</div>
                    <div className="PurchaseForm__rowValue">
                        <span className="purchaseForm__counter--dec"
                            onClick={handleDecrease}
                        >-</span>
                        <input className="purchaseForm__quantity"
                            type="number"
                            onChange={handleChange}
                            value={quantity}
                        /> 
                        <span className="purchaseForm__counter--inc"
                            onClick={handleIncrease}
                        >+</span>
                    </div>
                </div>
                <div className="PurchaseForm__row">
                    <div className="PurchaseForm__rowLabel">小计</div>
                    <div className="PurchaseForm__rowValue">
                        <span className="PurchaseForm__totalPrice">¥ {totalPrice}</span>
                    </div>
                </div>
                <div className="PurchaseForm__row">
                    <div className="PurchaseForm__rowLabel">手机号码</div>
                    <div className="PurchaseForm__rowValue">{phone}</div>
                </div>
            </div>
            <ul className="PurchaseForm__remark">
                <li className="PurchaseForm__remarkItem">
                    <i className="PurchaseForm__sign"></i>
                    <span className="PurchaseForm__desc">支持随时退</span>
                </li>
                <li className="PurchaseForm__remarkItem">
                    <i className="PurchaseForm__sign"></i>
                    <span className="PurchaseForm__desc">支持过期退</span>
                </li>
            </ul>
            <div className="PurchaseForm__submit" onClick={handleSubmit} >提交订单</div>
        </div>
    );
}
 
export default PurchaseForm;