import { useState, useEffect } from "react";

import { Loading } from "../loading/loading";
import { RomanNumber } from "./componentsCard";
import { listeDomaines } from "../../../helpers/categories";
import { filteredDataByRoman } from "../../../helpers/dataHelpers";
import { URL } from "../../../helpers/urlHelpers";
import "./cardsStyles.scss";


export const CardResumeGeneric = (props) => {
    const type = props.type;
    const data = props.datas;
    const [dataLoaded, setDataLoaded] = useState(false);
    const [dataRoman, setDataRoman] = useState();

    useEffect(() => {
        if(type === "romans") {
            filteredDataByRoman(data._id)
            .then((response) => {
                setDataRoman(response)
                setDataLoaded(true);
            })
            .catch((err) => {
                console.log(err);
            });        
        }else
            setDataLoaded(true)

    }, [dataLoaded, data._id, setDataRoman, type]);

    if(!dataLoaded)
        return <Loading />;

    return (
        <article className="card-generic">
            <div className="data-generic">
                {Object.keys(data).map((key) => (
                    <p key={key}><span className="key">{key.toLocaleUpperCase()}</span><span className="data">{data[key]}</span></p>
                ))}
            </div>
            {dataRoman &&
                <>
                    <h2>Les lieux</h2>
                    <ul>
                        {dataRoman.lieux.map((lieu) => {
                            return <li>{lieu.nom}</li>
                        })}
                    </ul>
                    <h2>Les personnages</h2>
                    <ul> 
                        {dataRoman.personnages.map((personnage) => {
                            return <li>{personnage.nom}</li>
                        })}
                    </ul>
                </> 
            }
        </article>
    );
};

export const CardsPersonnages = (props) => {
    const personnage = props.personnage;
    const number = props.number;
    const roman = props.roman;
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setTimeout(() => setMounted(true), props.delay)
    }, [props.delay]);

    return (
        mounted && (
            <article key={number} className="carte">
                <div className="interieur">
                    <div className="recto" style={{backgroundImage: `url(${URL}/${personnage.image})`}}>
                        <div className="top">
                            <RomanNumber i={number}/><p>{personnage.nom}</p><RomanNumber i={number}/>
                        </div>
                        <div className="bottom">
                            <RomanNumber i={number}/><p>{personnage.nature}</p><RomanNumber i={number}/>
                        </div>
                    </div>
                    <div className="verso">
                        <h1>{personnage.nom}</h1>
                        <p><span className="categorie">Roman :</span><span className="description">{roman}</span></p>
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
        )
    );
};

export const CardsLieux = (props) => {
    const lieu = props.lieu;
    const roman = props.roman;
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setTimeout(() => setMounted(true), props.delay)
    }, [props.delay]);

    return (
        mounted && (
            <article className="post-card">
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
                            <p>{lieu.description}</p>
                        </div>
                        <div className="separateur"></div>
                        <div className="coordonnees">
                            <p><span className="intitule">Nom du lieu :</span> {lieu.nom}</p>
                            <p><span className="intitule">Roman :</span> {roman}</p>
                            <p><span className="intitule">Appartenance :</span> {lieu.appartenance}</p>
                            <p><span className="intitule">Emplacement :</span> {lieu.emplacement}</p>
                            <p><span className="intitule">Population :</span> {lieu.population}</p>
                        </div>
                    </div>
                </div>
            </article>
        )
    );
};

export const CardsFiche = (props) => {
    const fiche = props.fiche;
    const [couleurFiche, setCouleurFiche] = useState("");

    useEffect(() => {
        listeDomaines.forEach((domaine) => {
            if(fiche.domaine === domaine.domaine)
                setCouleurFiche(domaine.couleur)
        });
    }, [fiche.domaine, couleurFiche]);

    return (
        <article className="fiche" style={{ 
            backgroundColor: `${couleurFiche}` }}>
            <div className="header">
                <h1>{fiche.domaine}</h1>
                <h6>{props.roman}</h6>
            </div>
            <div className="corps">
                <div>
                    <h2>{fiche.titre}</h2>
                    <p>{fiche.contenuPrincipal}</p>
                </div>
                <div>
                    <h3>{fiche.titreSecondaire}</h3>
                    <p>{fiche.contenuSecondaire}</p>
                </div>
                <div>
                    <h4>{fiche.remarque}</h4>
                    <p>{fiche.contenuRemarque}</p>
                </div>
            </div>
        </article>
    );
};

export const CardsRoman = (props) => {
    const roman = props.roman;
    const [dataLoaded, setDataLoaded] = useState(false);
    const [dataRoman, setDataRoman] = useState();

    useEffect(() => {
        filteredDataByRoman(roman._id)
        .then((response) => {
            setDataRoman(response);
            setDataLoaded(true);
        })
        .catch((err) => {
            console.log(err);
        });
    }, [dataLoaded, roman, setDataRoman]);

    if(!dataLoaded)
        return <Loading />;

    return (
        <article >
            <h1>{roman.nom}</h1>
            <h2>Les données</h2>
            <ul>
                {Object.keys(roman).map((key) => (
                    <li key={key}><span className="">{key} :</span> {roman[key]}</li>
                ))}
            </ul>
            <h2>Les lieux</h2>
            <ul>
                {dataRoman.lieux.map((lieu) => {
                    return <li>{lieu.nom}</li>
                })}
            </ul>
            <h2>Les données</h2>
            <ul>Les personnages
                {dataRoman.personnages.map((personnage) => {
                    return <li>{personnage.nom}</li>
                })}
            </ul>
        </article>
    );
};