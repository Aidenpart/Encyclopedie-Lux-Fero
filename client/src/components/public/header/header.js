import "./headerStyles.scss";


export const Header = (props) => {
   
    return (
        <h1 className="header">{props.text}</h1>
    );
};


export const HeaderRoman = (props) => {
   
    return (
        <article className="header-roman">
            <h1>{props.text}</h1>
            <h2>L'Encyclopédie</h2>
            <p>Ici, vous trouverez de nombreuses informations sur les lieux, héros et héorïnes, et des fiches détaillant certains points.
                <br />Faites attention, cependant. Parcourir ces contrées sans avoir lu le livre pourrait vous spoiler/divulgâcher.
                <br />Que vous avanciez en terrain connu, ou non, bonne lecture !
            </p>
        </article>
    );
};