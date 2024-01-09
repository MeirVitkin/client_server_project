import axios from 'axios';
import { FaEdit } from 'react-icons/fa';
import React, { useEffect, useState } from 'react'
import "../style/posts.css"
import Comments from './comment';
import Home from './home';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [expandedPostId, setExpandedPostId] = useState(null);
  const [comments, setComments] = useState(null);


  const { id, username, website } = JSON.parse(localStorage.getItem('currentUser'))

  useEffect(() => {
      fetchPosts()
  }, [])

  const fetchPosts = async () => {
      try {
          const { data } = await axios.get(
              `http://localhost:8000/posts`,
              {
                headers:{
                    Authorization:`${username}:${website}`   
                }
             }
          )
          setPosts(data);
      } catch (e) {
          console.log(e);
      }

  }

  const handlePostClick = (postId) => {
    setExpandedPostId((prevId) => (prevId === postId ? null : postId));
    setComments(!expandedPostId ? null : comments);
  };
  const handelCommentsClick = (postId) => {
    setComments((prevId) => (prevId === postId ? null : postId));
  }
  
  return (
    <div className='postsContainer'>
    <Home/>
    <h2>Posts</h2>
    {posts.map((post) => (
      <div key={post.id} className={`post ${expandedPostId === post.id ? 'expanded' : ''}`}>
          <div><h3>#{post.id}</h3></div>
        <div className='postHeader' >
          <div className='postTitle'><h4 onClick={() => handlePostClick(post.id)}>{post.title}</h4>
            {expandedPostId === post.id && (
            <div className='postBody'>
              <span>{post.body}</span>
              <div className='commentsButton' onClick={()=> handelCommentsClick(post.id)}>comments</div>
            </div>
        )}
          </div>
        </div>
        {post.userId === id && comments !== post.id ? (
          <FaEdit className="editIcon" role="button"  tabIndex="0"  aria-label={`Edit`} />
        ):null}
        {comments === post.id && expandedPostId === post.id ? (
          <Comments
          postId={post.id}
          />
        ) : null}
       
        
      </div>
    ))}
  </div>
);
  
}

export default Posts