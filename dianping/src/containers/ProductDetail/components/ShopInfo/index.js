import React from 'react';
import "./index.css"

const ShopInfo = (props) => {
    const { shop, address, star, phone} = props.data
    const total = props.total
    return (  
        <div className="shopInfo">
            <div className="shopInfo__header">
                使用商户({total})
                <span className="shopInfo__arrow"></span>
            </div>
            <div className="shopInfo_middle">
                <div className="shopInfo_middleLeft">
                    <div className="shopInfo_shopName">
                        {shop}
                    </div>
                    <div className="shopInfo_startWrapper">
                        <span className="shopInfo__stars">
                            <i className="shopInfo__stars--red" style={{"width":  2*star + "%"}}></i>
                        </span>
                        <span className="shopInfo__distance">>100km</span>
                    </div>
                </div>
                <a className="shopInfo_middleRight" href={`tel://${phone}`}>
                    <i className="shopInfo__phoneIcon"></i>
                </a>
            </div>
            <div className="shopInfo__footer">
                <i className="shopInfo__locationIcon"></i>
                {address}
            </div>
        </div>
    );
}
 
export default ShopInfo;