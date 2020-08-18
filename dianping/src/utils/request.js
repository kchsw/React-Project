const headers = new Headers({
    "Accept": "application/json",
    "Content-Type": "application/json"
})

export const get = (url) => {
    return fetch(url, {
        method: "GET",
        headers: headers
    }).then(response => {
        return  handleResponse(url, response)
    }).catch(err => {
        console.error(`Request failed. Url = ${url}`)
        return Promise.reject({
            error: {
                message: "Request failed due to network error"
            }
        })
    }) 
} 

export const post = (url, data) => {
    return fetch(url, {
        method: "POST",
        headers,
        body: data
    }).then(response => {
        handleResponse(url, response)
    }).catch(err => {
        console.error(`Request failed. Url = ${url}`)
        return Promise.reject({
            error: {
                message: "Request failed due to network error"
            }
        })
    }) 
}

const handleResponse = (url, response) => {
    if(response.status === 200 || response.status === 304) {
        return response.json()
    } else {
        console.error(`Request failed. Url = ${url}`)
        return Promise.reject({
            error: {
                message: "Request failed due to server error"
            }
        })
    }
}


