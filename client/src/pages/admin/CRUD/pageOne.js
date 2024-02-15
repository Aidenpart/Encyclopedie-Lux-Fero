import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Loading } from "../../../components/public/loading/loading.js";
import { Header } from "../../../components/public/header/header.js";
import { DeleteOne } from "../../../components/admin/CRUDGeneral/deleteOne.js";
import { updateData } from "../../../helpers/dataHelpers.js";
import { GenericLinkDynamicData } from "../../../components/public/links/links.js";
import { Footer } from "../../../components/public/footer/footer.js";
import { CardsLieux, CardsPersonnages } from "../../../components/public/cards/cardsEncyclopedie.js";
import { readData } from "../../../helpers/dataHelpers.js";
import { CreateOrModifyForm } from "../../../components/admin/CRUDGeneral/createOrModifyOne.js";


export const PageOne = () =>{
    const { params, id } = useParams();
    const [specData, setSpecData] = useState("")
    const [card, setCard] = useState("")
    const [data, setData] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);

    console.log(params)

    useEffect(() => {
        setSpecData(params)
    }, [setSpecData, params])

    useEffect(() => {
        readData(specData, id)
        .then((response) => {
            setData(response);
            setDataLoaded(true);
            params === "personnages" ? setCard(true): setCard(false)
        })
        .catch((err) => {
            console.log(err);
        });
        console.log(data)
        document.title = `${data.nom}`;
    }, [data.nom, id, params, specData]);

    if(!dataLoaded)
        return <Loading />;
 
    return (
        <section className="CRUD-One">  
            <main>
                <Header text={data.nom} />
                <GenericLinkDynamicData 
                                    direction={"/admin/CRUD"} 
                                    class={"CRUD-link"} 
                                    text={`CRUD ${params}`}
                                    setters={{
                                        isCategoryPersonnage:params,
                                        isCreation:true,
                                        isPersonnage:params
                                }}/>
                <CreateOrModifyForm 
                    initialValues={data} 
                    onSubmit={updateData} 
                    isCreation={false}
                    isPersonnage={false} 
                    id={id}
                />
                
                <DeleteOne text={"lieu"} direction={"Lieux"}/>
            </main>
            <Footer/>
        </section>
    );
};