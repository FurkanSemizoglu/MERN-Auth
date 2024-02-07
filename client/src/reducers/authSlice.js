import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios';


const initialState = {
    currentUser : null,
    loading : false,
    error : false,
    status : "idle",
    errorMessage : "",   
    succes : false 
}


/* export const registerUser = createAsyncThunk("register", async ({ email, password }) => {

    
  try {
    const data = { email, password };
    console.log("email" , data)
    const response = await axios.post("http://localhost:5000/api/register", data, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    console.log("response" , response.status)
    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }

    const result = response.data;
    console.log(result, "result");
    return result;
  } catch (error) {
    throw new Error("Registration failed: " + error.message);
  }
}); */


export const registerUser = createAsyncThunk("register", async ({ email, password }) => {
    try {
      const data = { email, password };
      console.log(data)
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      });
  
      console.log(response , "response")
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const result = await response.json();
      console.log(result, "result");
      return result;
    } catch (error) {
      throw new Error("Registration failed: " + error.message);
    }
  });
  


export const loginUser = createAsyncThunk("login" ,async({email , password}) => {
    try {
  //  const data = {email , password}

    const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, password: password }),
    };

    const response = await fetch("http://localhost:5000/api/login", requestOptions);
   /*  const response = await fetch("http://localhost:5000/api/login", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data)
    }) */

    if (!response.ok) {
        console.log("hata kısmıı")
        throw new Error("Network response was not ok");
    }

    const result = await response.json();
    console.log(result , "result")
    return result;
} catch (error) {
    throw new Error("Login failed: " + error.message);
  }
} )


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers : {},
    extraReducers(builder) {
        builder
        .addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.status = "loading";
            state.error = null;
          })
          .addCase(loginUser.fulfilled, (state, action) => {

             state.loading = false;
             state.status = "succeeded";
             state.succes = true; // registration successful
             state.currentUser = action.payload
     
             console.log("action" , action)
     
             console.log("action payload " , action.payload)
     
        //     state.userToken = action.payload.token;
           })
           .addCase(loginUser.rejected, (state, action) => {
             state.loading = false;
             state.status = "failed";
             state.succes = false;
             state.error = true,
             state.errorMessage = action.error.message;
           })
           .addCase(registerUser.pending, (state) => {
            state.loading = true;
            state.status = "loading";
            state.error = null;
          })
          .addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false;
            state.status = "succeeded";
            state.success = true; // registration successful
            state.currentUser = action.payload;
    
            console.log("action", action);
    
            console.log("action payload", action.payload);
    
            //     state.userToken = action.payload.token;
          })
          .addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            state.status = "failed";
            state.success = false;
            state.error = true;
            state.errorMessage = action.error.message;
          });
    }
})

const authReducer = authSlice.reducer;

export default authReducer;