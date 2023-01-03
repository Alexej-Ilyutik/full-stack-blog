import axios from 'axios';

export const instanse = axios.create({
  baseURL: 'http://localhost:3008/',
});

instanse.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem('token');
  return config;
});
