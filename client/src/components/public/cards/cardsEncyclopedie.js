import { useState, useEffect } from "react";

import { Loading } from "../loading/loading";
import { RomanNumber, getNomRoman, adaptivePronoun } from "./componentsCard";
import { fetchData } from "../../../helpers/dataHelpers";
import { URL } from "../../../helpers/urlHelpers";
import "./cardsStyles.scss";


export const CardsPersonnages = (props) => {

    return (
        <>
            {props.personnages.map((personnage, i) => {
                return (
                    <article key={i} className="carte">
                        <div className="interieur">
                            <div className="recto" style={{ backgroundImage: `url(${URL}/${personnage.image})`, backgroundPosition: 'center', backgroundSize: 'contain' }}>
                                <div className="top">
                                    <RomanNumber i={i}/><p>{personnage.nom}</p><RomanNumber i={i}/>
                                </div>
                                <div className="bottom">
                                    <RomanNumber i={i}/><p>{personnage.appartenance}</p><RomanNumber i={i}/>
                                </div>
                            </div>
                            <div className="verso">
                                <h1>{personnage.nom}</h1>
                                <p>Groupe d'appartenance : {personnage.appartenance}</p>
                                <p>Titre(s) : {personnage.titre}</p>
                                <p>{personnage.description}</p>
                            </div>
                        </div>
                    </article>
                );
            })}
        </>  
    );
};


export const CardsLieux = (props) => {
    const [dataLoaded, setDataLoaded] = useState(false);
    const [romans, setRomans] = useState([])
    const spec = "romans"

    useEffect(() => {
        if(!dataLoaded) {
            fetchData(spec)
            .then((data) => {
                setRomans(data);
                setDataLoaded(true);
            })
            .catch((err) => {
                console.log(err);
            });
        }
    }, [dataLoaded, setDataLoaded]);

    if (!dataLoaded)
        return <Loading />;    

    return (
        <>
            {props.lieux.map((lieu, i) => {
                const nomRoman = getNomRoman(romans, lieu.roman)

                return (
                    <article key={i} className="post-card">
                        <div className="interieur">
                            <div className="recto">
                                <div className="image-BG" style={{ 
                                    backgroundImage: `url(${URL}/${lieu.image})`, 
                                    backgroundPosition: 'center', 
                                    backgroundSize: 'cover', 
                                    position: 'relative' }}>
                                        <div className="text">
                                            <p className="greetings">Greetings from</p>
                                            <p className="nom-lieu">{lieu.nom}</p>
                                        </div>
                                </div>
                            </div>
                            <div className="verso">
                                <div className="description">
                                    <p>Venant du roman {nomRoman}, {lieu.nom} se trouve {adaptivePronoun(lieu.emplacement)} et abrîte {lieu.population} âmes.</p>
                                    <p>Il contient notamment : <br />{lieu.description}</p>
                                </div>
                                <div className="separateur"></div>
                                <div className="coordonnees">
                                    <p>Nom du lieu : {lieu.nom}</p>
                                    <p>Roman : {nomRoman}</p>
                                    <p>Appartenance : {lieu.appartenance}</p>
                                    <p>Emplacement : {lieu.emplacement}</p>
                                    <p>Population : {lieu.population}</p>
                                </div>
                            </div>
                        </div>
                    </article>
                );
            })}
        </>  
    );
};