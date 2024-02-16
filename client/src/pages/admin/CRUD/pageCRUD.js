import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { GetOne } from "../../../components/admin/CRUDGeneral/getOne.js"
import { GenericLink } from "../../../components/public/links/links.js"
import { CreateOrModifyForm } from "../../../components/admin/CRUDGeneral/createOrModifyOne.js"
import { Header } from "../../../components/public/header/header.js";
import { Footer } from "../../../components/public/footer/footer.js";
import { createData } from "../../../helpers/dataHelpers.js"
import "../stylesAdmin.scss"


export const PageCRUD = () => {
    const location = useLocation(); 
    const state = location.state;
    const specData = state.dataCategory;
    const [isCategoryPersonnage, setIsCategoryPersonnage] = useState();

    useEffect(() => {
        specData==="personnages"?setIsCategoryPersonnage(true):setIsCategoryPersonnage(false);
        document.title = `CRUD ${specData}`;
    }, [specData, isCategoryPersonnage]);

    return (
        <section>  
            <Header text={specData} />
            <GenericLink direction={"/admin"} class={"general-link"} text={"Page Admin"}/>
            <main className="main-admin">
                <CreateOrModifyForm 
                    initialValues={""} 
                    onSubmit={createData} 
                    isCreation={state.isCreation} 
                    isPersonnage={isCategoryPersonnage}
                    dataCategory={specData}
                />
                <GetOne dataCategory={specData} />
            </main>
            <Footer />
        </section>
    );
};