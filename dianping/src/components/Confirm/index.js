import React from 'react';
import './index.css'
const Confirm = (props) => {
    const {
        content,
        cancelText,
        confirmText,
        onCancel,
        onConfirm
    } = props;
    return (  
        <div className="comfirm">
            <div className="comfirm__alert">
                <div className="comfirm__content">
                    {content}
                </div>
                <div className="comfirm__btns">
                    <div className="comfirm__btn" onClick={onCancel} >
                        {cancelText}
                    </div>
                    <div className="comfirm__btn" onClick={onConfirm} >
                        {confirmText}
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Confirm;