import { useState, useEffect } from "react";

import { Loading } from "../../../components/public/loading/loading.js";
import { CreateOrModifyForm } from "../CRUDGeneral/componentsCRUD.js";
import { createData } from "../../../helpers/dataHelpers.js";


export const CreatePersonnage = () =>{
    const [dataLoaded, setDataLoaded] = useState(false);
    
    useEffect(() => {
        setDataLoaded(true);
    }, [setDataLoaded]);

    if (!dataLoaded)
        return <Loading />;    

    return (
        <>
            <CreateOrModifyForm 
                initialValues={""} 
                onSubmit={createData} 
                isCreation={true} 
                isPersonnage={true}
            />
        </>
    );
};