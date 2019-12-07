import React, { Component } from 'react';
import CategorySelect from '../components/CategorySelect'
import PriceForm from '../components/PriceForm'
import { Tabs, Tab } from '../components/Tabs'
import { TYPE_INCOME, TYPE_OUTCOME } from '../utility'
import Ionicon from 'react-ionicons'
import WithContext from '../WithContext'
import { withRouter } from 'react-router-dom'


const tabsText = [ TYPE_INCOME, TYPE_OUTCOME ]

class Create extends Component {
    constructor(props) {
        super(props);
        const { items, categories } = props.data
        const { id } = props.match.params
        this.state = {  
          tabView: (id && items[id]) ? categories[items[id].cid].type : TYPE_INCOME,
          selectedCategory: (id && items[id]) ? categories[items[id].cid] : null
        }
    }
    componentDidMount(){
      const { id } = this.props.match.params
      this.props.actions.getEditData(id).then(data => {
        const { categories, editItem } = data
        this.setState({  
          tabView: (id && editItem) ? categories[editItem.cid].type : TYPE_INCOME,
          selectedCategory: (id && editItem) ? categories[editItem.cid] : null
        })
      })
    }
    changeView = (index) => {
        this.setState({
            tabView: tabsText[index]
        })
    }
    cancelSubmit = () => {
      this.props.history.push('/')
    }
    submitForm = (data, editMode) => {
      if(!editMode){
        this.props.actions.createItem(data, this.state.selectedCategory.id)
      }else{
        this.props.actions.updateItem(data, this.state.selectedCategory.id)
      }
      this.props.history.push('/')
    }
    selectCategory = (category) => {
      this.setState({
        selectedCategory: category
      })
    }
    render() { 
        const { match, data } = this.props
        const { items, categories } = data
        const { id } = this.props.match.params
        const editItem = (id && items[id]) ? items[id] : {}
        const tabIndex = tabsText.findIndex(text => text === this.state.tabView)
        const filterCategories = Object.values(categories).filter(category => category.type === this.state.tabView)
        return (  
            <div className="card" style={{width: '65%', margin: '0 auto'}}>
                <div className="card-body">
                    <div className="content-area">
                        <Tabs activeIndex={tabIndex} onTabChange={this.changeView}>
                          <Tab>
                            <Ionicon
                              className="rounded-circle mr-2"
                              fontSize="25px"
                              color={'#007bff'}
                              icon="ios-add-circle"
                            />
                            收入
                          </Tab>
                          <Tab>
                            <Ionicon
                              className="rounded-circle mr-2"
                              fontSize="25px"
                              color={'#007bff'}
                              icon="ios-close-circle"
                            />
                            支出
                          </Tab>
                        </Tabs>
                        <CategorySelect categories={filterCategories} 
                            selectedCategory={this.state.selectedCategory}
                            onSelectCategory={this.selectCategory}
                        />
                        <PriceForm 
                          onFormSubmit={this.submitForm}
                          onCancelSubmit={this.cancelSubmit}
                          item={editItem}
                        />
                    </div>
                </div>
            </div>
        );
    }
} 
 
export default withRouter(WithContext(Create));