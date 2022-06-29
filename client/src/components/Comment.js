import { format } from 'fecha';
import React, { useContext, useState } from 'react';
import { Button, Card, Form, Stack } from 'react-bootstrap';
import { UserContext } from '../context/user';


function Comment({ comment, handleDelete, handleUpdate }) {
    const [isEditMode, setIsEditMode] = useState(false)
    const { user, isLoggedIn} = useContext(UserContext)
    const [text, setText] = useState(comment.text)

    const saveComment = (e) => {
        e.preventDefault()
        console.log('save')
        fetch(`/api/parks/${comment.park_id}/comments/${comment.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "text": text
            })
        }).then(r => {
            if (r.ok) {
                r.json().then(comment => {
                    handleUpdate(comment)
                    setIsEditMode(false)
                })

            }
            else { }
        })
    }
    const onDelete = (e) => {
        fetch(`/api/parks/${comment.park_id}/comments/${comment.id}`, {
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
    const commentDate = format(new Date(comment.created_at.substring(0, 10)), 'dddd MMMM Do')

    const commentRead =                   
        <Form.Group>
            <Form.Control type="text" placeholder={text} disabled readOnly />
           
             <Stack direction="horizontal" gap={3}  style={{padding: "8px"}}>
                {(isLoggedIn && user.id === comment.user.id && !isEditMode)
                    ? <Button variant="secondary" onClick={() => { setIsEditMode(true) }}>Edit</Button>
                    : null}
                {(isLoggedIn && user.id === comment.user.id)
                    ? <Button variant="secondary" onClick={onDelete}>Delete</Button>
                    : null}
            </Stack>

        </Form.Group>
        

    const commentEdit =
            <Form onSubmit={saveComment}>
                <Form.Group>
                <Form.Control type="text" value={text} onChange={(e) => setText(e.target.value)} />
                <Stack direction="horizontal" gap={3} style={{padding: "8px"}}>
                    {(isLoggedIn && user.id === comment.user.id )
                        ? <Button variant="success" type="submit" >Save</Button>
                        : null}
                    {(isLoggedIn && user.id === comment.user.id)
                        ? <Button variant="secondary" onClick={onDelete}>Delete</Button>
                        : null}
                </Stack>
                </Form.Group>
            </Form>
    return (

        <Card border="secondary" style={{padding: "8px", margin: "10px"}} >
            <Card.Header> {comment.user.username} 
            <cite className=" ms-auto" style={{position: "absolute", right: "10px"}}> {commentDate} </cite>
            </Card.Header>
            <Card.Body>
                <Card.Text>
                    {(isEditMode)
                        ? commentEdit
                        : commentRead
                    }                
                </Card.Text>
            </Card.Body>
        </Card>

    )
}

export default Comment




