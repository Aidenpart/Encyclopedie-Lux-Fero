import { URL } from "./urlHelpers";

export const getToken = () => {
    const token = localStorage.getItem("jwt")
    if(token){
        return token;
    } else {
        return "";
    }
};


export const getUserbyToken = async () => {
    
    const token = getToken();

    const user = await fetch(`${URL}/auth/user`, {
        method: 'GET',
        headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(user => {
        
        return user;
    });
    
    return user;
};