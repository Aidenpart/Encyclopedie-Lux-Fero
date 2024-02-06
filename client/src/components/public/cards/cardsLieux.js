import "./cardsStyles.scss";
import { URL } from "../../../helpers/urlHelpers";


export const CardsLieux = (props) => {

    return (
        <>
            {props.lieux.map((lieu, i) => {
                return (
                    <article key={i} className="card">
                        <h1>{lieu.nom}</h1>
                        <p>Appartenance : {lieu.appartenance}</p>
                        <p>Emplacement : {lieu.emplacement}</p>
                        <p>Description : {lieu.description}</p>
                        <p>Population : {lieu.population}</p>
                        <section className="section-image">
                            <img className="image" alt={lieu.nom} src={`${URL}/${lieu.images}`}/>
                        </section>
                    </article>
                );
            })}
        </>  
    );
};