import { useEffect } from "react";

import { Header } from "../../components/public/header/header.js";
import { GenericLink } from "../../components/public/links/links.js";
import { Footer } from "../../components/public/footer/footer.js";
import "./legalStyles.scss";


export const PageRGPD = () => {  

    useEffect(() => {
        document.title = "Protections des Données";
    });

    return (
        <section className="main-legal">
            <main>
            <GenericLink direction={"/"} class={"general-link"} text={"Accueil"}/>
                <Header text={"Protection des Données"} />
                <article>
                    <h1>Politique de Protection des Données</h1>
                    <p>Nous sommes déterminés à protéger vos données personnelles et à respecter le Règlement Général sur la Protection des Données (RGPD) de l'Union européenne. Cette politique explique comment nous collectons, utilisons, traitons et protégeons vos données personnelles. Nous prenons la confidentialité de vos informations au sérieux et nous nous engageons à traiter vos données personnelles de manière responsable et sécurisée.</p>
                    <ol>
                        <li>
                            <h3>Consentement explicite</h3>
                            <p>Avant de collecter vos données personnelles, nous obtenons votre consentement explicite. Nous vous expliquons pourquoi nous collectons ces données et comment elles seront utilisées.</p>
                            <p>Vos données (informations soumises lors de l'inscription, et les commentaires que vous postez sous les articles) n'ont pour but que le fonctionnement du site.</p>
                        </li>
                        <li>
                            <h3>Politique de confidentialité</h3>
                            <p>Notre politique de confidentialité complète est disponible sur notre site. Elle précise quelles données sont collectées, comment elles sont utilisées, qui y a accès, comment elles sont sécurisées, et combien de temps elles sont conservées.</p>
                            <p>Nous nous engageons à ne pas vendre vos données.</p>
                        </li>
                        <li>
                            <h3>Droit à l'information</h3>
                            <p>Vous avez le droit d'être informé de vos droits en matière de protection des données. Cela inclut le droit d'accès, de rectification, d'effacement, de portabilité et de limitation du traitement de vos données.</p>
                        </li>
                        <li>
                            <h3>Sécurité des données</h3>
                            <p>Nous avons mis en place des mesures de sécurité appropriées pour protéger vos données personnelles contre tout accès non autorisé, divulgation, altération ou destruction.</p>
                        </li>
                        <li>
                            <h3>Durée de conservation</h3>
                            <p>Nous indiquons combien de temps nous prévoyons de conserver les données personnelles collectées, en expliquant les critères utilisés pour déterminer cette durée.</p>
                            <p>Sur ce site, vos données sont conservées pour une durée de un an.</p>
                        </li>
                        <li>
                            <h3>Droit de retrait du consentement</h3>
                            <p>Vous pouvez retirer votre consentement à tout moment. Nous vous fournissons un moyen simple et efficace pour le faire.</p>
                            <p>Vous trouverez un lien pour nous contacter dans la page <a href="/mentions-legales">Mentions légales</a>. Toute demande est à faire par mail.</p>
                        </li>
                        <li>
                            <h3>Notification des violations de données</h3>
                            <p>En cas de violation de données personnelles, nous nous engageons à signaler cette violation aux autorités de protection des données compétentes et, dans certains cas, aux utilisateurs affectés, dans les délais prévus par le RGPD.</p>
                        </li>
                        <li>
                            <h3>Responsabilité du traitement des données</h3>
                            <p>Nous avons désigné un délégué à la protection des données (DPO) pour garantir la conformité à la réglementation lorsque nous traitons régulièrement des données personnelles à grande échelle ou lorsque nos activités de traitement sont complexes.</p>
                        </li>
                        <li>
                            <h3>Transferts internationaux</h3>
                            <p>Si nous transférons des données personnelles en dehors de l'Union européenne, nous nous assurons de respecter les exigences de transfert de données transfrontalier du RGPD.</p>
                        </li>
                        <li>
                            <h3>Droits des utilisateurs</h3>
                            <p>Vous pouvez exercer vos droits en matière de protection des données, tels que le droit d'accès, de rectification, de suppression, etc. Nous disposons de procédures pour répondre à ces demandes.</p>
                        </li>
                        <li>
                            <h3>Conformité</h3>
                            <p>Nous nous engageons à respecter l'ensemble des principes du RGPD, tels que la minimisation des données, la limitation de la finalité, la limitation de la conservation, la transparence et d'autres principes clés.</p>
                        </li>                   
                    </ol>
                    <p>Votre confidentialité est importante pour nous, et nous sommes là pour répondre à toutes vos questions concernant vos données personnelles. Pour toute question ou demande relative à la protection des données, veuillez nous contacter à sulivan.geffroy@3wa.io.</p>
                </article>
            </main>
            <Footer/>
        </section>
    );
};