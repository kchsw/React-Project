import React from 'react';
import "./index.css"
import { Link } from 'react-router-dom'

const BuyButton = (props) => {
    const { productId } = props
    return (  
        <Link to={`/purchase/${productId}`} className="button" href='_'>
            立即购买
        </Link>
    );
}
export default BuyButton;
 