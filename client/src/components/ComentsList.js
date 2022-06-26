import React,{useState, useContext} from 'react'
import Comment from './Comment'
import { UserContext } from '../context/user';

function ComentsList({allComments, park_id}) {
    const [text,setText] = useState('')
    const {user, isLoggedIn} =useContext(UserContext)
    const [comments, setComments] = useState(allComments)

    const handleChange = (e) => {
        setText(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
         if (isLoggedIn) {
            fetch(`/parks/${park_id}/comments`,{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    "text": text,
                    "user_id": user.id 
                })
            })
            .then(r=>{
                if (r.ok) {
                    r.json().then(newComent => setComments([...comments, newComent]))
                } else {
                    r.json().then(error => console.log(error))
                }
            })
        }
          else {
             //"state for error"
             console.error("login")
         }
    }
    const handleDelete = (id) => {    
        const updatedList = comments.filter(comment => comment.id !== id)
        setComments(updatedList)
    }
     const list = comments.map(comment => <Comment key={comment.id} comment={comment} handleDelete={handleDelete}/>)
  return (
    <div> <form onSubmit={handleSubmit}>
        <label > New comment: </label>
        <input type="text" onChange={handleChange}></input>
        <input type="submit"></input>
    </form>

        
         {list} 
    </div>
  )
}

export default ComentsList