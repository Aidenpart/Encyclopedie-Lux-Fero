import { CreateLieu } from "../../../components/admin/CRUDLieux/createLieu.js"
import { GetOne } from "../../../components/admin/CRUDGeneral/getOne.js"


export const PageCRUDLieux = () => {


    return (
        <>
            <CreateLieu />
            <GetOne dataSetter="lieux" textSetter="lieu"/>
        </>
    )
}