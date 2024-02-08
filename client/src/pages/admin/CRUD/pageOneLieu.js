import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


import { URL } from "../../../helpers/urlHelpers.js";
import { Loading } from "../../../components/public/loading/loading.js";
import { Header } from "../../../components/public/header/header.js";
import { DeleteOne } from "../../../components/admin/CRUDGeneral/deleteOne.js";
import { UpdateLieu } from "../../../components/admin/CRUDLieux/updateLieu.js";
import { GenericLink } from "../../../components/public/links/links.js";
import { Footer } from "../../../components/public/footer/footer.js";
import { CardsLieux } from "../../../components/public/cards/cardsEncyclopedie.js";


export const PageOneLieu = () =>{
 
    const { id } = useParams(); 
    const [lieu, setLieu] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        
        fetch(`${URL}/wiki/lieux/get-lieu/${id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((response) => response.json())
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
                <UpdateLieu lieu={lieu}  id={id}/>
                <DeleteOne text={"lieu"} direction={"Lieux"}/>
            </main>
            <Footer/>
        </section>
    );
};