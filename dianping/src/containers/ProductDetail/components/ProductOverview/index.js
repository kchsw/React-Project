import React from 'react';
import "./index.css"
import { Link } from 'react-router-dom'

const ProductOverview = (props) => {
    const { id, shop, picture, description, currentPrice, oldPrice } = props.data
    return (  
        <div className="productOverview">
            <div className="productOverview__header">  
                <div className="productOverview__imgContainer">
                    <img alt="" className="productOverview__img"
                        src={picture}
                    />
                </div>
                <div className="productOverview__baseInfo">
                    <div className="productOverview__title">
                        {shop}
                    </div>
                    <div className="productOverview__content">
                        {description}
                    </div>
                </div>
            </div>
            <div className="productOverview__purchase">
                <div className="productOverview__priceContainer">
                    <span className="productOverview__symbol">¥</span>
                    <span className="productOverview__price">{currentPrice}</span>
                    <span className="productOverview__price—old">¥{oldPrice}</span>
                </div>  
                <Link to={`/purchase/${id}`} className="productOverview__btn" href="_">立即购买</Link>
            </div>
            <ul className="productOverview__remark">  
                <li className="productOverview__remarkItem">
                    <i className="productOverview__sign1"></i>
                    <span className="productOverview__desc">随时可退</span>
                </li>
                <li className="productOverview__remarkItem">
                    <i className="productOverview__sign2"></i>
                    <span className="productOverview__desc">过期自动退</span>
                </li>
            </ul>
        </div>
        
    );
}
 
export default ProductOverview;