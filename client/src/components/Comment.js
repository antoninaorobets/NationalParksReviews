import React, { useState, useContext } from 'react'
import { UserContext } from '../context/user';
import { Card, Button, Form, Stack } from 'react-bootstrap';
import { format } from 'fecha'


function Comment({ comment, handleDelete, handleUpdate }) {
    const [isEditMode, setIsEditMode] = useState(false)
    const { user} = useContext(UserContext)
    const [text, setText] = useState(comment.text)

    const saveComment = (e) => {
        e.preventDefault()
        console.log('save')
        fetch(`/parks/${comment.park_id}/comments/${comment.id}`, {
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

    const commentRead = <Form.Control type="text" placeholder={text} disabled readOnly />

    const commentEdit =
        <Form onSubmit={saveComment}>
            <Form.Control type="text" value={text} onChange={(e) => setText(e.target.value)} />
            <Button type="submit">Save</Button>
        </Form>

    const commentDate = format(new Date(comment.created_at.substring(0, 10)), 'dddd MMMM Do')

    return (

        <Card border="secondary" >
            <Card.Header as="h5"> {comment.user.username} </Card.Header>
            <Card.Body>
                <Card.Text>
                    {(isEditMode)
                        ? commentEdit
                        : commentRead
                    }
                    <cite title="posted"> {commentDate} </cite>
                </Card.Text>
                <Stack direction="horizontal" gap={3}>
                    {(user.id === comment.user.id && !isEditMode)
                        ? <Button variant="secondary" onClick={() => { setIsEditMode(true) }}>Edit</Button>
                        : null}
                    {(user.id === comment.user.id)
                        ? <Button variant="secondary" onClick={onDelete}>Delete</Button>
                        : null}
                </Stack>
            </Card.Body>
        </Card>

    )
}

export default Comment




