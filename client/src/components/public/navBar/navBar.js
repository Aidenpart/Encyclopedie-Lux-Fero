import { useState } from 'react';

import { listeRomans } from '../../../helpers/categories.js';
import { ReloadLinkDynamicData, GenericLink, LinkConditionalNavigationBurger, LinkLogOutBurger } from "../links/links.js";
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
                    <GenericLink direction={"/"} class={"nav-link"} text={"Accueil"}/>
                </li>
                {listeRomans.map((roman, i) => {
                    return (
                        <li className="nav-item" key={i}>
                            <ReloadLinkDynamicData 
                                direction={`/accueil-${roman.replace(/\s/, "-")}`} 
                                class={"nav-link"} 
                                text={roman} 
                                setters={{roman:roman}}/>
                        </li>
                    )
                })}
                <li>
                    <LinkConditionalNavigationBurger />
                </li>
                {
                sessionStorage.getItem("jwt") ? 
                    <li className="nav-link">
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
