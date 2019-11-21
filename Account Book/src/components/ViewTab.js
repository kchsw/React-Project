import React from 'react'
import Ionicon from 'react-ionicons'
import PropTypes from 'prop-types'
import { LIST_VIEW, CHART_VIEW } from '../utility'

const generateLinkClass = (current, view) => {
    return current === view? "nav-link active" : "nav-link"
}



const ViewTab = ({ activeTab, onTabChange }) => {
    const tabClick = (event, view) => {
        event.preventDefault();
        onTabChange(view)
    }
    return (
        <ul className="nav nav-tabs nav-fill my-4">
            <li className="nav-item list-item">
                <a className={generateLinkClass(activeTab, LIST_VIEW)} 
                    href="#"
                    onClick={(e) => {e.preventDefault(); onTabChange(LIST_VIEW)}}
                >
                    <Ionicon
                        className="rounded-circle mr-2"
                        fontSize="25px"
                        color={'#007bff'}
                        icon="ios-paper"
                    />
                    列表模式
                </a>
            </li>
            <li className="nav-item chart-item">
                <a className={generateLinkClass(activeTab, CHART_VIEW)} 
                    href="#"
                    onClick={(e) => {e.preventDefault(); onTabChange(CHART_VIEW)}}
                    // onClick={(e) => {tabClick(e, CHART_VIEW)}}
                >
                    <Ionicon
                        className="rounded-circle mr-2"
                        fontSize="25px"
                        color={'#007bff'}
                        icon="ios-pie"
                    />
                   图表模式
                </a>
            </li>
        </ul>
    )
}

ViewTab.propTypes = {
    activeTab: PropTypes.string.isRequired,
    onTabChange: PropTypes.func.isRequired,
}

export default ViewTab