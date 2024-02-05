import { useState } from "react";

function App() {
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
            <input className="border-2 p-2 w-full rounded-sm " type="text" id="name" name="name" placeholder="@hotmail.com" />

            <span>Password</span>
            <input className="border-2 p-2 w-full rounded-sm " type="password" id="password" name="password" />
          </div>
          <div className="flex items-center justify-end font-bold">Forgot password?</div>

          <button className="w-full bg-slate-400 p-2 rounded-md">Sign in</button>

          <div className="flex items-center justify-center
          ">
            <span className="font-normal">
              Don't have an account ? <span className="font-bold">Sign up for free</span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
