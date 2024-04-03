import "./headerStyles.scss";


export const Header = (props) => {
   
    return (
        <h1 className="header">{props.text}</h1>
    );
};