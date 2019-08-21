import axios from 'axios';

const BASE_URL = 'http://localhost:8000/v1/'

export function signUpUser(stateData){
    return new Promise((resolve, reject) => {
        axios.post(`${BASE_URL}authentication/signup`, stateData)
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

export function checkAuth(token){
    return new Promise((resolve, reject) => {
        axios.get(`${BASE_URL}authentication/check/auth`, {
            headers: {'Authorization': 'Token ' + token}
        })
        .then((response) => {
            resolve(response)
        })
        .catch((err) => {
            reject(err)
        })
    })
}

export function generateGameLink(token){
    return new Promise((resolve, reject) => {
        axios.get(`${BASE_URL}connections/generate/link`, {
            headers: {'Authorization': 'Token ' + token}
        })
        .then((response) => {
            resolve(response)
        })
        .catch((err) => {
            reject(err)
        })
    })
}