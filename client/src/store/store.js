import {configureStore} from '@reduxjs/toolkit';
import userReducer from "./slice/userSlice.js";
import romanReducer from "./slice/romanSlice.js"


export default configureStore({

    reducer: {
        user : userReducer,
        roman : romanReducer
    }
})