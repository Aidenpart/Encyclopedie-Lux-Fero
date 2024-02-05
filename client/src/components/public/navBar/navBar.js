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
            <LinkConditionalNavigationBurger />
            <ul className={mobileMenuClassName}>
                <li className="nav-item">
                    <GenericLink direction={"/"} class={"nav-link"} text={"Accueil"}/>
                </li>
                <li className="nav-item">
                    <GenericLink direction={"/blog"} class={"nav-link"} text={"Blog"}/>
                </li>
                <li className="nav-item">
                    <GenericLink direction={"/encyclopedie"} class={"nav-link"} text={"Encyclopédie"}/>
                </li>
                {
                localStorage.getItem("jwt") ? 
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
