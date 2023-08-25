import React, { useEffect, useState } from 'react'
import ContactDetails from './ContactDetails'

const Contact = () => {

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const getUserData = async () =>{
    try{
      const res = await fetch('/getData', {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      const data = await res.json();
      setUserData({...userData, name: data.name, email: data.email, phone: data.phone, address: data.address});

      if(!res.status === 200){
        throw new Error(res.error);
      }

    }
    catch(err){
      console.log(err);
    }
  }

  useEffect(() => {
    getUserData();
  }, []);

  const changeHandler = (event) => {
    const { name, value } = event.target;

    setUserData({
      ...userData,
      [name]: value
    });
  };

  const sendData = async (event) => {
    event.preventDefault();

    const {name, email, phone, message} = userData;

    const res = await fetch('/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name, email, phone, message
      })
    });

    const data = res.json();

    if(!data){
      console.log('Message not sent!');
    } else {
      alert('Message Sent!');
      setUserData({...userData, message: ""});
    }
  }

  return (
    <>
      <div className="contact-info">
        <div className="container-fluid">
          <div className="row">
            <div className='item-container'>

              <ContactDetails item = "Phone" itemDetail = {userData.phone} icon = "phone"/>
              <ContactDetails item = "Email" itemDetail = {userData.email} icon = "email"/>
              <ContactDetails item = "Address" itemDetail = {userData.address} icon = "gps-dot"/>

            </div>
          </div>
        </div>

        <div className="contact-form-container">

          <form method='POST' id='contact-form'>
            <div className="form-details-container">
              <h2>Get in Touch</h2>
              <div className="input-field-container">
                <input className="input" type="text" name='name' value={userData.name} onChange={changeHandler} required='true' placeholder='Name'/>
                <input className="input" type="text" name='email' value={userData.email} onChange={changeHandler} required='true' placeholder='Email'/>
                <input className="input" type="text" name='phone' value={userData.phone} onChange={changeHandler} required='true' placeholder='Phone'/>
              </div>
              <textarea className="input" name="message" onChange={changeHandler} id="contact-message" cols="30" rows="10" required='true' placeholder='Message'></textarea>
            </div>
            <div className="btn">
              <button type='submit' onClick={sendData}>Send</button>
            </div>
          </form>

        </div>

      </div>
    </>
  )
}

export default Contact