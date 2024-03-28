import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser } from "../../../store/slice/userSlice.js";
import "./navigationStyle.scss";
import "./linkStyles.scss"


export const LinkAccueil = (props) => {
    const roman = `${props.roman}`;

    return (
        <Link to={`/accueil-${roman.replace(/\s/, "-")}`} className="lien-accueil" state={{roman:roman}}>
            <img className="image" src={`/images/link_${roman.replace(/\s/, "-")}.jpg`} alt="image_lien"/>
            <div className="texte-lien-accueil">{roman}</div>
        </Link>
    )
}

export const GenericLink = (props) => {
    
    return (
        <Link to={props.direction} className={props.class}>{props.text}</Link>
    );
};

export const LinkPageAdmin = () => {
    
    return (
        <Link to={"/admin"} className={"absconditus"} >Admin</Link>
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
        sessionStorage.removeItem('jwt');
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
        
        sessionStorage.removeItem('jwt')
        dispatch(deleteUser())
        navigate("/accueil")

    }
    
    return (
        <a className="absconditus" href="/" onClick={handleLogOut}>Deconnexion</a>
    )
}

export const LinkConditionalNavigation = () => {
    const user = useSelector(state => state.user);

    return (
        <>
            {
                sessionStorage.getItem('jwt')
                    ? user.isAdmin
                        ? <LinkPageAdmin />
                        : <GenericLink direction={"/"} class={"link-footer"} text={"Accueil"}/>
                    : <GenericLink direction={"/connexion"} class={"absconditus"} text={"Connexion"}/>
            }
        </>
    );
};

export const LinkConditionalNavigationBurger = () => {
    const user = useSelector(state => state.user);

    return (
        <>
            {
                sessionStorage.getItem('jwt')
                    ? user.isAdmin
                        ? <GenericLink direction={"/admin"} class={"nav-link"} text={"Admin"}/>
                        : <p>Bienvenue !</p>
                    : <p>Bienvenue !</p>
            }
        </>
    )
}

export const ReloadLinkDynamicData = (props) => {
    
    return (
        <Link reloadDocument to={props.direction} state={props.setters} className={props.class}>{props.text}</Link>
    );
};

export const GenericLinkDynamicData = (props) => {
    
    return (
        <Link to={props.direction} state={props.setters} className={props.class}>{props.text}</Link>
    );
};