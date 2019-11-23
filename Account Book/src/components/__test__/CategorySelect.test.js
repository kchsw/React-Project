import React from 'react';
import { mount } from 'enzyme';
import Ionicon from 'react-ionicons'
import CategorySelect from '../CategorySelect'

export const categories = [
    {
        "id": 1,
        "name": "旅行",
        "type": "outcome",
        "iconName": "ios-plane"
    },{
        "id": 2,
        "name": "理财",
        "type": "income",
        "iconName": "logo-yen"
    },{
        "id": 3,
        "name": "理财",
        "type": "income",
        "iconName": "logo-yen"
    }
]

let props = {
    categories,
    selectedCategory,
    onSelectCategory: jest.fn()
}

let wrapper 

describe('test CategorySelect component', () => {

    beforeEach(() => {
        wrapper = mount(<CategorySelect {...props}/>)
    })

    it('render correct icon items', () => {
        expect(wrapper.find('.category-item').length).toEqual(categories.length)
        const firstIcon = wrapper.find('.category-item').first().find(Ionicon)
        expect(firstIcon.props().icon).toEqual(categories[0].iconName)
    })
    it('click another item should switch active item and trigger the callback', () => {
        wrapper.find('.category-item').at(1).simulate('click')
        expect(wrapper.find('.category-item').at(1).hasClass('active')).toBeTruthy()
        expect(props.onSelectCategory).toHaveBeenCalledWith(categories[1])
    })
})