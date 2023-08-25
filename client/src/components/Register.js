import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import registerPic from '../images/register.svg'

const Register = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        work: "",
        address: "",
        password: "",
        confirmPassword: ""
    });

    const changeHandler = (event) => {
        const { name, value } = event.target;

        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const registerUser = async (event) => {
        event.preventDefault();

        try{

            const {name, email, phone, work, address, password, confirmPassword} = user;

            const res = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name, email, phone, work, address, password, confirmPassword
                })
            });

            const data = await res.json();

            if(data.status === 422 || !data){
                window.alert('Invalid Registration!');
                console.log('Invalid Registration!');
            } else {
                window.alert('Registration Successfull!');
                console.log('Registration Successfull!');

                navigate('/login');
            }
        }
        catch(err){
            console.log(err);
        }
    };

  return (
    <>
        <section className='register'>
            <div className='container mt-5'>
                <div className='register-content'>
                    <div className='signup-form'>
                        <h2 className='form-title'>Register</h2>
                        <form method='POST' className='register-form' id='register-form'>
                            <div className="form-group">
                                <label htmlFor="name">
                                    <i className="zmdi zmdi-account material-icons-name"></i>
                                </label>
                                <input type="text" name="name" id="name" autoComplete="off" value={user.name} onChange={changeHandler} placeholder="Your Name" />
                                <br />
                                <label htmlFor="email">
                                    <i className="zmdi zmdi-email material-icons-name"></i>
                                </label>
                                <input type="text" name="email" id="email" autoComplete="off" value={user.email} onChange={changeHandler} placeholder="Your Email" />
                                <br />
                                <label htmlFor="phone">
                                    <i className="zmdi zmdi-phone material-icons-name"></i>
                                </label>
                                <input type="text" name="phone" id="phone" autoComplete="off" value={user.phone} onChange={changeHandler} placeholder="Your Phone" />
                                <br />
                                <label htmlFor="work">
                                    <i className="zmdi zmdi-case material-icons-name"></i>
                                </label>
                                <input type="text" name="work" id="work" autoComplete="off" value={user.work} onChange={changeHandler} placeholder="Your Work" />
                                <br />
                                <label htmlFor="address">
                                    <i className="zmdi zmdi-gps-dot material-icons-name"></i>
                                </label>
                                <input type="text" name="address" id="address" autoComplete="off" value={user.address} onChange={changeHandler} placeholder="Your Address" />
                                <br />
                                <label htmlFor="password">
                                    <i className="zmdi zmdi-shield-check material-icons-name"></i>
                                </label>
                                <input type="password" name="password" id="password" autoComplete="off" value={user.password} onChange={changeHandler} placeholder="Your Password" />
                                <br />
                                <label htmlFor="confirm-password">
                                    <i className="zmdi zmdi-shield-security material-icons-name"></i>
                                </label>
                                <input type="password" name="confirmPassword" id="confirm-password" autoComplete="off" value={user.confirmPassword} onChange={changeHandler} placeholder="Confirm your Password" />
                                <br />
                                <div className="btn">
                                    <button type='submit' onClick={registerUser}>Register</button>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="register-image">
                        <figure>
                            <img src={registerPic} alt="registration" />
                        </figure>
                        <span>Already registered? <NavLink to="/login" className="registered">Log In</NavLink></span>
                    </div>
                    
                </div>
            </div>
        </section>
    </>
  )
}

export default Register