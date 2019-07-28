import axios from 'axios';

const BASE_URL = 'http://localhost:8000/v1/'

export function signUpUser(stateData){
    return new Promise((resolve, reject) => {
        axios.post(BASE_URL + 'authentication/signup', stateData)
        .then(response => {
            resolve(response)
        })
        .catch(err => {
            reject(err)
        })
    })
}

export function loginUser(stateData){
    return new Promise((resolve, reject) => {
        axios.post(`${BASE_URL}authentication/login`, stateData)
        .then(response => {
            resolve(response)
        })
        .catch(err => {
            reject(err)
        })
    })
}

export function activateUser(data){
    return new Promise((resolve, reject) => {
        axios.post(`${BASE_URL}authentication/activate/`+data)
        .then(response => {
            resolve(response)
        })
        .catch(err => {
            reject(err)
        })
    })
}