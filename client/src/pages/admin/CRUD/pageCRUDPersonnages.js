import { useEffect } from "react";


import { GetOne } from "../../../components/admin/CRUDGeneral/getOne.js"
import { GenericLink } from "../../../components/public/links/links.js"
import { CreateOrModifyForm } from "../../../components/admin/CRUDGeneral/createOrModifyOne.js"
import { createData } from "../../../helpers/dataHelpers.js"

export const PageCRUDPersonnages = () => {

    useEffect(() => {
        document.title = "CRUD Personnages";
    })

    return (
        <>
            <GenericLink direction={"/admin"} class={"general-link"} text={"Page Admin"}/>
            <CreateOrModifyForm 
                initialValues={""} 
                onSubmit={createData} 
                isCreation={true} 
                isPersonnage={true}
            />
            <GetOne dataSetter="personnages"/>
        </>
    )
}