import * as api from '../apis/index'

export const login=(formData)=>async(dispatch)=>{
    try{
        const response= await api.login(formData)
        console.log('Logged In Successfully!')
        dispatch({type:'LOGIN',payload:response.data})
    }catch(error){
        alert(error.message);
        dispatch({type:'LOGIN',payload:{success:false,status:'Invalid Username or wrong Password'}})
    }
}
export const signup=(formData)=>async(dispatch)=>{
    try{
        const response= await api.signup(formData)
        console.log('Signed Up Successfully!')
        dispatch({type:'SIGNUP',payload:response.data})
    }catch(error){
        alert(error.message);
        dispatch({type:'LOGIN',payload:{success:false,status:'Username already exists! Please login'}})
    }
}
export const logout=()=>async(dispatch)=>{
    try{
        await api.logout()
        console.log('Log Out Successful!')
        dispatch({type:'LOGOUT',payload:null})
    }catch(error){
        alert(error.message);
    }
}


