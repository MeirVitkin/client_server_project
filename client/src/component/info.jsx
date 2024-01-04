import React from 'react'

const Info = () => {
    const user = JSON.parse(localStorage.getItem('currentUser'))

  return (
    <div className='userInfoContainor'>
        <h1>{user.name}</h1><br />
        <h3>city: {user.city}</h3><br />
        <h3>street: {user.email}</h3><br />
        <h3>email {user.email}</h3><br />
        <h3>phone: {user.phone}</h3><br />
    </div>
  )
}

export default Info