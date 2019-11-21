import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { padLeft, range } from '../utility'

class MonthPicker extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            selectedYear: this.props.year
        }
    }
    componentDidMount() {
        document.addEventListener('click', this.handleClick, false)
    }
    componentWillUnmount() {
        document.removeEventListener('click', this.handleClick, false)
    }
    handleClick = (event) => {
        if (this.node.contains(event.target)) {
          return;
        }
        this.setState({
          isOpen: false,
        })
    }
    toggleDropdown = (e) =>{
        e.preventDefault();
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
    selectYear = (e, year) => {
        e.preventDefault();
        this.setState({
            selectedYear: year
        })
    }
    selectMonth = (e, month) => {
        e.preventDefault();
        this.setState({
            isOpen: false
        })
        this.props.onChange(this.state.selectedYear, month)
    }
    render() { 
        const { year, month } = this.props
        const { isOpen, selectedYear } = this.state
        const monthRange = range(12, 1)
        const yearRange = range(9, -4).map(i => i + year)
        return (
            <div className="dropdown position-relative" ref={(ref) => {this.node = ref}}>
                <h6>选择月份</h6>
                <button className="btn btn-sm btn-secondary dropdown-toggle"
                    onClick={this.toggleDropdown}
                >
                    {`${year}年${padLeft(month)}月`}
                </button>
                {
                    isOpen && 
                    <div className="row border position-absolute" style={{background: '#fff', zIndex: 10, width: '100%'}}>
                        <div className="col border-right years-range">
                           {
                               yearRange.map((yearNumber, index) =>
                                <a key={index} 
                                    className={selectedYear === yearNumber ? "dropdown-item active" : "dropdown-item"}
                                    href="#"
                                    onClick={(e) => {this.selectYear(e, yearNumber)}}
                                >
                                   {yearNumber}年
                                </a>
                                )
                           }
                        </div>
                        <div className="col months-range">
                            {
                               monthRange.map((monthNumber, index) =>
                                <a key={index} 
                                    className={monthNumber === month ? "dropdown-item active" : "dropdown-item"}
                                    href="#"
                                    onClick={(e) => {this.selectMonth(e, monthNumber)}}
                                >
                                   {monthNumber}月
                                </a>
                                )
                            }
                        </div>
                    </div>
                }
            </div>
        );
    }
}

MonthPicker.propTypes = {
    year: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
}
 
export default MonthPicker;