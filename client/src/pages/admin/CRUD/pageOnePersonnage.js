import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


import { URL } from "../../../helpers/urlHelpers.js";
import { Loading } from "../../../components/shared/loading/loading.js";
import { Header } from "../../../components/shared/header/header.js";
import { CardsPersonnages } from "../../../components/shared/cards/cardsPersonnages.js";
import { UpdatePersonnage } from "../../../components/admin/CRUDPersonnages/updatePersonnage.js";
import { DeleteOne } from "../../../components/admin/CRUDGeneral/deleteOne.js";
import { GenericLink } from "../../../components/shared/links/navigationLinks.js";
import { NavBar } from "../../../components/shared/navBar/navBar.js";
import { Footer } from "../../../components/shared/footer/footer.js";
import "../../../components/admin/adminComponentsStyles.scss";


export const PageOnePersonnage = () =>{
 
    const { id } = useParams(); 
    const [personnage, setPersonnage] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        
        fetch(`${URL}/wiki/personnages/get-personnage/${id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((response) => response.json())
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
            <NavBar/>
            <main>
                <Header text={personnage.nom} />
                <GenericLink direction={"/admin/CRUD-Personnages"} class={"link"} text={"CRUD Personnages"}/>
                <UpdatePersonnage personnage={personnage} id={id}/>
                <DeleteOne text={"personnage"} direction={"Personnages"}/>
                <CardsPersonnages personnages={[personnage]}/>
            </main>
            <Footer/>
        </section>
    );
};