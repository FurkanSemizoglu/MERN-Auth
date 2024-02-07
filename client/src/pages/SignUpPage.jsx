import React from 'react'

const SignUpPage = () => {
  return (
   <>
    <div className="flex items-center justify-center min-h-screen bg-slate-400  ">
        <div className="flex flex-col gap-y-5  py-10  px-8 border rounded-md shadow-lg bg-white w-[400px] h-3/4"> 
          <div className='flex justify-center'>
            <h1 className="text-4xl font-bold ">Register</h1>
            
          </div>
          <div className="flex flex-col gap-y-2">
            <span>Email</span>
            <input className="border-2 p-2 w-full rounded-sm " type="text" id="name" name="name" placeholder="@hotmail.com" />

            <span>Password</span>
            <input className="border-2 p-2 w-full rounded-sm " type="password" id="password" name="password" />
          </div>
         

          <button className="w-full bg-slate-400 p-2 rounded-md">Sign up</button>

         
        </div>
      </div>
   </>
  )
}

export default SignUpPage