import { useEffect } from "react";


import { GetOne } from "../../../components/admin/CRUDGeneral/getOne.js"
import { GenericLink } from "../../../components/public/links/links.js"
import { CreateOrModifyForm } from "../../../components/admin/CRUDGeneral/createOrModifyOne.js"
import { createData } from "../../../helpers/dataHelpers.js"


export const PageCRUDLieux = () => {

    useEffect(() => {
        document.title = "CRUD Lieux";
    })

    return (
        <>
            <GenericLink direction={"/admin"} class={"general-link"} text={"CRUD Lieux"}/>
            <CreateOrModifyForm 
                initialValues={""} 
                onSubmit={createData} 
                isCreation={true} 
                isPersonnage={false}
            />
            <GetOne dataSetter="lieux" textSetter="lieu"/>
        </>
    )
}