import "./Loader.css";
import { useEffect, useState } from "react";

export default function Loader() {

  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("Initializing System...");


  useEffect(() => {

    const messages = [
      "Initializing System...",
      "Loading Customer Data...",
      "Syncing Collection Records...",
      "Preparing Dashboard...",
      "Almost Ready..."
    ];


    let count = 0;

    const interval = setInterval(() => {

      count += 1;

      setProgress(count);


      if(count < 25){
        setMessage(messages[0]);
      }
      else if(count < 50){
        setMessage(messages[1]);
      }
      else if(count < 75){
        setMessage(messages[2]);
      }
      else if(count < 95){
        setMessage(messages[3]);
      }
      else{
        setMessage(messages[4]);
      }


      if(count >= 100){
        clearInterval(interval);
      }


    },35);


    return () => clearInterval(interval);

  },[]);



  return (

    <div className="loader-screen">


      {/* Animated Background */}
      <div className="aurora aurora1"></div>
      <div className="aurora aurora2"></div>
      <div className="aurora aurora3"></div>



      <div className="loader-card">


        {/* Logo Animation */}

        <div className="logo-circle">

          <div className="ring one"></div>

          <div className="ring two"></div>


          <div className="center-logo">

             <span>₹</span>

          </div>

        </div>




        <div className="brand">

          <h1>
            Eazy<span>Paisa</span>
          </h1>

          <p>
            Finance Intelligence Platform
          </p>

        </div>





        <div className="progress-number">

          {progress}%

        </div>





        <div className="progress-bar">

          <div 
          className="progress-fill"
          style={{
            width:`${progress}%`
          }}
          ></div>

        </div>





        <div className="loading-message">

          <span className="dot"></span>

          {message}

        </div>




        <div className="security">

          🔒 Secure • Fast • Reliable

        </div>



      </div>


    </div>

  );
}