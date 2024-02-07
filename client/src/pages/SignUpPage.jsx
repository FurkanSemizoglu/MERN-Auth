import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../reducers/authSlice'; // Assuming authSlice file is in the same directory
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const{loading,error,  errorMessage,succes,currentUser, status} = useSelector((state) => state.auth);
  const handleSignUp = () => {
    // Dispatch registerUser action with email and password
    dispatch(registerUser({ email, password }));
  };
  const navigate = useNavigate();

  if(succes){
    navigate("/entrance")
  }
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-slate-400  ">
        <div className="flex flex-col gap-y-5  py-10  px-8 border rounded-md shadow-lg bg-white w-[400px] h-3/4">
          <div className="flex justify-center">
            <h1 className="text-4xl font-bold ">Register</h1>
          </div>
          <div className="flex flex-col gap-y-2">
            <span>Email</span>
            <input
              className="border-2 p-2 w-full rounded-sm"
              type="text"
              id="email"
              name="email"
              placeholder="@hotmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <span>Password</span>
            <input
              className="border-2 p-2 w-full rounded-sm"
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="w-full bg-slate-400 p-2 rounded-md" onClick={handleSignUp}>
            Sign up
          </button>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
