import { useState, useEffect } from "react";

import { Loading } from "../loading/loading";
import { RomanNumber, getNomRoman } from "./componentsCard";
import { listeDomaines } from "../../../helpers/categories";
import { fetchData } from "../../../helpers/dataHelpers";
import { URL } from "../../../helpers/urlHelpers";
import "./cardsStyles.scss";


export const CardComponent = (props) => {
    const time = 500;
    const [dataLoaded, setDataLoaded] = useState(false);
    const [romans, setRomans] = useState([]);
    const [isData, setIsData] = useState(false);
    const [isCategoryPersonnage, setIsCategoryPersonnage] = useState(false);
    const [isCategoryFiche, setIsCategoryFiche] = useState(false);

    useEffect(() => {
        if(!dataLoaded) {
            fetchData("romans")
            .then((data) => {
                setRomans(data);
                setDataLoaded(true);
                switch (props.type) {
                    case "personnages":
                        setIsData(true)
                        setIsCategoryPersonnage(true)
                        break;
                    case "lieux":
                        setIsData(true)
                        setIsCategoryPersonnage(false)
                        break;
                    case "fiches":
                        setIsData(false)
                        setIsCategoryFiche(true)
                        break;
                    case "romans":
                        setIsData(false)
                        setIsCategoryFiche(false)
                        break;                                           
                    default:
                        setIsData(false)
                        break;
                }
            })
            .catch((err) => {
                console.log(err);
            });
        }
    }, [dataLoaded, setDataLoaded, props.type]);

    if (!dataLoaded)
        return <Loading />; 

    return (
        <>
            {props.datas.map((data, i) => {
                const nomRoman = getNomRoman(romans, data.roman)

                return isData ?
                    isCategoryPersonnage ?
                        <CardsPersonnages personnage={data} delay={time*i} roman={nomRoman} number={i} />
                        : <CardsLieux lieu={data} delay={time * i} roman={nomRoman} />
                    : isCategoryFiche ?
                        <CardsFiche fiche={data} roman={nomRoman} />
                        : <CardsRoman roman={data} />
            })}
        </>
    )
}


const CardsPersonnages = (props) => {
    const [mounted, setMounted] = useState(false)
    const personnage = props.personnage;
    const number = props.number
    const roman = props.roman

    useEffect(() => {
        setTimeout(() => setMounted(true), props.time)
    })

    return (
        mounted && (
            <article key={number} className="carte">
                <div className="interieur">
                    <div className="recto" style={{ backgroundImage: `url(${URL}/${personnage.image})`, backgroundPosition: 'center', backgroundSize: 'contain' }}>
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
    )
};


const CardsLieux = (props) => {
    const [mounted, setMounted] = useState(false);
    const lieu = props.lieu;
    const roman = props.roman;

    useEffect(() => {
        setTimeout(() => setMounted(true), props.delay)
    }, [props.delay])

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
                            <p>Nom du lieu : {lieu.nom}</p>
                            <p>Roman : {roman}</p>
                            <p>Appartenance : {lieu.appartenance}</p>
                            <p>Emplacement : {lieu.emplacement}</p>
                            <p>Population : {lieu.population}</p>
                        </div>
                    </div>
                </div>
            </article>
        )
    );
};


const CardsFiche = (props) => {
    const fiche = props.fiche;
    const [couleurFiche, setCouleurFiche] = useState("")

    useEffect(() => {
        listeDomaines.forEach((domaine) => {
            if(fiche.domaine === domaine.domaine)
                setCouleurFiche(domaine.couleur)
        })
    }, [fiche.domaine, couleurFiche])

    return (
        <>
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
        </>
    )
}

const CardsRoman = (props) => {
    const roman = props.roman;

    return (
        <>
            <article >
                <h1>{roman.nom}</h1>
                <div></div>
            </article>
        </>
    )
}