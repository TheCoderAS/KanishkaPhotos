import React, {useEffect, useState } from 'react'
import moment from 'moment'
import {useSelector,useDispatch} from 'react-redux'
import {addComment,editComment,delComment,delDish} from '../redux/actions/dishes'
import $ from 'jquery'
const Comment=({currentId,setCurrentId,commentId,setCommentId})=>{
	const dispatch=useDispatch()

	const[commentData,setCommentData]=useState({rating:'',comment:''})
	const dish=useSelector((state)=>state.dishes.find((dish)=>dish._id===currentId))
	var comment=null;
	if(dish){
		comment=dish.comments.find((comment)=>comment._id===commentId)
	}
	useEffect(()=>{
		if(comment) setCommentData(comment)
		else setCommentData({rating:'',comment:''})
	},[comment])
	//console.log(commentData)
	const clear=()=>{
		setCurrentId(0)
		setCommentId(0)
		setCommentData({rating:'',comment:''})
	}
	const submitComment=(e)=>{
		e.preventDefault();
		// console.log(currentId)
		// console.log(commentData)
		if(!commentId){
			dispatch(addComment(currentId,commentData))
		}else{
			if(commentId){
				dispatch(editComment(currentId,commentId,commentData))
			}
		}
		$('#commentModal').modal('hide')
		clear()
	}

	return(
		<div className="modal fade" id="commentModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div className="modal-dialog" role="document">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title" id="exampleModalLabel">{commentId?("Edit Comment"):("Post Comment")}</h5>
						<button type="button" className="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div className="modal-body">
						<div className="comment">
							<form onSubmit={submitComment}>
								<input required className="input" name="comment" placeholder="Comment" type="text" value={commentData.comment} onChange={(e)=>setCommentData({...commentData,comment:e.target.value})}/>

								<input required className="input" name="rating" placeholder="Rating (between 1 and 5)" min="1" max="5" type="number" value={commentData.rating} onChange={(e)=>setCommentData({...commentData,rating:e.target.value})}/>

								<br/>
								<button className="buttond" onClick={()=>clear()} type="reset">Clear</button>

								<button className="buttond" type="submit">Comment</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
const Dish=({currentId,setCurrentId,commentId,setCommentId})=>{
    const dishes=useSelector((state)=>state.dishes)
			//console.log(dishes)
			const dispatch=useDispatch()
		const deleteComment=(dishId,commentId)=>{
			if(window.confirm('Comment will be deleted permanently!')){
				dispatch(delComment(dishId,commentId))
			}else{
				console.log('cancelled')
			}
		}
		// const updateDish=()=>{
		// 	if(window.confirm(`Dish with ID: ${currentId} will be updated!`)){
		// 		console.log('Updated')
		// 	}else{
		// 		console.log('cancelled')
		// 	}
		// }
		const deletDish=()=>{
			if(window.confirm(`Dish with ID: ${currentId} will be deleted!`)){
				dispatch(delDish(currentId))
			}else{
				console.log('cancelled')
			}
		}
    return(
			!dishes.length>0?(<h1>Loading...</h1>):(
        <div className="dish">
						<Comment setCurrentId={setCurrentId} currentId={currentId} commentId={commentId} setCommentId={setCommentId}/>
            <h1>Dishes</h1>
							<div className="row">
								{dishes.map((dish)=>{
												return(
													<div key={dish._id} className="col-md-4 col-12 card-group">
														<div className="card" >
																<img src={dish.image} className="card-img-top" alt="..."/>

																<div className="dropup">
																	{localStorage.getItem('adminu')==='true'?(<>
																			<button onClick={()=>setCurrentId(dish._id)} className="btn btn-block btn-sm btn-outline-warning dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
																			Edit Post
																		</button>
																		<div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
																			<a href="#create" className="dropdown-item" >Update</a>
																			<span onClick={()=>deletDish()} className="dropdown-item" >Delete</span>
																		</div>
																	</>):('')}
																</div>


																<div className="card-body">
																<h5 className="card-title">{dish.name} <span className="badge badge-danger">{dish.label}</span></h5>
																<h6>{dish.category}</h6>
																<h6>Price: {dish.price}{dish.featured===true?("*"):("")}</h6>
																<p className="card-text">{dish.description}</p>
															</div>
															<div className="comments">
																<h6>Comments</h6>
																<div className="text-right">
																	<button onClick={()=>{setCurrentId(dish._id);setCommentId(0)}} className="plus" data-toggle="modal" data-target="#commentModal">&nbsp;+&nbsp;</button>
																</div>
																	{dish.comments.map((comment)=>{
																		return(<div className="comment" key={comment._id}>
																			<span id="author">{comment.author}</span>
																			{((localStorage.getItem('token')&&localStorage.getItem('authoru')===comment.author)||localStorage.getItem('adminu')==='true')?(
																			<button onClick={()=>{setCurrentId(dish._id);setCommentId(comment._id)
																			}} className="edit" data-toggle="modal" data-target="#commentModal"><small>Edit</small></button>):('')
																			}
																			{(localStorage.getItem('token')&&localStorage.getItem('adminu')==='true')?(
																			<button onClick={()=>deleteComment(dish._id,comment._id)} className="edit"><small>Delete</small></button>):('')
																			}<br/>

																			<span>Rating: {comment.rating}</span><span style={{margin:'0% 0 0 3%',padding:'1px 2px 1px 2px',boxShadow:'0px 0px 1px'}} className="text-danger">{moment(comment.createdAt).fromNow()}</span><br/>
																			<span>Comment: {comment.comment}</span><br/>
																			</div>
																		)
																	})}
															</div>

															<div className="card-footer">
																<small className="text-muted">{moment(dish.createdAt).fromNow()}</small>
															</div>
														</div>
													</div>
												)
										})
								}
							</div>
        </div>
			)
    )
}
export default Dish