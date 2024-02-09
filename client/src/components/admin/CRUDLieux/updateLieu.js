import { useState, useEffect } from "react";

import { LieuForm } from "./componentsCRUD.js";
import { Loading } from "../../../components/public/loading/loading.js";
import { getToken } from "../../../helpers/authHelpers.js";
import { updateData } from "../../../helpers/dataHelpers.js";


export const UpdateLieu = (props) =>{

    const [initialValues, setInitialValue] = useState(props.lieu)
    const id = props.id;
    const [token, setToken] = useState('');
    const [dataLoaded, setDataLoaded] = useState(false);    

    useEffect(() => {      
        setToken(getToken());
        setDataLoaded(true);
    }, [setDataLoaded, setToken]);
    
    
    if (!dataLoaded)
        return <Loading />;   
    
    return (
        <>
            <LieuForm initialValues={initialValues} onSubmit={updateData} isCreation={false} id={id}/>
        </>
    );
};