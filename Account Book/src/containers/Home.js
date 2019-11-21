import React, { Component } from 'react';
import logo from '../logo.svg';
import PriceList from '../components/PriceList'
import ViewTab from '../components/ViewTab'
import TotalPrice from '../components/TotalPrice'
import MonthPicker from '../components/MonthPicker'
import CreateBtn from '../components/CreateBtn'
import { LIST_VIEW, CHART_VIEW, TYPE_INCOME, TYPE_OUTCOME, parseDate, padLeft } from '../utility'

export  const categorys = {
    "1": {
            "id": 1,
            "name": "旅行",
            "type": "outcome",
            "iconName": "ios-plane"
    },
    "2": {
        "id": 2,
        "name": "理财",
        "type": "income",
        "iconName": "logo-yen"
    }

}
export const mockData = [
    {
      "id": 1,
      "title": "去云南旅行",
      "date": "2019/11/10",
      "price": 400,
      "cid": 1
    },
    {
      "id": 2,
      "title": "理财基金",
      "date": "2019/10/10",
      "price": 400,
      "cid": 2
    }
  ]

const newItem = {
        "id": 3,
        "title": "新添加项目",
        "date": "2019/11/10",
        "price": 600,
        "cid": 2
    }

    class Home extends Component {
        constructor(props){
            super(props)
            this.state = {  
                accountData: mockData,
                currentData: parseDate(),
                tabView: LIST_VIEW
            }
        }
        changeView = (view) => {
            this.setState({
                tabView: view
            })
        }
        changeDate = (year, month) => {
            this.setState({
                currentData: { year, month }
            })
        }
        modifyItem = (modifyiedItem) => {
            this.state.accountData.find(item => item.id === modifyiedItem.id).title = "nmsl"
            this.setState({
                accountData: this.state.accountData
            })
        }
        createItem = () => {
            this.setState({
                // accountData: mockData.concat(newItem)
                accountData: [newItem, ...this.state.accountData]
            })
        }
        deleteItem = (deletedItem) => {
            const filteredItems = this.state.accountData.filter(item => item.id !== deletedItem.id)
            this.setState({
                accountData: filteredItems
            })
        }
        render() { 
            let { accountData, currentData, tabView } = this.state
            accountData = accountData.map(item => {
                item.category = categorys[item.cid]
                return item
            }).filter(item => {
                return item.date.includes(`${currentData.year}/${padLeft(currentData.month)}`)
            })
            //这里直接对对象进行了操作
            // accountData.map(item => {
            //     item.category = categorys[item.cid]              
            // }) 
            let totalIncome = 0, totalOutcome = 0
            accountData.forEach(item => {
                item.category.type === TYPE_INCOME?
                totalIncome += item.price : totalOutcome += item.price
            })
            
            return (  
                <React.Fragment>
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                    </header> 
                    <div className="card" style={{width: '65%', margin: '0 auto'}}>
                        <div className="card-body">
                            <div className="row header">
                                <div className="col">
                                    <MonthPicker 
                                        year={currentData.year}
                                        month={currentData.month}
                                        onChange={this.changeDate}
                                    />
                                </div>
                                <div className="col d-flex justify-content-between align-items-center">
                                    <TotalPrice
                                        income={totalIncome}
                                        outcome={totalOutcome}
                                    />
                                </div>
                            </div>
                            <div className="content-area">
                                <ViewTab
                                    activeTab={tabView}
                                    onTabChange={this.changeView}
                                />
                                <CreateBtn onClick={this.createItem} />
                                {   tabView === LIST_VIEW &&
                                    <PriceList 
                                        items={accountData}
                                        onModifuItem={this.modifyItem}
                                        onDeleteItem={this.deleteItem}
                                    />
                                }
                                {
                                    tabView === CHART_VIEW &&
                                    <div>图表区域</div>
                                }
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            );
        }
    }
   
  export default Home;