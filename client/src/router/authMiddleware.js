import {Navigate} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react";

import { getUserbyToken } from "../helpers/authHelpers.js";
import { addUser } from "../store/slice/userSlice.js";


export const AuthMiddleware = (props) => {

    if (!sessionStorage.getItem("jwt")) {
        return (
            <Navigate to={"/"}/>
        );
    };
    
    return (
        <>
            {props.children}
        </>
    );
};


export const AdminMiddleware = (props) => {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        if (sessionStorage.getItem('jwt') && !user.isLogged) {
            const userTokenPromise = getUserbyToken();
            userTokenPromise
            .then(data => {
                dispatch(addUser(data));
            })
            .catch(err => {
                console.log(err);
            });
        };
    });
    
    if (!sessionStorage.getItem('jwt') || !user.isAdmin) {
        return (
            <Navigate to={"/"}/>
        );
    };
    
    return (
        <>
            {props.children}
        </>
    );
};