import { useState, useEffect } from "react";

import { LieuForm } from "./componentsCRUD.js";
import { Loading } from "../../../components/public/loading/loading.js";
import { updateData } from "../../../helpers/dataHelpers.js";


export const UpdateLieu = (props) =>{
    const id = props.id;
    const initialValues = props.lieu;
    const [dataLoaded, setDataLoaded] = useState(false);    

    useEffect(() => {   
        setDataLoaded(true);
    }, [setDataLoaded]);
    
    if (!dataLoaded)
        return <Loading />;   
    
    return (
        <>
            <LieuForm 
                initialValues={initialValues} 
                onSubmit={updateData} 
                isCreation={false} 
                id={id}
            />
        </>
    );
};