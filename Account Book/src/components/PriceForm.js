import React, { Component } from 'react';
import {isValidDate } from '../utility'

class PriceForm extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            validated: true,
            errorMessage: ''
        }
    }
    static defaultProps = {
        item: {}
    }
    sumbitForm = (event) => {
        event.preventDefault()
        const { item, onFormSubmit } = this.props
        const editMode = !!item.id
        const title = this.titleInput.value.trim()
        const price = this.priceInput.value.trim() * 1
        const date = this.dateInput.value.trim()
        // console.log(`${title}-${price}-${date}`)
        if(title && price && date){
            if(price < 0){
                this.setState({
                    validated: false,
                    errorMessage: '金额必须大于0'
                })
            }else if(!isValidDate(date)){
                this.setState({
                    validated: false,
                    errorMessage: '请填写正确的日期格式'
                })
            }else {
                this.setState({
                    validated: true,
                    errorMessage: ''
                })
                if(editMode){
                    onFormSubmit({...item, title, price, date}, editMode)
                }else{
                    onFormSubmit({title, price, date}, editMode)
                }
            }
        }else{
            this.setState({
                validated: false,
                errorMessage: '请填写必填项'
            })
        }
    }
    render() { 
        const { title, price, date } = this.props.item
        return (  
            <div>
                <form style={{textAlign: 'left'}} onSubmit={(event) => {this.sumbitForm(event)}} noValidate>
                    <div className="form-group">
                        <label htmlFor="title-input">标题</label>
                        <input type="text" className="form-control" id="title-input" placeholder="请输入标题"
                            ref={(input) => {this.titleInput = input}}
                            defaultValue={title}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="price-input">金额</label>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">￥</span>
                            </div>
                            <input type="number" className="form-control" id="price-input" placeholder="请输入金额"
                                ref={(input) => {this.priceInput = input}}
                                defaultValue={price}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="date-input">日期</label>
                        <input type="date" className="form-control" id="date-input" placeholder="请输入日期"
                            ref={(input) => {this.dateInput = input}}
                            defaultValue={date}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary mr-3">提交</button>
                    <button className="btn btn-secondary" onClick={this.props.onCancelSubmit}>取消</button>
                </form>
                {
                    !this.state.validated && 
                    <div className="alert alert-danger mt-5" role="alert">
                        {this.state.errorMessage}
                    </div>
                }
            </div>
        )
    }
}
 
export default PriceForm;