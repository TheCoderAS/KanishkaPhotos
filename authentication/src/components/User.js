import React,{useState} from 'react'

import {login, signup, logout} from '../redux/actions/users'
import {useDispatch} from 'react-redux'
import $ from 'jquery'

const Form=()=>{

    const dispatch=useDispatch();
    const [formData,setFormData]=useState({firstname:'',lastname:'',username:'',password:''})

    const signUp=async(e)=>{
        e.preventDefault()
        if(!localStorage.getItem('token')){
            if(formData){
                dispatch(signup(formData));
            }else{
                alert('Data not filled correctly!')
            }
        }else{
            alert('Already Logged In!')
        }
        $('#signModal').modal('hide')
        clear()
      }
      const logIn=async(e)=>{
        e.preventDefault()
        if(!localStorage.getItem('token')){
            if(formData.username!==''&&formData.password!==''){
                dispatch(login(formData));
            }else{
                alert('Username or password required!')
            }
        }else{
            alert('Already Logged In!')
        }
        $('#loginModal').modal('hide')
        clear()
      }
      const logOut=async(e)=>{
        e.preventDefault()
        if(localStorage.getItem('token')){
            localStorage.removeItem('token')
            localStorage.removeItem('adminu')
            localStorage.removeItem('authoru')
            dispatch(logout());
        }else{
            alert('Not Logged In!')
        }
        clear()
      }
      const clear=()=>{
        setFormData({firstname:'',lastname:'',username:'',password:''})
      }
      return(
          !localStorage.getItem('token')?(<>
            <button className="login-btn" type="button" data-toggle="modal" data-target="#signModal">SignUp</button>

            <button className="login-btn" type="button" data-toggle="modal" data-target="#loginModal">Login</button>

            <div className="modal fade" id="signModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">SignUp</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form className="form" onSubmit={signUp}>
                                <input required className="input" name="firstname" placeholder="First Name" type="name" value={formData.firstname} onChange={(e)=>setFormData({...formData,firstname:e.target.value})}/>
                                <input required className="input" name="lastname" placeholder="Last Name" type="name" value={formData.lastname} onChange={(e)=>setFormData({...formData,lastname:e.target.value})}/>
                                <input required className="input" name="username" placeholder="Username" type="name" value={formData.username} onChange={(e)=>setFormData({...formData,username:e.target.value})}/>
                                <input required className="input" name="password" placeholder="Password" type="password" value={formData.password} onChange={(e)=>setFormData({...formData,password:e.target.value})}/>
                                <button className="button" type="reset" onClick={clear}>Reset</button>
                                <button className="button" type="submit">SignUp</button>
                            </form>                    
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="loginModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Login</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form className="form" onSubmit={logIn}>
                                <input required className="input" name="username" placeholder="Username" type="name" value={formData.username} onChange={(e)=>setFormData({...formData,username:e.target.value})}/>
                                <input required className="input" name="password" placeholder="Password" type="password" value={formData.password} onChange={(e)=>setFormData({...formData,password:e.target.value})}/>
                                <button className="button" type="reset" onClick={clear}>Reset</button>
                                <button className="button" type="submit">Login</button>
                            </form>                    
                        </div>
                    </div>
                </div>
            </div>
            </>
          ):(<button className="button" type="submit" onClick={logOut}>Log Out</button>)
    )
}
export default Form;