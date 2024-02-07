import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';

const LoginPage = () => {
  const navigate = useNavigate();

  const{loading,error,succes,currentUser, status} = useSelector(  (state) => state.auth);

  const dispatch = useDispatch();


  const [mail, setMail] = useState("")
  const [password, setPassword] = useState("");

  const [eyeOpen , setEyeopen]  = useState(false);
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-slate-400 ">
        <div className="flex flex-col gap-y-5  py-10  px-8 border rounded-md shadow-lg bg-white ">
          <div>
            <h1 className="text-4xl font-bold ">Hello User</h1>
            <h3 className="text-gray-500 text-lg">Please enter your details</h3>
          </div>
          <div className="flex flex-col gap-y-2">
            <span>Email</span>
            <input
              className="border-2 p-2 w-full rounded-sm "
              type="text"
              id="name"
              name="name"
              placeholder="@hotmail.com"
              onChange={(e)=> {setMail(e.target.value)}}
            />

            <span>Password</span>
            <div className="relative flex items-center">
              <input
                className="border-2 p-2 w-full rounded-sm "
                type={eyeOpen ? "text" : "password"}
                id="password"
                name="password"
                onChange={(e)=> {setPassword(e.target.value)}}
              />
              <div onClick={() =>{setEyeopen(!eyeOpen)} } className="absolute h-5 w-5  right-3  top-1/2 transform -translate-y-1/2">
                {eyeOpen ? <FaEye  />:  <FaEyeSlash /> }
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end font-bold">
            Forgot password?
          </div>

          <button className="w-full bg-slate-400 p-2 rounded-md">
            Sign in
          </button>

          <div
            className="flex items-center justify-center
          "
          >
            <span className="font-normal">
              Don't have an account ?{" "}
              <span
                onClick={() => {
                  navigate("/signUp");
                }}
                className="font-bold hover:cursor-pointer text-gray-950"
              >
                Sign up for free
              </span>
              {/*   <Link to={"/signUp"}>Sign up for free</Link> */}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
