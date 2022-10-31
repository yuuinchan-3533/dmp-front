


export const getContainers = async () => {

    let api='http://localhost:8080/'+'dockerapi/containers/json';
    let res;
    const axios = require('axios');

    return axios.get(api).then((response)=>{
        console.log(response.data);
        
        return response.data;
    })
    .catch(function(error){
        console.log(error);
    })
    
    return res;
    // let addressData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    // return restaurantsData;
  };


  export const startContainer = async(id)=>{
    let api='http://localhost:8080/'+'dockerapi/containers/'+id+'/start';
    let res;
    const axios = require('axios');

    return axios.post(api).then((response)=>{
        console.log(response.data);
        
        return response.data;
    })
    .catch(function(error){
        console.log(error);
    })
    
    return res;
    // let addressData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    // return restaurantsData;

  }

  export const stopContainer = async(id)=>{
    
    let api='http://localhost:8080/'+'dockerapi/containers/'+id+'/stop';
    let res;
    const axios = require('axios');

    return axios.post(api).then((response)=>{
        console.log(response.data);
        
        return response.data;
    })
    .catch(function(error){
        console.log(error);
    })
    
    return res;
    // let addressData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    // return restaurantsData;

  }

  export const killContainer = async(id)=>{
    
    alert("kill"+id);
    let api='http://localhost:8080/'+'dockerapi/containers/'+id+'/kill';
    let res;
    const axios = require('axios');

    return axios.post(api).then((response)=>{
        console.log(response.data);
        
        return response.data;
    })
    .catch(function(error){
        alert(error);
        console.log(error);
    })
    
    return res;
    // let addressData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    // return restaurantsData;

  }

  export const restartContainer = async(id)=>{
      alert("restart"+id);
    let api='http://localhost:8080/'+'dockerapi/containers/'+id+'/restart';
    let res;
    const axios = require('axios');

    return axios.post(api).then((response)=>{
        console.log(response.data);
        
        return response.data;
    })
    .catch(function(error){
        alert(error);
        console.log(error);
    })
    
    return res;
  }

  export const pauseContainer = async(id)=>{
      alert("pause"+id);
    let api='http://localhost:8080/'+'dockerapi/containers/'+id+'/pause';
    let res;
    const axios = require('axios');

    return axios.post(api).then((response)=>{
        console.log(response.data);
        
        return response.data;
    })
    .catch(function(error){
        alert(error);
        console.log(error);
    })
    
    return res;
  }

  export const resumeContainer = async(id)=>{
    
    alert("resume"+id);
    let api='http://localhost:8080/'+'dockerapi/containers/'+id+'/resume';
    let res;
    const axios = require('axios');

    return axios.post(api).then((response)=>{
        console.log(response.data);
        
        return response.data;
    })
    .catch(function(error){
        alert(error);
        console.log(error);
    })
    
    return res;
    // let addressData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    // return restaurantsData;

  }

  export const removeContainer = async(id)=>{
      alert("remove"+id);
    let api='http://localhost:8080/'+'dockerapi/containers/'+id+'/remove';
    let res;
    const axios = require('axios');

    return axios.post(api).then((response)=>{
        console.log(response.data);
        
        return response.data;
    })
    .catch(function(error){
        alert(error);
        console.log(error);
    })

  }
