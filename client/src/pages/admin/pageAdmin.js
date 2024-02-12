import { useState, useEffect } from "react";

import { Loading } from "../../components/public/loading/loading.js";
import { GenericLink } from "../../components/public/links/links.js";


export const PageAdmin = () => {
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {       
        setDataLoaded(true);
        document.title = "Page Administrateur";
    }, [setDataLoaded]);

    if (!dataLoaded)
        return <Loading />;    

    return (
        <>
            <p>avertissement : partie admin pas encore prévue mobile first</p>
            <p>Création Roman</p>
            <p>Création </p>
            <GenericLink direction={"/admin/CRUD-Personnages"} class={"general-link"} text={"CRUD Personnage"}/>
            <GenericLink direction={"/admin/CRUD-Lieux"} class={"general-link"} text={"CRUD Lieux"}/>
        </>
    )
}