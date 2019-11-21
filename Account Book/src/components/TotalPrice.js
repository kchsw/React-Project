import React from 'react'
import PropTypes from 'prop-types'

const TotalPrice = ({ income, outcome }) => {
    return (
        <div className="row font-weight-bold" style={{width: '100%'}}>
            <div className="col-6">
                <h5 className="income">
                    收入: <span>{income} </span>元
                </h5>
            </div>
            <div className="col-6">
                <h5 className="outcome">
                    支出: <span>{outcome} </span>元
                </h5>
                
            </div>
        </div>
    )
}

export default TotalPrice