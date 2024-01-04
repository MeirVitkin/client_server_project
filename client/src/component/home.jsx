import React from 'react'
import { useNavigate } from "react-router-dom";


const Home = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('currentUser'))


  function navTo(e) {
    if (e == 'log Out' ){
      localStorage.removeItem('currentUser');
      navigate(`/login`);
      return
    }
    navigate(`/home/${user.username}/${e}`);
  }
  return (
    <>
      <h1 className="userNameHeader">{user.name}</h1>

      <nav className='navBar'>
        <div className='navButtons' onClick={(e) => navTo(e.target.innerText)}>Info</div>
        <div className='navButtons' onClick={(e) => navTo(e.target.innerText)}>Todos</div>
        <div className='navButtons' onClick={(e) => navTo(e.target.innerText)}>Posts</div>
        <div className='navButtons' onClick={(e) => navTo(e.target.innerText)}>log Out</div>
      </nav>
    </>

  )
}

export default Home