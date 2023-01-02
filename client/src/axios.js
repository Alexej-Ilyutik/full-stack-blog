import axios from 'axios';

export const instanse = axios.create({
  baseURL: 'http://localhost:3008/',
});
