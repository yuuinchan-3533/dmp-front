import '../config/config.js';
var config = require('../config/config')

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
        alert(error);
        console.log(error);
    })
  };

export const getImage = async (id) => {

    let api='/dockerapi/images/'+id+'/json';

    let url='http://localhost:8080/'+'dockerapi/images/json';
    
    let res;
    const axios = require('axios');

    axios.get(url).then((response)=>{
        console.log(response.data);
        res=response;
        
        alert('its:'+JSON.stringify(response.data));
        return res;
    })
    .catch(function(error){
        alert(error);
        console.log(error);
    })
    
    return res;
    // let addressData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    // return restaurantsData;
  };

export const deleteImages = async (id) => {
    let api='/dockerapi/images/'+id;

    let url='http://localhost:8080/'+'dockerapi/images/json';
    
    let res;

    const axios = require('axios');

    axios.get(url).then((response)=>{
        console.log(response.data);
        res=response;
        
        alert('its:'+JSON.stringify(response.data));
        return res;
    })
    .catch(function(error){
        alert(error);
        console.log(error);
    })
    
    return res;
    // let addressData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    // return restaurantsData;
  };

  export const pullImage = async (req) => {
    let api=config.api_address+'dockerapi/images/pull';
    
    const axios = require('axios');
    alert(JSON.stringify(req))
    return axios.post(api,JSON.stringify(req)).then((response)=>{
        console.log(response.data);
        
        return response.data;
        //alert("get res in getContainers:"+JSON.stringify(response.data));
    })
    .catch(function(error){
        alert(error);
        console.log(error);
    })
  };

  export const runImage = async (req) => {
    let api=config.api_address+'dockerapi/images/run';
    
    const axios = require('axios');
    alert(JSON.stringify(req))
    return axios.post(api,JSON.stringify(req)).then((response)=>{
        console.log(response.data);
        
        return response.data;
        //alert("get res in getContainers:"+JSON.stringify(response.data));
    })
    .catch(function(error){
        alert(error);
        console.log(error);
    })
  };