

const url = process.env.NODE_ENV==='production'?('https://guarded-atoll-57818.herokuapp.com'):('http://localhost:3001')
export const getDishes=()=> async(dispatch)=>{
    return fetch(url+'/dishes').then((response)=>{
        if(response.ok){
            //console.log("OK")
            return response;
        }
        else{
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },error=>{
        var errmess=new Error(error.message)
        throw errmess
    })
    .then(response=>{
        //console.log(response)
        return response.json()
    })
    .then(dishes=>{
        //console.log(dishes)
        dispatch({type:'GET_DISHES',payload:dishes})
    })
    .catch(error=>console.log(error))
}

export const addDishes=(dishData)=>async(dispatch)=>{
    const bearer = 'Bearer '+localStorage.getItem('token');
    return fetch(url+'/dishes',{
        method:"POST",
        body:JSON.stringify(dishData),
        headers:{
            'Content-Type':'application/json',
            'Authorization':bearer
        },
        credentials:'same-origin'
    })
    .then((response)=>{
        if(response.ok){
            //console.log("OK")
            return response
        }else{
            var error=null
            if(response.status===401){
                error = new Error(' ' + response.status + ': ' + response.statusText+'\nOnly admin allowed to do this operation.');
                error.response = response;
                console.log(error)
                //localStorage.removeItem('token')
                throw error;    
            }else{
                error = new Error(' ' + response.status + ': ' + response.statusText+'\nMissing field value or Dish already exists!');
                error.response = response;
                //console.log(error)
                throw error;    
            }
        }
    },error=>console.log(error))
    .then((response)=>{
        return response.json()
    })
    .then((dishes)=>{
        //console.log("OK")
        dispatch({type:'ADD_DISH',payload:dishes})
    })
    .catch((error)=>dispatch({type:'ADD_DISH_FAILED',payload:error}))
}

export const updateDish=(currentId,dishData)=>async(dispatch)=>{
    const bearer = 'Bearer '+localStorage.getItem('token');
    return fetch(url+'/dishes/'+currentId,{
        method:"PUT",
        body:JSON.stringify(dishData),
        headers:{
            'Content-Type':'application/json',
            'Authorization':bearer
        },
        credentials:'same-origin'
    })
    .then((response)=>{
        if(response.ok){
            //console.log("OK")
            return response
        }else{
            var error=null
            if(response.status===401){
                error = new Error(' ' + response.status + ': ' + response.statusText+'\nOnly admin allowed to do this operation.');
                error.response = response;
                console.log(error)
                //localStorage.removeItem('token')
                throw error;    
            }else{
                error = new Error(' ' + response.status + ': ' + response.statusText+'\nMissing field value or Dish already exists!');
                error.response = response;
                //console.log(error)
                throw error;    
            }
        }
    },error=>console.log(error))
    .then((response)=>{
        return response.json()
    })
    .then((dishes)=>{
        console.log("OK")
        dispatch(getDishes())
    })
    .catch((error)=>dispatch({type:'ADD_DISH_FAILED',payload:error}))
}

export const delDish=(currentId)=>async(dispatch)=>{
    const bearer = 'Bearer '+localStorage.getItem('token');
    return fetch(url+'/dishes/'+currentId,{
        method:"DELETE",
        headers:{
            'Content-Type':'application/json',
            'Authorization':bearer
        },
        credentials:'same-origin'
    })
    .then((response)=>{
        if(response.ok){
            //console.log("OK")
            return response
        }else{
            var error=null
            if(response.status===401){
                error = new Error(' ' + response.status + ': ' + response.statusText+'\nOnly admin allowed to do this operation.');
                error.response = response;
                console.log(error)
                //localStorage.removeItem('token')
                throw error;    
            }else{
                error = new Error(' ' + response.status + ': ' + response.statusText+'\nMissing field value or Dish already exists!');
                error.response = response;
                //console.log(error)
                throw error;    
            }
        }
    },error=>console.log(error))
    .then((response)=>{
        return response.json()
    })
    .then((dishes)=>{
        console.log("OK")
        dispatch(getDishes())
    })
    .catch((error)=>dispatch({type:'ADD_DISH_FAILED',payload:error}))
}


export const addComment=(id,commentData)=>async(dispatch)=>{
    const bearer = 'Bearer '+localStorage.getItem('token');
    return fetch(url+'/dishes/'+id+'/comment',{
        method:"POST",
        body:JSON.stringify(commentData),
        headers:{
            'Content-Type':'application/json',
            'Authorization':bearer
        },
        credentials:'same-origin'
    })
    .then((response)=>{
        if(response.ok) {return response}
        else{
            var error=null
            if(response.status===401){
                error = new Error(' ' + response.status + ': ' + response.statusText+'\nPlease login to continue.');
                error.response = response;
                //console.log(error)
                //localStorage.removeItem('token')
                throw error;    
            }else if(response.status===404){
                error = new Error(' ' + response.status + ': ' + response.statusText+'\nNot found!');
                error.response = response;
                //console.log(error)
                throw error;    
            }else{
                error = new Error(' ' + response.status + ': ' + response.statusText+'\nServer Error or Missing field value!');
                error.response = response;
                //console.log(error)
                throw error;    
            }
        }
    },err=>console.log(err))
    .then((response)=>{
        return response
    })
    .then((dish)=>{
        dispatch(getDishes()) 
        console.log("OK")
    })
    .catch((err)=>dispatch({type:'ADD_DISH_FAILED',payload:err}))
}
export const editComment=(id,commentId,commentData)=>async(dispatch)=>{
    const bearer = 'Bearer '+localStorage.getItem('token');
    return fetch(url+'/dishes/'+id+'/comment/'+commentId,{
        method:"PUT",
        body:JSON.stringify(commentData),
        headers:{
            'Content-Type':'application/json',
            'Authorization':bearer
        },
        credentials:'same-origin'
    })
    .then((response)=>{
        if(response.ok) {return response}
        else{
            var error=null
            if(response.status===401){
                error = new Error('Please login to continue.');
                error.response = response;
                //console.log(error)
                //localStorage.removeItem('token')
                throw error;    
            }else if(response.status===404){
                error = new Error('Not found!');
                error.response = response;
                //console.log(error)
                throw error;    
            }else if(response.status===403){
                error = new Error('Can\'t edit anybody else comment!');
                error.response = response;
                //console.log(error)
                throw error;    
            }else{
                error = new Error('Missing field value!');
                error.response = response;
                //console.log(error)
                throw error;    
            }
        }
    },err=>console.log(err))
    .then((response)=>{
        return response
    })
    .then((dish)=>{
        dispatch(getDishes()) 
        console.log("OK")
    })
    .catch((err)=>dispatch({type:'ADD_DISH_FAILED',payload:err}))
}
export const delComment=(id,commentId)=>async(dispatch)=>{
    const bearer = 'Bearer '+localStorage.getItem('token');
    return fetch(url+'/dishes/'+id+'/comment/'+commentId,{
        method:"DeLETE",
        headers:{
            'Content-Type':'application/json',
            'Authorization':bearer
        },
        credentials:'same-origin'
    })
    .then((response)=>{
        if(response.ok) {return response}
        else{
            var error=null
            if(response.status===401){
                error = new Error(' ' + response.status + ': ' + response.statusText+'\nPlease login to continue.');
                error.response = response;
                //console.log(error)
                //localStorage.removeItem('token')
                throw error;    
            }else if(response.status===404){
                error = new Error(' ' + response.status + ': ' + response.statusText+'\nNot found!');
                error.response = response;
                //console.log(error)
                throw error;    
            }else{
                error = new Error(' ' + response.status + ': ' + response.statusText+'\nServer Error or Missing field value!');
                error.response = response;
                //console.log(error)
                throw error;    
            }
        }
    },err=>console.log(err))
    .then((response)=>{
        return response
    })
    .then((dish)=>{
        dispatch(getDishes()) 
        console.log("OK")
    })
    .catch((err)=>dispatch({type:'ADD_DISH_FAILED',payload:err}))
}