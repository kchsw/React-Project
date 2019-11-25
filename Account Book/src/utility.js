export const LIST_VIEW = 'list'
export const CHART_VIEW = 'chart'
export const TYPE_INCOME = 'income'
export const TYPE_OUTCOME = 'outcome'
export const padLeft = (n) => {
    return n < 10 ? '0' + n : n
}

export const range = (size, startAt = 0) => {
    const arr = []
    for(let i = 0; i < size; i++){
        arr[i] = startAt + i
    }
    return arr
}

export const parseDate = (str) => {
    const date = str? new Date(str) : new Date()
    return {
        year: date.getFullYear(),
        month: date.getMonth() + 1
    }

}

export const Colors = {
    blue: '#347eff',
    deepBlue: '#61dafb',
    green: '#28a745',
    red: '#dc3545',
    gray: '#555',
    lightGray: '#efefef',
    white: '#fff'
}

export const isValidDate = (dateString) => {
    const regEx = /^\d{4}-\d{2}-\d{2}$/
    if(!dateString.match(regEx)) return false
    const d = new Date(dateString)
    if(Number.isNaN(d.getFullYear())) return false
    return d.toISOString().slice(0, 10) === dateString
}