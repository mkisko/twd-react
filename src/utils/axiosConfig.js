import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://cp-hack-back.profsoft.online/line',
  mode: 'no-cors',
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

export default instance;