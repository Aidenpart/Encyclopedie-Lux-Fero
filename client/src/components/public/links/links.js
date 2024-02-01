import { Link } from "react-router-dom"
import "./linkStyles.scss"

export const LinkAccueil = (props) => {

    return (
        <a href={props.direction} className="lien-accueil">
            <img className="image" src={props.image} alt="image_lien"/>
            <div className="texte-lien-accueil">{props.texte}</div>
        </a>
    )
}

export const GenericLink = (props) => {
    
    return (
        <Link to={props.direction} className={props.class}>{props.text}</Link>
    );
};