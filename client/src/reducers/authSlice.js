import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


const intialState = {
    currentUser : null,
    loading : false,
    error : false,
    status : "idle",
    succes : false 
}



const loginUser = createAsyncThunk("login" ,async({email , password}) => {

    const data = {email , password}
    const response = await fetch("http://localhost:5000/api/login", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data)
    })

    const result = await response.json();
} )


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers : {},
    extraReducers(builder) {
        builder
        .addCase(login.pending, (state) => {
            state.loading = true;
            state.status = "loading";
            state.error = null;
          })
          .addCase(login.fulfilled, (state, action) => {

             state.loading = false;
             state.status = "succeeded";
             state.success = true; // registration successful
             state.currentUser = action.payload
     
             console.log("action" , action)
     
             console.log("action payload " , action.payload)
     
        //     state.userToken = action.payload.token;
           })
           .addCase(login.rejected, (state, action) => {
             state.loading = false;
             state.status = "failed";
             state.succes = false;
             state.error = action.error.message;
           })
    }
})