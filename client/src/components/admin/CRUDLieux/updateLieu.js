import { useState, useEffect } from "react";

import { CreateOrModifyForm } from "../CRUDGeneral/componentsCRUD.js";
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
            <CreateOrModifyForm 
                initialValues={initialValues} 
                onSubmit={updateData} 
                isCreation={false}
                isPersonnage={false} 
                id={id}
            />
        </>
    );
};