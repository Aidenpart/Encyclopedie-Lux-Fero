import { CreatePersonnage } from "../../../components/admin/CRUDPersonnages/createPersonnage.js"
import { GetOne } from "../../../components/admin/CRUDGeneral/getOne.js"
import { GenericLink } from "../../../components/public/links/links.js"


export const PageCRUDPersonnages = () => {


    return (
        <>
            <GenericLink direction={"/admin"} class={"general-link"} text={"Page Admin"}/>
            <CreatePersonnage />
            <GetOne dataSetter="personnages" textSetter="personnage"/>
        </>
    )
}