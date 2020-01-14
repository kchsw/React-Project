import React from 'react';
import { mount } from 'enzyme';
import { CreatePage } from '../Create';
import { parseDate, flatternArr, TYPE_OUTCOME } from '../../utility'
import CategorySelect from '../../components/CategorySelect'
import PriceForm from '../../components/PriceForm'
import { testCategories, testItems } from '../../testData'

const testItem = testItems[0]
const match = { params: { id: testItem.id } }
const history = { push: () => {} }
const createMatch = { params: { id: '' } }

const initData = {
    categories: {},
    items: {},
    currentDate: parseDate()
}

const withLoadedData = {
    categories: flatternArr(testCategories),
    items: flatternArr(testItems)
}

const actions = {
    getEditData: jest.fn().mockReturnValue(Promise.resolve({ editItem: testItem, categories: flatternArr(testCategories) })),
    createItem: jest.fn().mockReturnValue(Promise.resolve({ })),
    updateItem: jest.fn().mockReturnValue(Promise.resolve({ }))
}

describe('test component init behavior', () => {
    it('Create page first render, getEditData should be called with the right params', () => {
        const wrapper = mount(
            <CreatePage data={initData} actions={actions} match={match} />
        )    
        expect(actions.getEditData).toHaveBeenCalledWith(testItem.id)
    })
})

describe('test component when in create mode', () => {
    const wrapper = mount(
        <CreatePage data={withLoadedData} actions={actions} match={createMatch} history={history}/>
    )

    const setInputValue = (selector, newValue) => {
        wrapper.find(selector).instance().value = newValue
    }
    it('selectCategory should be null', () => {
        expect(wrapper.find(CategorySelect).props().selectedCategory).toEqual(null)
    })
    it('editItem should be empty', () => {
        expect(wrapper.find(PriceForm).props().item).toEqual({})
    })
    it('submit the form, the createItem action should not triggered', () => {
        wrapper.find('form').simulate('submit')
        expect(actions.createItem).not.toHaveBeenCalled()
    })
    it('fill all inputs, sumbit the form createItem should be called', () => {
        setInputValue('#title-input', 'new title')
        setInputValue('#price-input', 1000)
        setInputValue('#date-input', '2019-11-11')
        wrapper.find('.category-item').first().simulate('click')
        wrapper.find('form').simulate('submit')
        const testData = {
            title: 'new title',
            price: 1000,
            date: '2019-11-11'
        }
        const testCategoryId = wrapper.find(CategorySelect).props().selectedCategory.id
        expect(actions.createItem).toHaveBeenCalledWith(testData, testCategoryId)
    })
})

describe('test component when in edit mode', () => {
    const wrapper = mount(
        <CreatePage data={withLoadedData} actions={actions} match={match} history={history}/>
    )
    const setInputValue = (selector, newValue) => {
        wrapper.find(selector).instance().value = newValue
    }
    const selectedCategory = testCategories.find(category => testItem.cid === category.id)
    it('pass the right selectCategory', () => {
        wrapper.update()
        expect(wrapper.find(CategorySelect).props().selectedCategory).toEqual(selectedCategory)
    })
    it('modify some inputs, submit the form, modifyItem should be called', () => {
        setInputValue('#title-input', 'new title')
        wrapper.find('form').simulate('submit')
        const modifyItem = { ...testItem, title: 'new title' }
        expect(actions.updateItem).toHaveBeenCalledWith(modifyItem, testItem.cid)
    })
})