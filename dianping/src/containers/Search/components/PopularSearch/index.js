import React from 'react';
import './index.css'

const PopularSearch = (props) => {
    const { popularKeywords, onClickItem } = props
    return (  
        <div className="popularSearch">
            {
                popularKeywords.map((item, index) => {
                    return (                      
                        <div 
                            className="popularSearch__item" 
                            key={item.id}
                            onClick={() => onClickItem(item)}
                        >{item.keyword}</div>
                    )
                })
            }
        </div>
    );
}
 
export default PopularSearch;