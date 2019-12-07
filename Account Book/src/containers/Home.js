import React, { Component } from 'react';
import logo from '../logo.svg';
import PriceList from '../components/PriceList'
import ViewTab from '../components/ViewTab'
import TotalPrice from '../components/TotalPrice'
import MonthPicker from '../components/MonthPicker'
import CreateBtn from '../components/CreateBtn'
import { Tabs, Tab } from '../components/Tabs'
import Ionicon from 'react-ionicons'
import Loader from '../components/Loader'
import PieChart from '../components/PieChart'
import { LIST_VIEW, CHART_VIEW, TYPE_INCOME, TYPE_OUTCOME, parseDate, padLeft, Colors } from '../utility'
import WithContext from '../WithContext'
import { withRouter } from 'react-router-dom'
    const tabsText = [LIST_VIEW, CHART_VIEW]

    const generateChartDataByCategory = (items, type) => {
        let categoryMap = {}
        items.filter(item => item.category.type === type).forEach(item => {
            if(categoryMap[item.cid]){
                categoryMap[item.cid].value += (item.price * 1)
                categoryMap[item.cid].items.push(item.id)
            }else{
                categoryMap[item.cid] = {
                    name: item.category.name,
                    value: item.price * 1,
                    items: [item.id]
                }
            }
        })
        return Object.values(categoryMap)
    }

    class Home extends Component {
        constructor(props){
            super(props)
            this.state = {  
                // accountData: mockData,
                tabView: LIST_VIEW
            }
        }
        componentDidMount(){
            this.props.actions.getInitalData()
        }
        changeView = (index) => {
            this.setState({
                tabView: tabsText[index]
            })
        }
        changeDate = (year, month) => {
            this.props.actions.selectMonth(year, month)
        }
        modifyItem = (modifyiedItem) => {
            this.props.history.push(`/edit/${modifyiedItem.id}`)
        }
        createItem = () => {
            this.props.history.push('/create')
        }
        deleteItem = (deletedItem) => {
            this.props.actions.deleteItem(deletedItem)
        }
        render() { 
            const { tabView } = this.state
            const { data } = this.props
            const { items, categories, currentData, isLoading  } = data
            const accountData = Object.values(items).map(item => {
                item.category = categories[item.cid]
                return item
            })
            const incomeChartData = generateChartDataByCategory(accountData, TYPE_INCOME)
            const outcomeChartData = generateChartDataByCategory(accountData, TYPE_OUTCOME)
            // .filter(item => {
            //     return item.date.includes(`${currentData.year}-${padLeft(currentData.month)}`)
            // })
            // accountData = accountData.map(item => {
            //     item.category = categorys[item.cid]
            //     return item
            // }).filter(item => {
            //     return item.date.includes(`${currentData.year}/${padLeft(currentData.month)}`)
            // })
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
                                {/* <ViewTab
                                    activeTab={tabView}
                                    onTabChange={this.changeView}
                                /> */}
                                <Tabs activeIndex={0} onTabChange={this.changeView}>
                                    <Tab>
                                    <Ionicon
                                        className="rounded-circle mr-2"
                                        fontSize="25px"
                                        color={'#007bff'}
                                        icon="ios-paper"
                                    />
                                    列表模式
                                    </Tab>
                                    <Tab>
                                    <Ionicon
                                        className="rounded-circle mr-2"
                                        fontSize="25px"
                                        color={'#007bff'}
                                        icon="ios-pie"
                                    />
                                    图表模式
                                    </Tab>
                                </Tabs>
                                <CreateBtn onClick={this.createItem} />
                                {
                                    !isLoading && 
                                    <>
                                        {   tabView === LIST_VIEW &&
                                            <PriceList 
                                                items={accountData}
                                                onModifuItem={this.modifyItem}
                                                onDeleteItem={this.deleteItem}
                                            />
                                        }
                                        {
                                            tabView === CHART_VIEW &&
                                            <div className="row">
                                                <div className="col-6">
                                                    <PieChart title='本月收入' categoryData={incomeChartData}/>
                                                </div>
                                                <div className="col-6">
                                                    <PieChart title='本月支出' categoryData={outcomeChartData}/>
                                                </div>                                       
                                            </div>
                                        }
                                    </>
                                }
                                {
                                    isLoading && 
                                    <Loader/>
                                }
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            );
        }
    }
   
  export default withRouter(WithContext(Home));