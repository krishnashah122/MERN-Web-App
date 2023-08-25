import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import profile from '../images/profile.png'

const About = () => {

  const navigate = useNavigate();
  const [userData, setUserData] = useState({});

  const callAboutPage = async () =>{
    try{
      const res = await fetch('/about', {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      });

      const data = await res.json();
      setUserData(data);

      if(!res.status === 200){
        throw new Error(res.error);
      }

    }
    catch(err){
      console.log(err);
      navigate('/login');
    }
  }

  useEffect(() => {
    callAboutPage();
  }, []);

  return (
    <>
      <div className="profile-container">
        <form method='GET'>
          <div className="row" id="row">
            <div className="col-md-4">
              <div className="profile-img">
                <img src={profile} alt="profile" />
              </div>
            </div>

            <div className="col-md-6">
              <div className="profile-head">
                <h5>{userData.name}</h5>
                <h6>{userData.work}</h6>
                <p className="profile-rating">
                  RANKINGS: <span>9/10</span>
                </p>

                <div className="col-md-2">
                  <button className='profile-edit-btn' name='edit-btn'>Edit Profile</button>
                </div>

                <div className="profile-title mt-5">About</div>
                <hr />

                <div className="col-md-8 py-2 about-info">
                  <div className="tab-content profile-tab" id='tabContent'>
                    <div className="tab-pane fade show active">

                      <div className="row py-1">
                        <div className="col-md-6 user-data-label">
                          <label>Name:</label>
                        </div>
                        <div className="col-md-6 user-data">
                          <label>{userData.name}</label>
                        </div>
                      </div>
                      <div className="row py-1">
                        <div className="col-md-6 user-data-label">
                          <label>Email:</label>
                        </div>
                        <div className="col-md-6 user-data">
                          <label>{userData.email}</label>
                        </div>
                      </div>
                      <div className="row py-1">
                        <div className="col-md-6 user-data-label">
                          <label>Phone:</label>
                        </div>
                        <div className="col-md-6 user-data">
                          <label>{userData.phone}</label>
                        </div>
                      </div>
                      <div className="row py-1">
                        <div className="col-md-6 user-data-label">
                          <label>Work:</label>
                        </div>
                        <div className="col-md-6 user-data">
                          <label>{userData.work}</label>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>

              </div>

            </div>
            
          </div>
        </form>
      </div>
    </>
  )
}

export default About