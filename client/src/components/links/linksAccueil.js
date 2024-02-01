import "./linkStyles.scss"

export const LinkAccueil = (props) => {

    return (
        <a href={props.direction} className="lien-accueil">
            <img className="image" src={props.image} alt="image_lien"/>
            <div className="texte-lien-accueil">{props.texte}</div>
        </a>
    )
}
