import React from 'react';
import './index.css'
import OrderItem from '../OrderItem'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { 
    actions as UserActions,
    getDeletingOrderId,
    getCommentingOrderId,
    getCurrentOrderComment,
    getCurrentOrderStars
} from '../../../../redux/modules/user'
import Confirm from '../../../../components/Confirm'

const tabTitles = ["全部订单", "待付款", "可使用", "退款/售后"]
const UserMain = (props) => {
    const { orders, 
        currentTab, 
        onTabClick, 
        UserActions, 
        deletingOrderId, 
        commentingOrderId,
        orderComment,
        orderStars
    } = props
    const handleRemove = (orderId) => {
        UserActions.showDeleteDialog(orderId)
    }
    const handleConfirm = () => {
        UserActions.removeOrder()
    }
    const handleCancel = () => {
        UserActions.hideDeleteDialog()
    }
    const handleComment = (orderId) => {
        UserActions.showCommentArea(orderId)
    }
    const handleCommentCancel = () => {
        UserActions.hideCommentArea()
    }
    const handleCommentChange = (comment) => {
        UserActions.setComment(comment)
    }
    const handleStarsChange = (stars) => {
        UserActions.setStars(stars)
    }
    const handleSubmitComment = () => {
        UserActions.submitComment()
    }
    const renderOrderList = data => {
        return data.map((item, index) => {
            return  <OrderItem  
                        key={item.id}
                        data={item}
                        onRemove={handleRemove}
                        onComment={handleComment}
                        isCommenting={commentingOrderId === item.id}
                        comment={ commentingOrderId === item.id ? orderComment : '' }
                        stars={ commentingOrderId === item.id ? orderStars : 0 }
                        onCancel={handleCommentCancel}
                        onstarsChange={handleStarsChange}
                        onCommentChange={handleCommentChange}
                        onSubmit={handleSubmitComment}
                    />
        })
    }

    const renderEmpty = () => {
        return (
            <div className="userMain__empty">
                <div className="userMain__emptyIcon" />
                <div className="userMain__emptyText1">您还没有相关订单</div>
                <div className="userMain__emptyText2">去逛逛看有哪些想买的</div>
            </div>
        )
    }
    
    const renderConfirm = () =>{
        return (<Confirm 
                    content="确定删除该订单吗"
                    cancelText="取消"
                    confirmText="确定"
                    onCancel={handleCancel}
                    onConfirm={handleConfirm}
                />
        )
    }
    return (  
        <div className="userMain">
            <div className="userMain__menu">
                {
                    tabTitles.map((item, index) => {
                        return (
                            <div key={index}
                                className="userMain__tab"
                                onClick={() => onTabClick(index)}
                            >
                                <span className={
                                    currentTab === index ? 
                                    "userMain__title userMain__title--active" :
                                    "userMain__title"
                                }>
                                    {item}
                                </span>
                            </div>
                        )
                    })
                }
            </div>
            <div className="userMain__content">
                {
                   orders && orders.length > 0 ?
                   renderOrderList(orders) :
                   renderEmpty()
                }
            </div>
            {
                deletingOrderId && renderConfirm()
            }
        </div>
    );

    
}

const mapStateToProps = (state, props) => {
    return {
        deletingOrderId: getDeletingOrderId(state),
        commentingOrderId: getCommentingOrderId(state),
        orderComment: getCurrentOrderComment(state),
        orderStars: getCurrentOrderStars(state)
    };
  };
  
const mapDispatchToProps = dispatch => {
    return {
        UserActions: bindActionCreators(UserActions, dispatch),
    };
};
 
 
export default connect(mapStateToProps, mapDispatchToProps)(UserMain)
 