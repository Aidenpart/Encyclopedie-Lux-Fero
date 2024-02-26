import { useState } from 'react';


import { GenericLink, LinkConditionalNavigationBurger, LinkLogOutBurger } from "../links/links.js";
import "./navBar.scss";


export const NavBar = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    const mobileMenuClassName = isMobileMenuOpen ? "nav-menu active" : "nav-menu";
    const hamburgerClassName = isMobileMenuOpen ? "hamburger active" : "hamburger";

    return (
        <nav className="navbar">
            <ul className={mobileMenuClassName}>
                <li className="nav-item">
                    <GenericLink direction={"/accueil"} class={"nav-link"} text={"Accueil"}/>
                </li>
                <li className="nav-item">
                    <GenericLink direction={"/accueil-Lux-Fero"} class={"nav-link"} text={`Lux Fero`}/>
                </li>
                <li className="nav-item">
                    <GenericLink direction={"/accueil-Regina-Magicae"} class={"nav-link"} text={"Regina Magicae"}/>
                </li>
                <li>
                    <LinkConditionalNavigationBurger />
                </li>
                {
                sessionStorage.getItem("jwt") ? 
                    <li className="nav-item">
                        <LinkLogOutBurger />
                    </li>
                : ""    
                }
            </ul>
            <div className={hamburgerClassName} onClick={toggleMobileMenu}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>
        </nav>
    );
};
