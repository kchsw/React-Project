import React from 'react';
import { shallow } from 'enzyme';
import PriceList from '../PriceList'
import Ionicon from 'react-ionicons'
import { mockData, categorys } from '../../containers/Home'

const accountData = mockData.map(item => {
    item.category = categorys[item.cid]
    return item
})

const props = {
    items: accountData,
    onModifuItem: jest.fn(),
    onDeleteItem: jest.fn()
}

let wrapper 

describe('test PriceList component', () => {
    beforeEach(() => {
        wrapper = shallow(<PriceList {...props}/>)
    })
    it('snapshot', () => {
        expect(wrapper).toMatchSnapshot()
    })
    it('should render correct price item length', () => {
        expect(wrapper.find('.list-group-item').length).toEqual(accountData.length)
    })
    it('should render correct icon and price for each item', () => {
        const iconList = wrapper.find('.list-group-item').first().find(Ionicon)
        expect(iconList.length).toEqual(3)
        expect(iconList.first().props().icon)
        .toEqual(accountData[0].category.iconName)
    })
    it('should trigger the correct function callbacks', () => {
        const firstItem =  wrapper.find('.list-group-item').first()
        firstItem.find('a').first().simulate('click')
        expect(props.onModifuItem).toHaveBeenCalledWith(accountData[0])
        firstItem.find('a').last().simulate('click')
        expect(props.onDeleteItem).toHaveBeenCalledWith(accountData[0])
    })
})