import { createSlice } from "@reduxjs/toolkit";

export const authReducer = createSlice({
    name:'auth',
    initialState:{
        successMessage :  '',
        errorMessage:'',
        loader:false,
        userInfo:'',
        role:'',
        token:''
    },
    reducers:{

    },
    extraReducers:()=>{
        
    }
})

export default authReducer.reducer;