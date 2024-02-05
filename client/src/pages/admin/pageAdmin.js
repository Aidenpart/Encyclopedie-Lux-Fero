import { useState, useEffect } from "react";

import { URL } from "../../helpers/urlHelpers.js";
import { Loading } from "../../components/public/loading/loading.js";
import { getToken } from "../../helpers/authHelpers.js";
import { GenericLink } from "../../components/public/links/links.js";


export const PageAdmin = () => {
    const [token, setToken] = useState('');
    const [dataLoaded, setDataLoaded] = useState(false);


    useEffect(() => {
        setToken(getToken());
        setDataLoaded(true);
    }, [setToken, setDataLoaded]);



    if (!dataLoaded)
        return <Loading />;    

    console.log("probleme")


    return (
        <>
            <p>avertissement : partie admin pas prévue mobile first</p>
            <p>Création Roman</p>
            <p>Création Personnage</p>
            <GenericLink direction={"/admin/CRUD-Lieux"} class={"general-link"} text={"CRUD Lieux"}/>
        </>
    )
}