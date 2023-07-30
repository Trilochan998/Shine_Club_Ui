import React, { useEffect } from 'react'

const Logout = () => {
    useEffect(() => {
    sessionStorage.removeItem('isLoggedIn');
  }, []);
  return (
    <div>
      <h1>this is Logout Page</h1>
    </div>
  )
}

export default Logout
