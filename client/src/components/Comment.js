import React from 'react'

function Comment({comment}) {
  return (
    <div>
        {comment.user.username}:
        <p>{comment.text}</p>
        <button>Edit</button>
        <button>Delete</button>
    </div>
  )
}

export default Comment