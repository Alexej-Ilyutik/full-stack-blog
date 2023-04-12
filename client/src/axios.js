import axios from 'axios';

// export const baseURL = 'https://blue-alert-codfish.cyclic.app';
export const baseURL = 'http://localhost:3008';

export const instanse = axios.create({
  baseURL: baseURL,
});

instanse.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem('token');
  return config;
});
