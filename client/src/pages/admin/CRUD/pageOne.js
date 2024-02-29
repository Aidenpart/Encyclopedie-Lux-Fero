import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";

import { NavBar } from "../../../components/public/navBar/navBar.js";
import { Loading } from "../../../components/public/loading/loading.js";
import { Header } from "../../../components/public/header/header.js";
import { DeleteOne } from "../../../components/admin/CRUDGeneral/deleteOne.js";
import { updateData } from "../../../helpers/dataHelpers.js";
import { GenericLinkDynamicData } from "../../../components/public/links/links.js";
import { Footer } from "../../../components/public/footer/footer.js";
import { CardComponent } from "../../../components/public/cards/newCardsEncyclopedie.js";
import { readData } from "../../../helpers/dataHelpers.js";
import { CreateOrModifyDataForm } from "../../../components/admin/CRUDGeneral/createOrModifyOne.js";
import "../stylesAdmin.scss"


export const PageOne = () =>{
    const { id } = useParams();
    const location = useLocation(); 
    const state = location.state;
    const specData = state.dataCategory;
    const [data, setData] = useState("");
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        if(!dataLoaded) {
            readData(specData, id)
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
        document.title = `${data.nom}`;
    })

    if(!dataLoaded)
        return <Loading />;
 
    return (
        <section>
            <NavBar />  
            <main className="main-admin">
                <Header text={data.nom} />
                <CreateOrModifyDataForm 
                    initialValues={data} 
                    onSubmit={updateData} 
                    isCreation={false}
                    isPersonnage={specData === "personnages"? true : false} 
                    dataCategory={specData}
                    id={id}
                />
                <CardComponent datas={[data]} type={specData}/> 
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