import axios from 'axios'
const baseUrl = 'http://localhost:8081/todo'

const getAll = () => {
    const path = `${baseUrl}/items`;
    const promise = axios.get(path)
    return promise.then(response => response.data)
}

const getById = id => {
    const path = `${baseUrl}/item/${id}`;
    const promise = axios.get(path)
    return promise.then(response => response.data)
}

const create = newObject => {
    const promise = axios.post(`${baseUrl}/item`, newObject)
    return promise.then(response => response.data)
}

const updateById = (id, newObject) => {
    const promise = axios.put(`${baseUrl}/item/${id}`, newObject)
    return promise.then(response => response.data)
}

const deleteById = id => {
    const promise = axios.delete(`${baseUrl}/item/${id}`)
    return promise.then(response => response.data)
}

const service = { getAll, getById, create, updateById, deleteById }

export default service