import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { GetOne } from "../../../components/admin/CRUDGeneral/getOne.js"
import { GenericLink } from "../../../components/public/links/links.js"
import { CreateOrModifyForm } from "../../../components/admin/CRUDGeneral/createOrModifyOne.js"
import { Header } from "../../../components/public/header/header.js";
import { createData } from "../../../helpers/dataHelpers.js"


export const PageCRUD = () => {
    const location = useLocation(); 
    const state = location.state;
    console.log(state)
    const [isCategoryPersonnage, setIsCategoryPersonnage] = useState()

    useEffect(() => {
        state.dataCategory==="personnages"?setIsCategoryPersonnage(true):setIsCategoryPersonnage(false);
        document.title = `CRUD ${state.dataCategory}`;
        console.log(isCategoryPersonnage)
    }, [state.dataCategory, isCategoryPersonnage])

    return (
        <>  
            <Header text={state.dataCategory} />
            <GenericLink direction={"/admin"} class={"general-link"} text={"Page Admin"}/>
            <CreateOrModifyForm 
                initialValues={""} 
                onSubmit={createData} 
                isCreation={state.isCreation} 
                isPersonnage={isCategoryPersonnage}
            />
            <GetOne dataCategory={state.dataCategory} />
        </>
    )
}