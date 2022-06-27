import React, { useState, useContext } from 'react'
import { UserContext } from '../context/user';
import { ButtonGroup, Button, Form } from 'react-bootstrap';

function Comment({ comment, handleDelete, handleUpdate}) {
    const [ isEditMode, setIsEditMode ] = useState(false)
    const { user, isLoggedIn } = useContext(UserContext)
    const [text, setText] =useState(comment.text)

    const saveComment =(e)=>{
        e.preventDefault()
        console.log('save')
        fetch(`/parks/${comment.park_id}/comments/${comment.id}`,{
            method: "PATCH",
            headers:  {"Content-Type": "application/json" },
            body: JSON.stringify({
                "text": text
            })
        }).then(r=>{
            if (r.ok) {
               r.json().then(comment => {
                handleUpdate(comment)
                setIsEditMode(false)
               })
                
            }
            else {}
        })       
    }
    const onDelete = (e) => {
        fetch(`/parks/${comment.park_id}/comments/${comment.id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        }).then(resp => {
            if (resp.ok) {
                resp.json().then(data => handleDelete(comment.id))
            } else {
                resp.json().then(error => console.error(error))
            }
        })
    }
    
    const commentRead = <Form.Control type="text" placeholder={text} disabled readOnly/>
   
    const commentEdit = 
        <Form onSubmit={saveComment}>
            <Form.Control type="text" value={text} onChange={(e)=> setText(e.target.value)} />
            <Button type="submit">Save</Button>
        </Form> 

    return (
        <div>
            {comment.user.username}
             {(isEditMode)
            ? commentEdit
            : commentRead
            }
            {(isLoggedIn && user.id === comment.user.id && !isEditMode)
                ?  <Button variant="secondary" onClick={()=>{setIsEditMode(true)}}>Edit</Button>
                : null}

            {(isLoggedIn && user.id === comment.user.id)
                ? <Button variant="secondary" onClick={onDelete}>Delete</Button>
                : null}

        </div>
    )
}

export default Comment




