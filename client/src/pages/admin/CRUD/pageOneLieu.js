import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Loading } from "../../../components/public/loading/loading.js";
import { Header } from "../../../components/public/header/header.js";
import { DeleteOne } from "../../../components/admin/CRUDGeneral/deleteOne.js";
import { updateData } from "../../../helpers/dataHelpers.js";
import { GenericLink } from "../../../components/public/links/links.js";
import { Footer } from "../../../components/public/footer/footer.js";
import { CardsLieux } from "../../../components/public/cards/cardsEncyclopedie.js";
import { readData } from "../../../helpers/dataHelpers.js";
import { CreateOrModifyForm } from "../../../components/admin/CRUDGeneral/componentsCRUD.js";


export const PageOneLieu = () =>{
    const { id } = useParams(); 
    const [lieu, setLieu] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        readData("lieu", id)
        .then((data) => {
            setLieu(data);
            setDataLoaded(true);
        })
        .catch((err) => {
            console.log(err);
        });
        
        document.title = `${lieu.nom}`;
    }, [lieu.nom, id]);

    if(!dataLoaded)
        return <Loading />;
 
    return (
        <section className="CRUD-One">  
            <main>
                <Header text={lieu.nom} />
                <GenericLink direction={"/admin/CRUD-Lieux"} class={"link"} text={"CRUD Lieux"}/>
                <CardsLieux lieux={[lieu]}/>
                <CreateOrModifyForm 
                    initialValues={lieu} 
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