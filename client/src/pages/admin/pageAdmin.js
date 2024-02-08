import { useState, useEffect } from "react";

import { URL } from "../../helpers/urlHelpers.js";
import { Loading } from "../../components/public/loading/loading.js";
import { getToken } from "../../helpers/authHelpers.js";
import { GenericLink } from "../../components/public/links/links.js";


export const PageAdmin = () => {
    const [token, setToken] = useState('');
    const [dataLoaded, setDataLoaded] = useState(false);
    const [romans, setRomans] = useState([])


    useEffect(() => {
        
        fetch(`${URL}/wiki/romans`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((response) => response.json())
        .then((data) => {
            setRomans(data);
            setDataLoaded(true);
            setToken(getToken());
        })
        .catch((err) => {
            console.log(err);
        });
        
        document.title = "Page Administrateur";

    }, [setToken, setDataLoaded]);

    if (!dataLoaded)
        return <Loading />;    

    console.log(romans)

    return (
        <>
            <p>avertissement : partie admin pas prévue mobile first</p>
            <p>Création Roman</p>
            <p>Création Personnage</p>
            <GenericLink direction={"/admin/CRUD-Lieux"} class={"general-link"} text={"CRUD Lieux"}/>
        </>
    )
}