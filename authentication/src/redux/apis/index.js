import axios from 'axios'

const url = process.env.NODE_ENV==='production'?('https://guarded-atoll-57818.herokuapp.com'):('http://localhost:3001')

export const login=(formData)=> axios.post(`${url}/users/login`,formData);
export const signup=(formData)=> axios.post(`${url}/users/signup`,formData);
export const logout=()=> axios.get(`${url}/users/logout`);
