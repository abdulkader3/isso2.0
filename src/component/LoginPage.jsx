import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FaUnlock } from "react-icons/fa"
import Lottie from "lottie-react";
import LoginAnimetion from '../../public/animetion/LoginAnimation.json'
import "./Home.css";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
  // useState for email input
  const [email, upemail] = useState("");
  const [emailEror, upemailEror] = useState("");
  
  
  const [password, uppassword] = useState("");
  const [passwordEror, uppasswordEror] = useState("");

 // for icons
 const [one , two]=useState(false)

 const nextIcon =()=>{
    two(!one)
 }



  // Function for form

  const funForEmail = (e) => {
    
    upemail(e.target.value);
    upemailEror('')
  };
  
  const funForpassword = (e) => {
    
    uppassword(e.target.value);
    uppasswordEror('')
  };




  const SubForForm = (e) => {
    e.preventDefault();

    if(!email){
      upemailEror('please enter your email')
    }else if(!password){
        uppasswordEror('please enter your password')
    }else{
        upemailEror('')
        uppasswordEror('')
        toast('Login is done 😊', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
          });

    }


    
  };








  return (
    <>
    <ToastContainer />
      <div className=" flex ">
        <div className=" w-[500px] gap-40 h-full ">
          <Lottie animationData={LoginAnimetion}/>
        </div>
        <div className="warper mr-[390px] font-poppins rounded-[12px] ">
        <form onSubmit={SubForForm}>
          <h1 className=" text-[35px] text-center font-poppins font-semibold ">
            Login
          </h1>
          <div className="inputBox">
            <input
              type="email"
              onChange={funForEmail}
              placeholder="Your email please"
            />
            <FaUser className="icons" />
            
          </div>
          <div className="mb-8"><p className="pl-5 text-[#8bcfff] text-[12px] " > {emailEror} </p></div>
          


          <div className="inputBox">
            <input type={one? 'text' : 'password'} onChange={funForpassword} placeholder="Your password please" />
            {
                one?<FaUnlock className="icons" onClick={nextIcon} /> :<FaLock className="icons" onClick={nextIcon} />
                
            }
            
          </div>
          <div className="mb-8"><p className="pl-5 text-[#8bcfff] text-[12px] " > {passwordEror} </p></div>
          <div className="rememberForgot">
            <label>
              {" "}
              <input type="checkbox" />
              Remember me{" "}
            </label>
            <a href="#"> forgot password ? </a>
          </div>
          <button
            type="submit"
            className=" w-full h-[45px] active:scale-105 transition-all border-none outline-none shadow-md cursor-pointer text-[17px] text-[#333] font-semibold rounded-[40px] text-black bg-white "
          >
            Login
          </button>
          <div className="w-full flex mt-10 items-center gap-3 justify-center ">
            <div className="w-40 h-[2px] bg-white  "></div>
            <div className=""><p>Or</p></div>
            <div className="w-40 h-[2px] bg-white  "></div>
          </div>
          <div className="w-full gap-10 justify-center mt-5 mb-12 flex">
            <div className=" w-7 h-7 "><a href="https://accounts.google.com/v3/signin/identifier?authuser=0&continue=https%3A%2F%2Fmyaccount.google.com%2F%3Fhl%3Den%26utm_source%3DOGB%26utm_medium%3Dact&ec=GAlAwAE&hl=en&service=accountsettings&flowName=GlifWebSignIn&flowEntry=AddSession&dsh=S1108304790%3A1721147554738150&ddm=0"><img src="photos/search.png" alt="link" /></a></div>
            <div className=" w-7 h-7 "><a href="https://web.facebook.com"><img src="photos/facebook.png" alt="link" /></a></div>
            <div className=" w-7 h-7 "><a href="https://x.com"><img src="photos/twitter.png" alt="link" /></a></div>
            <div className=" w-7 h-7 "><a href="https://www.icloud.com/"><img src="photos/apple-logo.png" alt="link" /></a></div>
          </div>
          <div className="registerlink text-[15px] text-center mt-5 ">
            <p>
              Don't have an account ?{" "}
              <a className="  " href="/registion">
                Register
              </a>
            </p>
          </div>
        </form>
      </div>
      </div>
    </>
  );
};

export default LoginPage;
