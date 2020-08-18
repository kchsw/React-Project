import React from 'react';
import { Link } from 'react-router-dom'
import "./index.css"

const Discount = (props) => {
    const { data } = props
    return (  
        <div className="discount">
           <a className="discount__header" href="_blank">
               <span className="discount__title">超值优惠</span>
               <span className="discount__more">更多优惠</span>
               <span className="discount__arrow"></span>
           </a>
            <div className="discount__contnent">
                {
                    data.map((item, index) => {
                        return (
                            <Link to={`/detail/${item.id}`} className="discount__item" href='_blank' key={item.id}>
                                <div className="discount__itemPic">
                                    <img src={item.picture} width="100%" height="100%" alt="" />
                                </div>
                                <div className="discount__itemTitle">{item.shop}</div>
                                <div className="discount__itemPriceWrapper">
                                    <ins className="discount__itemCurrentPrice">
                                        {item.currentPrice}
                                    </ins>
                                    <del className="discount__itemOldPrice">
                                        {item.oldPrice}
                                    </del>
                                </div>
                            </Link>
                        )
                    })                        
                }
            </div>
        </div>
    );
}
 
export default Discount;