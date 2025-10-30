import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import { socket } from '../../utils/socket';

const backendPort = import.meta.env.VITE_BACKEND_PORT;
export const getInfo = createAsyncThunk(
    'auth/getInfo',
    async (_, thunkAPI) => {
        // const isAuth = Cookies.get('isAuth');

        // if (isAuth) {


            try {
                const response = await fetch(`${backendPort}/api/get-user`, {
                    method: "GET",
                    credentials: "include"
                });
                const result = await response.json();
                if (response.ok) {
                    return {
                        userId: result.userId,
                        userRole: result.userRole,
                        userInfo: result.userInfo,
                        isLoading: false
                    }
                }
                else {
                    // toast.error("Error! " + result.message);
                    return thunkAPI.rejectWithValue({
                        userId: null,
                        userRole: null,
                        userInfo: null,
                        isLoading: false
                    })
                }
            }
            catch (err) {
                toast.error("Error! " + err.message);
                return thunkAPI.rejectWithValue({
                    userId: null,
                    userRole: null,
                    isLoading: false
                })
            }
        // }
        // else {
        //     return thunkAPI.rejectWithValue({
        //         userId: null,
        //         userRole: null,
        //         isLoading: false
        //     })
        // }

    }
)
const authReducer = createSlice({
    name: "auth",
    initialState: {
        userId: null,
        userRole: null,
        userInfo: null,
        isLoading: false,

    },
    reducers: {
        login: (state, action) => {
            state.userId = action.payload.userId,
                state.userInfo = action.payload.userInfo,
                state.userRole = action.payload.userRole,
                state.isLoading = false
                // console.log(action.payload.userId,action.payload.userInfo,action.payload.userRole)
            socket.connect();
        },
        setState: (state, action) => {
            state.userId = action.payload.userId ?? state.userId,
                state.userInfo = action.payload.userInfo ?? state.userInfo,
                state.userRole = action.payload.userRole ?? state.userRole,
                state.isLoading = action.payload.isLoading
        }
        ,
        reset: (state) => {
            state.userId = null,
                state.userInfo = null,
                state.userRole = null,
                state.isLoading = false
            socket.disconnect();
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getInfo.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getInfo.fulfilled, (state, action) => {
                state.userId = action.payload.userId,
                    state.userInfo = action.payload.userInfo,
                    state.userRole = 'customer',
                    state.isLoading = false

                socket.connect();
            })
            .addCase(getInfo.rejected, (state) => {
                state.isLoading = false,
                    state.userInfo = null,
                    state.userId = null,
                    state.userRole = null
            })
    }
});
export const { setState, login, reset } = authReducer.actions;
export default authReducer.reducer;