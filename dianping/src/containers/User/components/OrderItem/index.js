import React from 'react';
import './index.css'
const OrderItem = (props) => {
    const { 
        data: { statusText, orderPicUrl, channel, title, text, type, id, commentId }, 
        isCommenting,
        comment,
        stars
    } = props
    const handleRemove = (id) => {
        props.onRemove(id)
    }
    const handleComment = (id) => {
        props.onComment(id)
    }
    const handleCommentChange = (e) => {
        props.onCommentChange(e.target.value)
    }
    const renderStar = () => {
        return (
            <div className="orderItem__starContainer">
                {
                    [1, 2, 3, 4, 5].map((item, index) => {
                        const lightClass = stars >= item ? "orderItem__star--light" : "";
                        return (
                            <span 
                                className={"orderItem__star " + lightClass}
                                key={index}
                                onClick={() => props.onstarsChange(item)}
                            >
                                ★
                            </span>
                        )
                    })
                }
            </div>
        )
    }
    const renderEditArea = () => {
        return (
            <div className="orderItem__commentContainer">
                <textarea className="orderItem__comment" 
                    value={comment}
                    onChange={handleCommentChange}
                />
                {renderStar()}
                <button className="orderItem__commentBtn" onClick={props.onSubmit}>提交</button>
                <button className="orderItem__commentBtn" onClick={props.onCancel}>取消</button>
            </div>
        )
    }
    return (  
        <div className="orderItem">
            <div className="orderItem__title">
                <span>{title}</span>
            </div>
            <div className="orderItem__main">
                <div className="orderItem__imgWrapper">
                    <div className="orderItem__tag">
                        {statusText}
                    </div>
                    <img alt="" className="orderItem__img" src={orderPicUrl}/>
                </div>
                <div className="orderItem__content">
                    <div className="orderItem__line">
                        {text[0]}
                    </div>
                    <div className="orderItem__line">
                        {text[1]}
                    </div>
                </div>
            </div>
            <div className="orderItem__bottom">
                <div className="orderItem__type">
                    {channel}
                </div>
                <div className="orderItem__btnWrapper">
                    {
                        type === 1 && !commentId && <div className="orderItem__btn" onClick={() => handleComment(id)}>评价</div>
                    }
                    <div className="orderItem__btn" onClick={() => handleRemove(id)}>删除</div>
                </div>
            </div>
            { isCommenting &&  renderEditArea()}
        </div>
    );
}
 
export default OrderItem;