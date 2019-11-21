import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import MonthPicker from '../MonthPicker'


const props = {
    year: 2019,
    month: 11,
    onChange: jest.fn()
}

let wrapper 

describe('test MonthPicker component', () => {
    beforeEach(() => {
        wrapper = mount(<MonthPicker {...props}/>)
    })
    it('snapshot', () => {
        expect(wrapper).toMatchSnapshot()
    })
    it('render correct year and month, show correct dropdown status', () => {
        const text = wrapper.find('.dropdown-toggle').first().text()
        expect(text).toEqual('2019年11月')
        expect(wrapper.state('isOpen')).toBeFalsy()
        expect(wrapper.state('selectedYear')).toEqual(props.year)
    })
    it('dropdown should show and year&month list have correct items after click button', () => {
        wrapper.find('.dropdown-toggle').simulate('click')
        expect(wrapper.state('isOpen')).toBeTruthy()
        expect(wrapper.find('.years-range .dropdown-item').length).toEqual(9)
        expect(wrapper.find('.months-range .dropdown-item').length).toEqual(12)
        expect(wrapper.find('.years-range .dropdown-item.active').text()).toEqual('2019年')
        expect(wrapper.find('.months-range .dropdown-item.active').text()).toEqual('11月')
        expect(wrapper.find('.years-range .dropdown-item').first().text()).toEqual(`${props.year - 4}年`)
    })
    it('click the year&month item should trigger right change', () => {
        wrapper.find('.dropdown-toggle').simulate('click')
        wrapper.find('.years-range .dropdown-item').first().simulate('click')
        expect(wrapper.find('.years-range .dropdown-item').first().hasClass('active')).toBeTruthy()
        expect(wrapper.state('selectedYear')).toEqual(2015)
        wrapper.find('.months-range .dropdown-item').first().simulate('click')
        expect(wrapper.state('isOpen')).toBeFalsy()
        expect(props.onChange).toHaveBeenCalledWith(2015, 1)
    })
    it('click the document should close the dropdown when the dropdown is show', () => {
        let eventMap = {}
        document.addEventListener = jest.fn((even, cb) => {
            eventMap[even] = cb
        })
        const wrapper = mount(<MonthPicker {...props}/>)
        wrapper.find('.dropdown-toggle').simulate('click')
        eventMap.click({
            target: ReactDOM.findDOMNode(wrapper.instance())
        })
        expect(wrapper.state('isOpen')).toBeTruthy()
        eventMap.click({
            target: document
        })
        expect(wrapper.state('isOpen')).toBeFalsy()
    })
})