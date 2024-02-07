import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    id : "",
    nom : "",
    nombreDePages : "",
    nombreDeSEC : "",
    nombreDeParties : "",
    nombreDeChapitres: "",
    isFini:false
};

export const romanSlice = createSlice({
    
    name: "romanSlice",
    
    initialState,
    
    reducers: {
        
        addRoman: (state, action) => {
            return {
                ...state,
                id : action.payload._id,
                nom : action.payload.nom,
                nombreDePages : action.payload.nombreDePages,
                nombreDeSEC : action.payload.nombreDeSEC,
                nombreDeParties : action.payload.nombreDeParties,
                nombreDeChapitres: action.payload.nombreDeChapitres,
                isFini: action.payload.isFini               
            };
        },
        
        deleteRoman:(state, action) => {
            return {
                ...initialState
            };
        }
        
    }
    
});

export const {addRoman, deleteRoman} = romanSlice.actions;

export default romanSlice.reducer;