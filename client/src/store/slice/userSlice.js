import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    id : "",
    email : "",
    pseudo : "",
    name : "",
    firstName : "",
    images : "",
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
                name : action.payload.name,
                firstName : action.payload.firstName,
                images : action.payload.images,
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