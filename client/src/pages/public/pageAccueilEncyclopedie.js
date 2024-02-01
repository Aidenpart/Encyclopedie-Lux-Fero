import { useEffect } from "react";

import { LinkAccueil } from "../../components/public/links/links"
import { Header } from "../../components/public/header/header";
import { Footer } from "../../components/public/footer/footer";

export const PageAccueilEncylopedie = () => {

    useEffect(() => {
        document.title = "Acceuil Encyclopédie";
    });

    return (
        <section>
            <nav></nav>
            <main>
                <article>
                    <Header text={"Encyclopédie"}/>
                    <p>Introduction</p>
                </article>
                <article>
                    <section>
                        <LinkAccueil direction={""} image={"/images/link_Lux-Fero.jpg"} texte={"Lux Fero"}/>
                        <p>Résumé Lux Fero</p>
                    </section>
                    <section>
                        <LinkAccueil direction={""} image={"/images/link_Regina-Magicae.jpg"} texte={"Regina Magicae"}/>
                        <p>Résumé Regina Magicae</p>
                    </section>
                </article>
            </main>
            <Footer />
        </section>
    )
}