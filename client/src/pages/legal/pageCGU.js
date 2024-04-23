import { useEffect } from "react";

import { Header } from "../../components/public/header/header.js";
import {GenericLink} from "../../components/public/links/links.js"
import { Footer } from "../../components/public/footer/footer.js";
import "./legalStyles.scss";


export const PageCGU = () => {
    
    useEffect(() => {
        document.title = "CGU";
    });

    return (
        <section className="main-legal">
            <main>
                <GenericLink direction={"/"} class={"general-link"} text={"Accueil"}/>
                <Header text={"CGU"} />
                <article>
                    <h2>Conditions Générales d'Utilisations</h2>
                    <p>Toutes les informations disponibles sur le site relèvent de la propriété de l’éditeur et sont protégés par le droit de la propriété intellectuelle et plus particulièrement le droit d’auteur.</p>
                    <p>Les informations figurant sur le site sont uniquement disponibles à des fins de consultation par les utilisateurs, à défaut d’un accord préalable et exprès.</p>
                    <p>Toute utilisation totale ou partielle du site ou de son contenu, par quelque procédé que ce soit ou sur quelque support que ce soit, à des fins commerciales ou publicitaires, est interdite et engage la responsabilité de l’utilisateur.</p>
                </article>
            </main>
            <Footer/>
        </section>
    );
};