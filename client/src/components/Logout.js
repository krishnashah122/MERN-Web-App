import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Logout = () => {

  const {state, dispatch } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    fetch('/logout', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    }).then((res) => {
      dispatch({ type: 'LOGOUT' });
      navigate('/login', {replace: true});

      if(res.status != 200){
        throw new Error(res.error);
      }
    })
    .catch((err) => {
      console.log(err);
    });
  });

  return (
    <>
        <h1>Logout Page</h1>
    </>
  )
}

export default Logout