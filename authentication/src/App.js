import React,{useEffect,useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import './App.css';

import {getDishes} from './redux/actions/dishes'

import User from './components/User'
import CreateDish from './components/CreateDish'
import Dish from './components/Dish';
 const App=()=> {
  const dispatch=useDispatch()
  const [currentId,setCurrentId]=useState(0);
  const [commentId,setCommentId]=useState(0);
  useEffect(()=>{
    dispatch(getDishes())
  },[currentId,commentId,dispatch])

  const user=useSelector((state)=>state.user)
  //console.log(user)
  if(user){
    if(user.token){
      //console.log('Token Saved')
      localStorage.setItem('token',user.token)
      localStorage.setItem('adminu',user.admin)
      localStorage.setItem('authoru',user.author)
    }
  }
  //console.log(localStorage.getItem('authoru'))
  // if(localStorage.getItem('token')){
  //   console.log('Logged In!')
  //  }else{
  //    console.log('Not Logged In!')
  //  }
  //  const admin=localStorage.getItem('adminu')
  //  if(localStorage.getItem('adminu')){
  //   console.log(localStorage.getItem('adminu'))
  //  }else{
  //    console.log('Not Logged In!')
  //  }
  //  console.log(admin)
  //  const dishes=useSelector((state)=>state.dishes)
  //  console.log(dishes)
  return (
    <div className="App container">
      <header className="App-header">
          <h1 className="auth-header">Kanishka Photos</h1>
          <User/>
      </header>
      <main>
          <div className="row">
          {localStorage.getItem('adminu')==='true'?(
            <div className="col-12">
              <CreateDish currentId={currentId} setCurrentId={setCurrentId}/>
            </div>
          ):(<div></div>)}

            <div className="col-12">
              <Dish commentId={commentId} setCommentId={setCommentId} currentId={currentId} setCurrentId={setCurrentId}/>
            </div>
          </div>

      </main>
      <footer>

      </footer>
    </div>
  );
}

export default App;
