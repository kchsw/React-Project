import React from 'react';
import { shallow } from 'enzyme';
import ViewTab from '../ViewTab'
import { LIST_VIEW, CHART_VIEW } from '../../utility'

const props = {
    activeTab: LIST_VIEW, 
    onTabChange: jest.fn()
}

let wrapper 

describe('test ViewTab component', () => {
    beforeEach(() => {
        wrapper = shallow(<ViewTab {...props}/>)
    })
    it('snapshot', () => {
        expect(wrapper).toMatchSnapshot()
    })

    it('render the correct actived tab', () => {
       expect(wrapper.find('.list-item .nav-link').first().hasClass('active')).toBeTruthy()
       expect(wrapper.find('.chart-item').length).toEqual(0)
    })
    it('should trigger the correct function callbacks', () => {
        wrapper.find('.chart-item .nav-link').first().simulate('click')
        expect(props.onTabChange).toHaveBeenCalledWith(CHART_VIEW)
        expect(wrapper.state('activeTab')).toEqual('CHART_VIEW')
    })
})
