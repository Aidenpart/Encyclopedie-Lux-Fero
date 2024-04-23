import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    id : "",
    email : "",
    pseudo : "",
    image : "",
    isAdmin : false,
    isLogged: false
};

export const userSlice = createSlice({
    
    name: "userSlice",
    
    initialState,
    
    reducers: {
        addUser: (state, action) => {
            return {
                ...state,
                id: action.payload._id,
                email: action.payload.email,
                pseudo : action.payload.pseudo,
                image: action.payload.image,
                isAdmin: action.payload.isAdmin,
                isLogged: true
            };
        },
        
        deleteUser:(state, action) => {
            return {
                ...initialState
            };
        }
    }
    
});

export const {addUser, deleteUser} = userSlice.actions;

export default userSlice.reducer;