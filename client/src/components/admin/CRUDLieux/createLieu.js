import { useState, useEffect } from "react";

import { Loading } from "../../../components/public/loading/loading.js";
import { Form } from "../CRUDGeneral/componentsCRUD.js";
import { createData } from "../../../helpers/dataHelpers.js";


export const CreateLieu = () =>{    
    const [dataLoaded, setDataLoaded] = useState(false);
    
    useEffect(() => {
        setDataLoaded(true);
    }, [setDataLoaded]);

    if (!dataLoaded)
        return <Loading />;    

    return (
        <>
            <Form initialValues={""} onSubmit={createData} isCreation={true} isPersonnage={false}/>
        </>
    );
};