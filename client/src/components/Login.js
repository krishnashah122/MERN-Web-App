import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import loginPic from '../images/login.svg'
import { useAuth } from './AuthContext'

const Login = () => {

    const { state, dispatch } = useAuth();

    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        password: ""
    });

    const changeHandler = (event) => {
        const {name, value} = event.target;

        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const loginUser = async (event) => {
        event.preventDefault();

        try{
            const {email, password} = user;

            const res = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, password})
            })

            const data = res.json();

            if(data.status === 400 || !data){
                window.alert('Invalid Credentials!');
                console.log('Invalid Credentials!');
            } else {
                dispatch({ type: 'LOGIN' });
                window.alert('Logged In Successfully!');
                console.log('Logged In Successfully!');

                navigate('/');
            }
        }
        catch(err){
            console.log(err);
        }
    }

  return (
    <>
      <section className='login'>
            <div className='container mt-5'>
                <div className='login-content'>
                    <div className='signin-form'>
                        <h2 className='form-title'>Login</h2>
                        <form method='POST' className='login-form' id='login-form'>
                            <div className="form-group">
                                <label htmlFor="email">
                                    <i className="zmdi zmdi-email material-icons-name"></i>
                                </label>
                                <input type="text" name="email" id="email" autoComplete="off" value={user.email} onChange={changeHandler} placeholder="Your Email" />
                                <br />
                                <label htmlFor="password">
                                    <i className="zmdi zmdi-shield-check material-icons-name"></i>
                                </label>
                                <input type="password" name="password" id="password" autoComplete="off" value={user.password} onChange={changeHandler} placeholder="Your Password" />
                                <br />
                                <div className="btn">
                                    <button type='submit' onClick={loginUser}>Log In</button>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="login-image">
                        <figure>
                            <img src={loginPic} alt="registration" />
                        </figure>
                        <span>Don't have an account? <NavLink to="/register" className="logged">Register</NavLink></span>
                    </div>
                    
                </div>
            </div>
        </section>
    </>
  )
}

export default Login