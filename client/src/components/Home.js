import React, { useEffect, useState } from 'react'

const Home = () => {

  const [userName, setUserName] = useState('');

  const [show, setShow] = useState(false);

  const getuserName = async () =>{
    try{
      const res = await fetch('/getData', {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      const data = await res.json();
      setUserName(data.name);
      setShow(true);

      if(!res.status === 200){
        throw new Error(res.error);
      }

    }
    catch(err){
      console.log(err);
    }
  }

  useEffect(() => {
    getuserName();
  }, []);

  return (
    <>
      <div className="home-page">
        <div className="home-div">
          <h3>WELCOME!</h3>
          <h1><span>{userName}</span></h1>
          <br />
          <h1>{show ? 'Happy, to see you back!' : 'We are the MERN Developer!'}</h1>
        </div>
      </div>
    </>
  )
}

export default Home