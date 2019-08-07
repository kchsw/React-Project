import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { GET_INIT_ACTION } from './actionTypes'
import { initListAction } from './actionCreators'

function getdata(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([
                "westdoor",
                "jubaoxia",
                "otto"
            ])
        }, 1000)
    })
}

function* getInitList(){
    try{
        const res = yield getdata()
        const action = initListAction(res)
        yield put(action)
    }catch(e){
        console.log('请求异常')
    }
    
}

function* mySaga() {
    yield takeEvery(GET_INIT_ACTION, getInitList);
}

export default mySaga;
