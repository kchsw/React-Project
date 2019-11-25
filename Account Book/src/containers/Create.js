import React, { Component } from 'react';
import CategorySelect from '../components/CategorySelect'
import PriceForm from '../components/PriceForm'
import { Tabs, Tab } from '../components/Tabs'
import { TYPE_INCOME, TYPE_OUTCOME } from '../utility'
import Ionicon from 'react-ionicons'


export const categories = [
    {
        "name": "旅行",
        "iconName": "ios-plane",
        "id": "1",
        "type": "outcome"
      },
      {
        "name": "餐饮",
        "iconName": "ios-restaurant",
        "id": "2",
        "type": "outcome"
      },
      {
        "name": "购物",
        "iconName": "ios-basket",
        "id": "3",
        "type": "outcome"
      },
      {
        "name": "数码",
        "iconName": "ios-phone-portrait",
        "id": "4",
        "type": "outcome"
      },
      {
        "name": "交通",
        "iconName": "ios-train",
        "id": "5",
        "type": "outcome"
      },
      {
        "name": "娱乐",
        "iconName": "ios-beer",
        "id": "6",
        "type": "outcome"
      },
      {
        "name": "汽车",
        "iconName": "ios-car",
        "id": "7",
        "type": "outcome"
      },
      {
        "name": "医疗",
        "iconName": "ios-medkit",
        "id": "8",
        "type": "outcome"
      },
      {
        "name": "体育",
        "iconName": "ios-football",
        "id": "14",
        "type": "outcome"
      },
      {
        "name": "宠物",
        "iconName": "ios-paw",
        "id": "9",
        "type": "outcome"
      },
      {
        "name": "其他",
        "iconName": "ios-apps",
        "id": "18",
        "type": "outcome"
      },
      {
        "name": "工资",
        "iconName": "ios-card",
        "id": "10",
        "type": "income"
      },
      {
        "name": "兼职",
        "iconName": "ios-cash",
        "id": "11",
        "type": "income"
      },
      {
        "name": "理财",
        "iconName": "logo-yen",
        "id": "12",
        "type": "income"
      },
      {
        "name": "奖金",
        "iconName": "md-trophy",
        "id": "13",
        "type": "income"
      },
      {
        "name": "其他",
        "iconName": "ios-apps",
        "id": "15",
        "type": "income"
      }
]

class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {  

        }
    }
    render() { 
        const { match } = this.props
        return (  
            <div className="card" style={{width: '65%', margin: '0 auto'}}>
                <div className="card-body">
                    <div className="content-area">
                        <Tabs activeIndex={0} onTabChange={() => {}}>
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
                        <CategorySelect categories={categories} 
                            selectedCategory={categories[0]}
                            onSelectCategory={() => {}}
                        />
                        <PriceForm />
                    </div>
                </div>
            </div>
        );
    }
} 
 
export default Create;