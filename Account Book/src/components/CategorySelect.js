import React, { Component } from 'react';
import Ionicon from 'react-ionicons'
import { Colors } from '../utility'

class CategorySelect extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            selectedCategoryId: this.props.selectedCategory.id
        }
    }
    selectCategory = (event, category) => {
        event.preventDefault();
        this.setState({
            selectedCategoryId: category.id
        })
        this.props.onSelectCategory(category)
    }
    render() { 
        const { categories, selectedCategory } = this.props
        const { selectedCategoryId } = this.state
        return (  
            <div className="category-select-component">
                <label>收支类型</label>
                <div className="row">
                    {
                        categories.map((category, index) => {
                            const iconColor = category.id === selectedCategoryId ? Colors.white : Colors.gray
                            const bgColor = category.id === selectedCategoryId ? Colors.blue : Colors.lightGray
                            const activeName = selectedCategoryId === category.id ?
                            'category-item col-2 active' : 'category-item col-2'
                            return (
                                <div className={activeName} key={index} role="button" style={{ textAlign: 'center'}}
                                    onClick={event => {this.selectCategory(event, category)}}
                                >
                                    <Ionicon
                                        className="rounded-circle"
                                        fontSize="50px"                                
                                        color={iconColor}
                                        style={ { background: bgColor, padding: '5px'} }
                                        icon={category.iconName}
                                    />
                                    <p>{category.name}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        );
    }
}
 
export default CategorySelect;