import React, { useState, useEffect } from 'react'
import { FaEdit } from 'react-icons/fa';
import axios from 'axios';


const Comments = ({postId}) => {
    const [comments, setComments] = useState([]);
  const { id, username, website } = JSON.parse(localStorage.getItem('currentUser'))
  useEffect(() => {
    fetchComments()
}, [])
  const fetchComments = async () => {
    try {
        const { data } = await axios.get(
            `http://localhost:8000/comments/${id}?postId=${postId}`,
            {
              headers:{
                  Authorization:`${username}:${website}`   
              }
           }
        )
        setComments(data);
        console.log(data);
    } catch (e) {
        console.log(e);
    }

}

  return (
    <div className='commentsContaier'>
       {comments.map(comment =>(
        <>
        <div className='comment' key={comment.id}> {comment.body}
         </div>
          <FaEdit className="editIcon" role="button"  tabIndex="0"  aria-label={`Edit`} />
        </>
       ))} 
    </div>
  )
}

export default Comments