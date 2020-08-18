import React from 'react';
import "./index.css"
const Tip = (props) => {
    const { message, onClose } = props
    return (  
        <div className="tip">
            <div className="tip__alert">
                <div className="tip__content">
                    {message}
                </div>
                <div className="tip__btns">
                    <div className="tip__btn" onClick={onClose}>
                        确定
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Tip;