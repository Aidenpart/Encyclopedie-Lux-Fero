import "./headerStyles.scss";


export const Header = (props) => {
    
    return (
        <article className="header">
            <h1>{props.text}</h1>
        </article>    
    );
};