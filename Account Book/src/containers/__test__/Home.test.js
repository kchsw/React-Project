import React from 'react';
import { mount } from 'enzyme';
import Home from '../Home'

import PriceList from '../../components/PriceList'
import ViewTab from '../../components/ViewTab'
import MonthPicker from '../../components/MonthPicker'
import CreateBtn from '../../components/CreateBtn'
import { LIST_VIEW, CHART_VIEW, TYPE_INCOME, TYPE_OUTCOME, parseDate, padLeft } from '../../utility'

let wrapper

describe('test Home container component', () => {
    beforeEach(() => {
        wrapper = mount(<Home />)
    })
    it('snapshot', () => {
        expect(wrapper).toMatchSnapshot()
    })
    it('should render the default layout', () => {
        const currentDate = parseDate()
        expect(wrapper.find(PriceList).length).toEqual(1)
        expect(wrapper.find(ViewTab).props().activeTab).toEqual(LIST_VIEW)
        expect(wrapper.find(MonthPicker).props().year).toEqual(currentDate.year)
        expect(wrapper.find(PriceList).props().items.length).toEqual(1)
    })
    it('click the another view tab, should change the view', () => {
        wrapper.find('.chart-item a').first().simulate('click')
        expect(wrapper.find('.chart-item').length).toEqual(1)
        expect(wrapper.find(ViewTab).props().activeTab).toEqual(CHART_VIEW)
    })
    it('select another month should switch correct items', () => {
        wrapper.find('.dropdown-toggle').simulate('click')
        wrapper.find('.months-range .dropdown-item').at(9).simulate('click')
        expect(wrapper.find(MonthPicker).props().month).toEqual(10)
        expect(wrapper.find(PriceList).props().items.length).toEqual(1)
    })
    it('click the create button, should create the new item', () => {
        wrapper.find(CreateBtn).simulate('click')
        expect(wrapper.find(PriceList).props().items.length).toEqual(2)
    })
    it('modify item and delete item', () => {
        wrapper.find('.list-group-item a').first().simulate('click')
        expect(wrapper.find('.list-group-item .title-col').text()).toEqual('nmsl')
        expect(wrapper.find(PriceList).props().items[0].title).toEqual('nmsl')
        wrapper.find('.list-group-item a').last().simulate('click')
        expect(wrapper.find('.list-group-item').length).toEqual(0)
    })
})
