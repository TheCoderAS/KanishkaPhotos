import React, { useEffect, useState } from 'react'
import Resizer from 'react-image-file-resizer'

import {useDispatch, useSelector} from 'react-redux'
import {addDishes,updateDish} from '../redux/actions/dishes'

const CreateDish=({currentId,setCurrentId})=>{

    const dispatch =useDispatch()
    const [dishData,setDishData]=useState({name:'',description:'',image:'',category:'',label:'',price:'',featured:false})
    const dish=useSelector((state)=>(currentId?state.dishes.find((dish)=>dish._id===currentId):null))
        useEffect(()=>{
            if(dish) setDishData(dish)
    },[dish])

    //console.log(dishData)
    const clear=()=>{
        setDishData({name:'',description:'',image:'',category:'',label:'',price:'',featured:false})
        setCurrentId(0)
    }

    const addDish=(e)=>{
        e.preventDefault();
        //console.log(dishData)
        if(currentId===0){
            dispatch(addDishes(dishData))
        }else{
            //console.log('Updating')
            dispatch(updateDish(currentId,dishData))
        }
        clear()
    }

    const fileHandler=(e)=>{
        var fileInput=false;
        //console.log(e.target.files)
        if (e.target.files[0]){
            fileInput=true;
        }
        if(fileInput){
            try{
                Resizer.imageFileResizer(e.target.files[0],300,200,"JPEG",60,0,(uri)=>{
                    //console.log(uri)
                    setDishData({...dishData,image:uri})
                },"base64",200,150)
            }catch(error){
                alert('File upload failed!')
            }
        }
    }
      return(
          
        <form id="create" className="form dish"style={{marginTop:'20px'}} onSubmit={addDish}>
            <h2>{currentId?('Edit Photo'):('Add new Photo')}</h2>
            <input required className="input" name="name" placeholder="Photo Name" type="text" value={dishData.name} onChange={(e)=>setDishData({...dishData,name:e.target.value})}/>

            <input required className="input" name="description" placeholder="Description" type="text" value={dishData.description} onChange={(e)=>setDishData({...dishData,description:e.target.value})}/>

            <input required className="input" name="category" placeholder="Category" type="text" value={dishData.category} onChange={(e)=>setDishData({...dishData,category:e.target.value})}/>

            <input required className="input" name="label" placeholder="Label" type="text" value={dishData.label} onChange={(e)=>setDishData({...dishData,label:e.target.value})}/>

            <input required className="input" name="price" placeholder="Price" type="text" value={dishData.price} onChange={(e)=>setDishData({...dishData,price:e.target.value})}/>

            <div className="radio">
                <label htmlFor="featured"><input type="checkbox" name="featured" checked={dishData.featured==='true'} onChange={(e)=>setDishData({...dishData, featured:e.target.checked})}/>Featured</label>
            </div>

            <div className="file"> 
                <input type="file" onChange={fileHandler}/>
            </div>

            <button className="buttond" onClick={()=>clear()} type="reset">Clear</button>
            <button className="buttond" type="submit">Add Dish</button>
        </form>
    )
}
export default CreateDish;