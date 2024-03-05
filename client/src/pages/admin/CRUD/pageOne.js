import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";

import { NavBar } from "../../../components/public/navBar/navBar.js";
import { Loading } from "../../../components/public/loading/loading.js";
import { Header } from "../../../components/public/header/header.js";
import { DeleteOne } from "../../../components/admin/CRUDGeneral/deleteOne.js";
import { updateData } from "../../../helpers/dataHelpers.js";
import { GenericLinkDynamicData } from "../../../components/public/links/links.js";
import { Footer } from "../../../components/public/footer/footer.js";
import { CardResumeGeneric } from "../../../components/public/cards/newCardsEncyclopedie.js";
import { readOneData } from "../../../helpers/dataHelpers.js";
import { CreateOrModifyDataForm, CreateOrModifyTextForm } from "../../../components/admin/CRUDGeneral/createOrModifyOne.js";
import "../stylesAdmin.scss"


export const PageOne = () =>{
    const { id } = useParams();
    const location = useLocation(); 
    const state = location.state;
    const specData = state.dataCategory;
    const [data, setData] = useState("");
    const [dataLoaded, setDataLoaded] = useState(false);
    const [isData, setIsData] = useState(false);
    const [isCategoryPersonnage, setIsCategoryPersonnage] = useState(false);
    const [isCategoryFiche, setIsCategoryFiche] = useState(false);

    useEffect(() => {
        if(!dataLoaded) {
            readOneData(specData, id)
            .then((response) => {
                setData(response);
                setDataLoaded(true);
            })
            .catch((err) => {
                console.log(err);
            });
        }
    }, [data, id, specData, dataLoaded]);

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
        document.title = `${data.nom || data.titre}`;
    }, [setIsData, data.nom, specData, data.titre])

    if(!dataLoaded)
        return <Loading />;
 
    return (
        <section>
            <NavBar />  
            <main className="main-admin">
                <Header text={data.nom || data.titre} />
                {isData && 
                    <CreateOrModifyDataForm 
                        initialValues={data} 
                        onSubmit={updateData} 
                        isCreation={false} 
                        isPersonnage={isCategoryPersonnage}
                        dataCategory={specData}
                        id={id}
                />}
                {!isData && 
                    <CreateOrModifyTextForm 
                        initialValues={data} 
                        onSubmit={updateData} 
                        isCreation={false} 
                        isFiche={isCategoryFiche}
                        dataCategory={specData}
                        id={id}
                />}
                <CardResumeGeneric datas={data} type={specData}/> 
                <DeleteOne specData={specData}/>
                <GenericLinkDynamicData 
                    direction={"/admin/CRUD"} 
                    class={"CRUD-link"} 
                    text={`Retour au CRUD`}
                    setters={{
                        dataCategory:specData,
                        isCreation:true,
                        isPersonnage:specData
                }}/>
            </main>
            <Footer/>
        </section>
    );
};