import React,{useContext} from 'react'
import { UserContext } from '../context/user';

function Comment({comment, handleDelete}) {
    const {user, isLoggedIn} =useContext(UserContext)
    console.log(comment)
    const onDelete =(e)=>{
        fetch(`/parks/${comment.park_id}/comments/${comment.id}`, {
            method: "DELETE",
            headers: {"Content-Type" : "application/json"}
        }).then(resp => {
            if (resp.ok){
                resp.json().then(data=> handleDelete(comment.id))
            } else {
                resp.json().then(error => console.error(error))
            }
        })
    }
    const buttons =  <div>
        <button>Edit</button> 
        <button onClick={onDelete}>Delete</button>
    </div>
  return (
    <div>
        {comment.user.username}:
        <p>{comment.text}</p>
        {(isLoggedIn && user.id === comment.user.id ) 
        ? buttons
        : null}
    </div>
  )
}

export default Comment