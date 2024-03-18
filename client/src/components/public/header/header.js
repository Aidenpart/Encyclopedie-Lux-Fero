import "./headerStyles.scss";


export const Header = (props) => {
   
    return (
        <h1 className="header">{props.text}</h1>
    );
};

export const HeaderEncyclopedie = (props) => {
    
    return (
        <article>
            <Header text={`Accueil ${props.roman}`} />
            <p>Il y a actuellement {props.lieux} lieux et {props.personnages} personnages dans cette Encyclopédie.</p>
        </article>
    );
};