import '../config/config.js';
var config = require('../config/config')




export const getVolumes = async () => {

    let api=config.api_address+'dockerapi/volumes/json';
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


  export const createVolume = async (req) => {

    let api=config.api_address+'dockerapi/volumes/create';
    
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

export const removeVolume = async (id) => {

    let api=config.api_address+'dockerapi/volumes/'+id;
    let res;
    alert(JSON.stringify(api));
    const axios = require('axios');
    return axios.delete(api).then((response)=>{
        console.log(response.data);
        alert(JSON.stringify(response))
        
        return response.data;
        //alert("get res in getContainers:"+JSON.stringify(response.data));
    })
    .catch(function(error){
        alert(error);
        console.log(error);
    })
  };
