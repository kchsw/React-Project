import React from 'react';
import './index.css'
import ShopListItem from '../ShopListItem'

const ShopList = (props) => {
    const data = props.shops
    return (  
        <div className="shopList">
            <div className="shopList__filter">
                <span className="shopList__filterItem">全部商区</span>
                <span className="shopList__filterItem">全部分类</span>
                <span className="shopList__filterItem">智能排序</span>
            </div>
            <div className="shopList__list">
                {
                    data.map((item, index) => {
                        return (
                            <div key={item.id} >
                                <ShopListItem data={item} />
                                { index < data.length -1 && <div className="shopList__divider"></div> }
                            </div>  
                        )
                    })
                }
            </div>
        </div>
    );
}
 
export default ShopList;