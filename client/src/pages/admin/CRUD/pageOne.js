import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";

import { Loading } from "../../../components/public/loading/loading.js";
import { Header } from "../../../components/public/header/header.js";
import { DeleteOne } from "../../../components/admin/CRUDGeneral/deleteOne.js";
import { updateData } from "../../../helpers/dataHelpers.js";
import { GenericLinkDynamicData } from "../../../components/public/links/links.js";
import { Footer } from "../../../components/public/footer/footer.js";
import { CardsLieux, CardsPersonnages } from "../../../components/public/cards/cardsEncyclopedie.js";
import { readData } from "../../../helpers/dataHelpers.js";
import { CreateOrModifyForm } from "../../../components/admin/CRUDGeneral/createOrModifyOne.js";
import "../stylesAdmin.scss"


export const PageOne = () =>{
    const { id } = useParams();
    const location = useLocation(); 
    const state = location.state;
    const specData = state.dataCategory;
    const [card, setCard] = useState(false)
    const [data, setData] = useState("");
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        if(!dataLoaded) {
            readData(specData, id)
            .then((response) => {
                setData(response);
                setDataLoaded(true);
                specData === "personnages" ? setCard(true): setCard(false)
            })
            .catch((err) => {
                console.log(err);
            });
        }
    }, [data, id, specData, card, dataLoaded]);

    useEffect(() => {
        document.title = `${data.nom}`;
    })

    if(!dataLoaded)
        return <Loading />;
 
    return (
        <section>  
            <Header text={data.nom} />
            <GenericLinkDynamicData 
                direction={"/admin/CRUD"} 
                class={"CRUD-link"} 
                text={`CRUD`}
                setters={{
                    dataCategory:specData,
                    isCreation:true,
                    isPersonnage:specData
            }}/>
            <main className="main-admin">
                <CreateOrModifyForm 
                    initialValues={data} 
                    onSubmit={updateData} 
                    isCreation={false}
                    isPersonnage={card} 
                    id={id}
                />
                {card && <CardsPersonnages personnages={[data]} />}
                {!card && <CardsLieux lieux={[data]} />}
                <DeleteOne text={"lieu"} specData={specData}/>
            </main>
            <Footer/>
        </section>
    );
};