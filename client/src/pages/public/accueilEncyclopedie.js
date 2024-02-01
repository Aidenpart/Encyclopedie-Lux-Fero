import { LinkAccueil } from "../../components/links/linksAccueil"


export const AccueilEncylopedie = () => {

    return (
        <section>
            <nav></nav>
            <LinkAccueil direction={""} image={"/images/link_Lux-Fero.jpg"} texte={"Lux Fero"}/>
            <LinkAccueil direction={""} image={"/images/link_Regina-Magicae.jpg"} texte={"Regina Magicae"}/>
            <footer>mentions légales</footer>
        </section>
    )
}