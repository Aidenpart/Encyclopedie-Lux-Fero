import { URL } from "../../../helpers/urlHelpers";
import { RomanNumber } from "./componentsCard";
import "./cardsStyles.scss";


export const CardsPersonnages = (props) => {

    return (
        <>
            {props.personnages.map((personnage, i) => {
                return (
                    <article key={i} className="carte">
                        <div className="interieur">
                            <div className="recto" style={{ backgroundImage: `url(${URL}/${personnage.images})`, backgroundPosition: 'center', backgroundSize: 'contain' }}>
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

    return (
        <>
            {props.personnages.map((personnage, i) => {
                return (
                    <article key={i} className="carte">
                        <div className="interieur">
                            <div className="recto" style={{ backgroundImage: `url(${URL}/${personnage.images})`, backgroundPosition: 'center', backgroundSize: 'contain' }}>
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