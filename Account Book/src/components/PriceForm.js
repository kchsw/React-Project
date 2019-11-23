import React, { Component } from 'react';

class PriceForm extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    static defaultProps = {
        item: {}
    }
    sumbitForm= (event) => {
        event.preventDefault();
    }
    render() { 
        return (  
            <div>
                <form style={{textAlign: 'left'}} onSubmit={(event) => {this.sumbitForm(event)}} noValidate>
                    <div className="form-group">
                        <label for="title-input">标题</label>
                        <input type="text" className="form-control" id="title-input" placeholder="请输入标题"/>
                    </div>
                    <div className="form-group">
                        <label for="price-input">金额</label>
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text">￥</span>
                            </div>
                            <input type="number" className="form-control" id="price-input" placeholder="请输入金额"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label for="date-input">日期</label>
                        <input type="date" className="form-control" id="date-input" placeholder="请输入日期"/>
                    </div>
                    <button type="submit" className="btn btn-primary mr-3">提交</button>
                    <button className="btn btn-secondary" onClick={() => {}}>取消</button>
                </form>
            </div>
        )
    }
}
 
export default PriceForm;