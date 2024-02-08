import { useState, useEffect } from "react";

import { Loading } from "../loading/loading";
import { URL } from "../../../helpers/urlHelpers";
import { RomanNumber, getNomRoman } from "./componentsCard";
import "./cardsStyles.scss";
import { fetchData } from "../../../helpers/dataHelpers";





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
                            <div className="white-margin">
                                <div className="recto" style={{ backgroundImage: `url(${URL}/${lieu.image})`, backgroundPosition: 'center', backgroundSize: 'contain' }}>
                                    <p>Greetings from {lieu.name}</p>
                                </div>
                            </div>
                            <div className="verso">
                                <div className="description">{lieu.description}</div>
                                <div className="coordonnees">
                                    <p>{lieu.nom}</p>
                                    <p>{nomRoman}</p>
                                    <p>{lieu.appartenance}</p>
                                    <p>{lieu.emplacement}</p>
                                    <p>{lieu.population}</p>
                                </div>
                            </div>
                        </div>
                    </article>
                );
            })}
        </>  
    );
};