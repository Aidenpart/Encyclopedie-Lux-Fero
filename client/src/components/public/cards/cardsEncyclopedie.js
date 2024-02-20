import { useState, useEffect } from "react";

import { Loading } from "../loading/loading";
import { RomanNumber, getNomRoman, adaptivePronoun } from "./componentsCard";
import { fetchData } from "../../../helpers/dataHelpers";
import { URL } from "../../../helpers/urlHelpers";
import "./cardsStyles.scss";


export const CardsPersonnages = (props) => {
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

console.log(romans)

    if (!dataLoaded)
        return <Loading />; 

    return (
        <>
            {props.personnages.map((personnage, i) => {
                const nomRoman = getNomRoman(romans, personnage.roman)
                console.log(personnage)

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
                                <p><span className="categorie">Roman :</span><span className="description">{nomRoman}</span></p>
                                <p><span className="categorie">Appartenance :</span><span className="description">{personnage.appartenance}</span></p>
                                <p><span className="categorie">Nature :</span><span className="description">{personnage.nature}</span></p>
                                <p><span className="categorie">Demeure :</span><span className="description">{personnage.demeure}</span></p>
                                <div><span className="categorie">Titre Principal :</span><span className="description">{personnage.titrePrincipal}</span></div>
                                <div><span className="categorie">Titres Secondaires :</span><span className="description">{personnage.titresSecondaires}</span></div>
                                <p><span className="categorie">Sexe :</span><span className="description">{personnage.sexe}</span></p>
                                <p><span className="categorie">Attirance :</span><span className="description">{personnage.attirance}</span></p>
                                <p><span className="categorie">Spécialité :</span><span className="description">{personnage.specialite}</span></p>
                                <p><span className="categorie">Sous-Spécialité :</span><span className="description">{personnage.sousSpecialite}</span></p>
                                <div><span className="categorie">Description :</span><span className="description">{personnage.description}</span></div>
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
                                    <p>Venant du roman {nomRoman}, {lieu.nom} se trouve {adaptivePronoun(lieu.emplacement)}.</p>
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