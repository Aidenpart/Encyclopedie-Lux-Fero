import { useState, useEffect } from "react";


import { Loading } from "../../../components/public/loading/loading.js";
import { getToken } from "../../../helpers/authHelpers.js";
import { LieuForm } from "./componentsCRUD.js";
import { createData } from "../../../helpers/dataHelpers.js";


export const CreateLieu = () =>{
    

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
            <LieuForm initialValues={""} onSubmit={createData} isCreation={true}/>
        </>
    );
};