import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


import { readData } from "../../../helpers/dataHelpers.js";
import { Loading } from "../../../components/public/loading/loading.js";
import { Header } from "../../../components/public/header/header.js";
import { DeleteOne } from "../../../components/admin/CRUDGeneral/deleteOne.js";
import { UpdatePersonnage } from "../../../components/admin/CRUDPersonnages/updatePersonnage.js";
import { GenericLink } from "../../../components/public/links/links.js";
import { Footer } from "../../../components/public/footer/footer.js";
import { CardsPersonnages } from "../../../components/public/cards/cardsEncyclopedie.js";


export const PageOnePersonnage = () =>{
 
    const { id } = useParams(); 
    const [personnage, setPersonnage] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        
        readData("personnage", id)
        .then((data) => {
            setPersonnage(data);
            setDataLoaded(true);
        })
        .catch((err) => {
            console.log(err);
        });
        
        document.title = `${personnage.nom}`;
        
    }, [personnage.nom, id]);
 
    if(!dataLoaded)
        return <Loading />;

    return (
        <section className="CRUD-One">  
            <main>
                <Header text={personnage.nom} />
                <GenericLink direction={"/admin/CRUD-Personnages"} class={"link"} text={"CRUD Personnages"}/>
                <CardsPersonnages personnages={[personnage]}/>
                <UpdatePersonnage personnage={personnage} id={id}/>
                <DeleteOne text={"personnage"} direction={"Personnages"}/>
            </main>
            <Footer/>
        </section>
    );
};