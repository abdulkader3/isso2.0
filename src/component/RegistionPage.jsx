import { Bounce , toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { BeatLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import app from "../firebase.config";

const RegistrationPage = () => {
  // =========Use state for inputs
  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loader, setLoader] = useState(false);
  const Navigate = useNavigate()

  // ==========Firebase setup
  const auth = getAuth();

  // =======Handlers for form fields
  const handleFirstName = (e) => {
    setFirstName(e.target.value);
    setFirstNameError("");
  };
  
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };
  
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
  };

  // =======Submit form handler
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!firstName) {
      setFirstNameError("Please enter your first name");
    } else if (!email) {
      setEmailError("Please enter your email");
    } else if (!password) {
      setPasswordError("Please enter your password");
    } else {
      setLoader(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          setLoader(false);
          toast.success('Registration successful', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            });
            Navigate('/')
        })
        .catch((error) => {
          setLoader(false);
          const errorCode = error.code;
          console.log(errorCode)
          if(errorCode == 'auth/email-already-in-use'){
            toast.error('You already have an account', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
              });
          }
          if(errorCode == 'auth/weak-password'){
            toast.error('Use stronger password', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
              });
          }

        });
    }
  };

  return (
    <>
    
      <div className="flex">
        <div className="warper font-poppins rounded-[12px]">
          <form onSubmit={handleSubmit}>
            <h1 className="text-[35px] text-center font-poppins font-semibold">
              Register
            </h1>

            {/* First Name */}
            <div className="inputBox">
              <input
                onChange={handleFirstName}
                type="text"
                placeholder="First Name"
              />
            </div>
            <div className="pl-5 text-[#8bcfff] text-[12px]">
              <p>{firstNameError}</p>
            </div>

            {/* Email */}
            <div className="inputBox">
              <input onChange={handleEmail} type="email" placeholder="Email" />
            </div>
            <div className="pl-5 text-[#8bcfff] text-[12px]">
              <p>{emailError}</p>
            </div>

            {/* Password */}
            <div className="inputBox">
              <input
                type="password"
                onChange={handlePassword}
                placeholder="Password"
              />
            </div>
            <div className="pl-5 text-[#8bcfff] text-[12px]">
              <p>{passwordError}</p>
            </div>

            {/* Submit Button */}
            {loader ? (
              <div className="flex justify-center items-center w-full h-[45px] active:scale-105 transition-all border-none outline-none shadow-md cursor-pointer text-[17px] text-[#333] font-semibold rounded-[40px] bg-white">
                <BeatLoader />
              </div>
            ) : (
              <button
                type="submit"
                className="w-full h-[45px] active:scale-105 transition-all border-none outline-none shadow-md cursor-pointer text-[17px] text-[#333] font-semibold rounded-[40px] bg-white"
              >
                Sign Up
              </button>
            )}

            {/* Divider */}
            <div className="w-full flex mt-10 items-center gap-3 justify-center">
              <div className="w-40 h-[2px] bg-white"></div>
              <p>Or</p>
              <div className="w-40 h-[2px] bg-white"></div>
            </div>

            {/* Social Login Options */}
            <div className="w-full gap-10 justify-center mt-5 mb-12 flex">
              <div className="w-7 h-7">
                <a href="https://accounts.google.com/">
                  <img src="photos/search.png" alt="Google" />
                </a>
              </div>
              <div className="w-7 h-7">
                <a href="https://web.facebook.com">
                  <img src="photos/facebook.png" alt="Facebook" />
                </a>
              </div>
              <div className="w-7 h-7">
                <a href="https://x.com">
                  <img src="photos/twitter.png" alt="Twitter" />
                </a>
              </div>
              <div className="w-7 h-7">
                <a href="https://www.icloud.com/">
                  <img src="photos/apple-logo.png" alt="Apple" />
                </a>
              </div>
            </div>

            {/* Already Have Account */}
            <div className="registerlink text-[15px] text-center mt-5">
              <p>
                Already have an account?{" "}
                <a href="/" className="">
                  Login
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegistrationPage;
