import React, { Component } from 'react';
import './App.css';
import Home from './containers/Home'
import Create from './containers/Create'
import { flatternArr, parseDate, ID } from './utility'
// import { testCategories, testItems } from './testData'
import { AppContext } from './AppContext'
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";
import axios from 'axios'

// export const AppContext = React.createContext()


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {  
      items: {},
      categories: {},
      currentData: parseDate(),
      isLoading: false
    }
    const withLoading = (cb) => {
      return (...args) => {
        this.setState({
          isLoading: true
        })
        return cb(...args)
      }
    }
    this.actions = {
      getInitalData: withLoading(async () => {
        const { currentData } = this.state
        const getDataURL = `/items?monthCategory=${currentData.year}-${currentData.month}&_sort=timestamp`
        const results = await Promise.all([axios.get('/categories'), axios.get(getDataURL)])
        const [ { data: categories }, { data: items } ] = results
        this.setState({
          items: flatternArr(items),
          categories: flatternArr(categories),
          isLoading: false
        })
      }),
      getEditData: async (id) => {
        const { items, categories } = this.state
        let promiseArr = []
        if(Object.keys(categories).length === 0) {
          promiseArr.push(axios.get('/categories'))
        }
        const itemIsFeched = (Object.keys(items).indexOf(id) > -1)
        if(id && !itemIsFeched){
          const getDataWithIDURL = `/items/${id}`
          promiseArr.push(axios.get(getDataWithIDURL))
        }
        const [fechedCategories, editItem] = await Promise.all(promiseArr)
        const finalCategories = fechedCategories ? flatternArr(fechedCategories.data) : categories
        const finalItem = editItem ? editItem.data : items[id]
        if(id){
          this.setState({
            categories: finalCategories,
            items: { ...this.state.items, [id]: finalItem}
          })
        }else{
          this.setState({
            categories: finalCategories,
          })
        }
        return {
          categories: finalCategories,
          editItem: finalItem
        }
      },
      selectMonth: withLoading((year, month) => {
        const getDataURL = `/items?monthCategory=${year}-${month}&_sort=timestamp`
        axios.get(getDataURL).then(res => {
          const items = res.data
          this.setState({
              items: flatternArr(items),
              currentData: { year, month },
              isLoading: false
          })
        })
      }),
      deleteItem: withLoading((item) => {
        axios.delete(`/items/${item.id}`).then(res => {
          delete this.state.items[item.id]
          this.setState({
            items: this.state.items,
            isLoading: false
          })
        })
      }),
      createItem: withLoading(async (data, categoryId) => {
        const id = ID()
        const date = parseDate(data.date)
        data.monthCategory = `${date.year}-${date.month}`
        data.timestamp = new Date(data.date).getTime()
        // const newItem = { ...data, id, cid: categoryId }
        const newItem = await axios.post('/items', { ...data, id, cid: categoryId })
        this.setState({
          items: {...this.state.items, [id]: newItem.data},
          isLoading: false
        })
        return newItem.data
      }),
      updateItem: withLoading(async (data, categoryId) => {
        const updateData = {
          ...data,
          cid: categoryId,
          timestamp: new Date(data.date).getTime()
        }
        const modifiedItem = await axios.put(`/items/${data.id}`, updateData)
        this.setState({
          items: { ...this.state.items, [data.id]: modifiedItem.data },
          isLoading: false
        })
        return modifiedItem.data
      })
    }
  }
  render() { 
    return ( 
      <AppContext.Provider value={{
        state: this.state,
        actions: this.actions
      }}>
        <Router>
          <div className="App">
            <Route path="/" exact component={Home}></Route>
            <Route path="/create" exact component={Create}></Route>
            <Route path="/edit/:id" exact component={Create}></Route>
          </div>
        </Router>
      </AppContext.Provider> 
    );
  }
}
 
export default App;

