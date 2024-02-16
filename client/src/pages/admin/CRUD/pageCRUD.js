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
    const [isCategoryPersonnage, setIsCategoryPersonnage] = useState();

    useEffect(() => {
        state.dataCategory==="personnages"?setIsCategoryPersonnage(true):setIsCategoryPersonnage(false);
        document.title = `CRUD ${state.dataCategory}`;
    }, [state.dataCategory, isCategoryPersonnage]);

    return (
        <section>  
            <Header text={state.dataCategory} />
            <GenericLink direction={"/admin"} class={"general-link"} text={"Page Admin"}/>
            <main className="main-admin">
                <CreateOrModifyForm 
                    initialValues={""} 
                    onSubmit={createData} 
                    isCreation={state.isCreation} 
                    isPersonnage={isCategoryPersonnage}
                />
                <GetOne dataCategory={state.dataCategory} />
            </main>
            <Footer />
        </section>
    );
};