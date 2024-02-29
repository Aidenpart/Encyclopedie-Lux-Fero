import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { NavBar } from "../../../components/public/navBar/navBar.js";
import { GetOne } from "../../../components/admin/CRUDGeneral/getOne.js"
import { CreateOrModifyTextForm } from "../../../components/admin/CRUDText/createOrModifyText.js";
import { CreateOrModifyDataForm } from "../../../components/admin/CRUDGeneral/createOrModifyOne.js"
import { Header } from "../../../components/public/header/header.js";
import { Footer } from "../../../components/public/footer/footer.js";
import { createData } from "../../../helpers/dataHelpers.js"
import "../stylesAdmin.scss"


export const PageCRUD = () => {
    const location = useLocation(); 
    const state = location.state;
    const specData = state.dataCategory;
    const [isData, setIsData] = useState(false);
    const [isCategoryPersonnage, setIsCategoryPersonnage] = useState(false);
    const [isCategoryFiche, setIsCategoryFiche] = useState(false);

    useEffect(() => {
        switch (specData) {
            case "personnages":
                setIsData(true)
                setIsCategoryPersonnage(true)
                break;
            case "lieux":
                setIsData(true)
                setIsCategoryPersonnage(false)
                break;
            case "fiches":
                setIsData(false)
                setIsCategoryFiche(true)
                break;
            case "romans":
                setIsData(false)
                setIsCategoryFiche(false)
                break;                                           
            default:
                setIsData(false)
                break;
        }
        document.title = `CRUD ${specData}`;
    }, [specData, isCategoryPersonnage]);

    return (
        <section>
            <NavBar />  
            <main className="main-admin">
                <Header text={specData} />
                {isData && 
                    <CreateOrModifyDataForm 
                        initialValues={""} 
                        onSubmit={createData} 
                        isCreation={state.isCreation} 
                        isPersonnage={isCategoryPersonnage}
                        dataCategory={specData}
                />}
                {!isData && 
                    <CreateOrModifyTextForm 
                        initialValues={""} 
                        onSubmit={createData} 
                        isCreation={state.isCreation} 
                        isFiche={isCategoryFiche}
                        dataCategory={specData}
                />}
                <GetOne dataCategory={specData} />
            </main>
            <Footer />
        </section>
    );
};