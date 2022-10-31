import axios from 'axios';
import { string } from 'prop-types';
import '../config/config.js';

export const getImages = async () => {
    let api='http://localhost:8080/'+'dockerapi/images/json';
    let res;
    const axios = require('axios');
    return axios.get(api).then((response)=>{
        console.log(response.data);
        
        return response.data;
        //alert("get res in getContainers:"+JSON.stringify(response.data));
    })
    .catch(function(error){
        //alert(error);
        console.log(error);
    })
    
  };


export const getContainers = async () => {
    let api='http://localhost:8080/'+'dockerapi/images/json';
    let res;
    const axios = require('axios');
    return axios.get(api).then((response)=>{
        console.log(response.data);
        
        return response.data;
        //alert("get res in getContainers:"+JSON.stringify(response.data));
    })
    .catch(function(error){
        alert(error);
        console.log(error);
    })
    
  };

