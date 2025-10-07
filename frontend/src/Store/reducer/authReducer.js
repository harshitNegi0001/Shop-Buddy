import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getInfo = createAsyncThunk(
    'auth/getInfo',
    async (_, thunkAPI) => {

        const response = await fetch(process.env.BACKEND_PORT+'api/get-user')
    }
)
const authReducer = createSlice({
    name: "auth",
    initialState: {
        userId: null,
        userInfo: null,
        isLoading: false,

    },
    reducer: {

        reset: (state) => {
            state.userId = null,
                state.userInfo = null,
                state.isLoading = false
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
                    state.isLoading = false
            })
            .addCase(getInfo.rejected, (state) => {
                state.isLoading = false,
                    state.userInfo = null,
                    state.userId = null
            })
    }
});

export default authReducer.reducer;