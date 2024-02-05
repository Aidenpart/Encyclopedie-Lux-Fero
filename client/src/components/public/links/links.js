import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser } from "../../../store/slice/userSlice.js";
import "./navigationStyle.scss";
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

export const LinkPageAdmin = () => {
    
    return (
        <Link className={"link link-page-admin"} to={"/admin"}>Page Administrateur</Link>
    );
};

export const LinkConnexion = () => {
    
    return (
        <Link to={"/connexion"} className="link">Connexion</Link>
    );
};

export const LinkProfil = () => {
    
    return (
        <Link to={"/profil"} className="link">Profil</Link>
    );
};

export const LinkLogOut = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const handleLogOut = () => {
        localStorage.removeItem('jwt');
        dispatch(deleteUser());
        navigate("/");
    };
    
    return (
        <a className="link" href="/" onClick={handleLogOut}>Deconnexion</a>
    );
};

export const LinkLogOutBurger = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    
    
    const handleLogOut = () => {
        
        localStorage.removeItem('jwt')
        dispatch(deleteUser())
        navigate("/")

    }
    
    return (
        <a className="nav-link" href="/" onClick={handleLogOut}>Deconnexion</a>
    )
}

export const LinkConditionalNavigation = () => {
    const user = useSelector(state => state.user);

    return (
        <>
            {
                localStorage.getItem('jwt')
                    ? user.isAdmin
                        ? <LinkPageAdmin />
                        : <LinkProfil />
                    : <LinkConnexion />
            }
        </>
    );
};

export const LinkConditionalNavigationBurger = () => {
    const user = useSelector(state => state.user);

    return (
        <>
            {
                localStorage.getItem('jwt')
                    ? user.isAdmin
                        ? <GenericLink direction={"/admin"} class={"nav-link"} text={"Admin"}/>
                        : <GenericLink direction={"/profil"} class={"nav-link"} text={"Profil"}/>
                    : <GenericLink direction={"/connexion"} class={"nav-link"} text={"Connexion"}/>
            }
        </>
    )
}

export const GenericLinkDynamicData = (props) => {
    
    return (
        <Link to={props.direction} state={props.setters} className={props.class}>{props.text}</Link>
    );
};