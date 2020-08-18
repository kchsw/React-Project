import { get } from '../../utils/request'
//网络请求的标识
export const FETCH_DATA = 'FETCH_DATA'

export default store => next => action => {
    const callAPI = action[FETCH_DATA]

    if(typeof callAPI === 'undefined') {
        return next(action)
    }

    const { endpoint, schema, types } = callAPI
    if(typeof endpoint !== 'string') {
        throw new Error('endpoint必须为字符串类型的url')
    }
    if(!schema) {
        throw new Error('必须指定领域实体的schema')
    }
    if(!Array.isArray(types) && types.length !== 3) {
        throw new Error('需要制定一个包含了3个action type的数组')
    }
    if(!types.every(type => typeof type == 'string')) {
        throw new Error('action type必须为字符串类型')
    }

    const actionWith = data => {
        const finalAction = { ...action, ...data }
        delete finalAction[FETCH_DATA]
        return finalAction
    }

    const [ requestType, successType, failureType ] = types
    next(actionWith({ type: requestType }))
    return fetchData(endpoint, schema).then(
        response => next(actionWith({
            type: successType,
            response
        })),
        error => next(actionWith({
            type: failureType,
            error: error.message || '获取数据失败'
        }))
    )
}

const fetchData = (endpoint, schema) => {
    return get(endpoint).then(data => {
        return normalizeData(data, schema)
    })
}

//很具schema扁平化处理数据

const normalizeData = (data, schema) => {
    const { name, id } = schema
    let kvObj = {}
    let ids = []
    if(Array.isArray(data)) {
        data.forEach(item => {
            kvObj[item[id]] = item
            ids.push(item[id])
        })
    } else {
        kvObj[data[id]] = data
        ids.push(data[id])
    }

    return {
        [name]: kvObj,
        ids
    }
}