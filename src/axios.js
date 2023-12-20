import axios from 'axios';
    axios.defaults.baseURL = 'https://3b9d-31-9-64-111.ngrok-free.app';
    axios.defaults.headers.common['Authorization']='Bearer ' + localStorage.getItem('token');
   
   
  