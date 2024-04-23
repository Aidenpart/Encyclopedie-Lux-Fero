import { faCopyright } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { GenericLink, LinkConditionalNavigation } from "../links/links.js";
import "./footerStyles.scss";


export const Footer = () => {
    
    return (
        <footer className="footer">
            <span className="droits">
                <FontAwesomeIcon icon={faCopyright} />
                <p>Tous droits réservés</p>            
            </span>
            <GenericLink direction={"/mentions-legales"} class={"link-footer"} text={"Mentions Légales"}/>
            <LinkConditionalNavigation />
            <GenericLink direction={"/cgu"} class={"link-footer"} text={"CGU"}/>
            <GenericLink direction={"/rgpd"} class={"link-footer"} text={"RGPD"}/>
        </footer>
    );
};