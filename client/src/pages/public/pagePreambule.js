import { useState, useEffect } from "react";


import { Header } from "../../components/public/header/header";
import { LinkAccueil } from "../../components/public/links/links";
import { Door } from "../../components/public/door/door";
import { Footer } from "../../components/public/footer/footer";
import { IntroductionAccueil } from "../../components/public/introductions/introductions";
import "./pagesAccueilStyles.scss"


export const PagePreambule = () => {
    const [isDesktop, setDesktop] = useState(window.innerWidth > 1081);
    const [isTablet, setTablet] = useState(window.innerWidth > 500 && window.innerWidth < 1080);
    const [isMobile, setMobile] = useState(window.innerWidth < 500);
  
    const updateMedia = () => {
      setDesktop(window.innerWidth > 1081);
      setTablet(window.innerWidth > 500 && window.innerWidth < 1080);
      setMobile(window.innerWidth < 500);
    };
  
    useEffect(() => {
        document.title = "Préambule";
        window.addEventListener("resize", updateMedia);
        return () => window.removeEventListener("resize", updateMedia);
    });

    return (
        <section>
            <nav></nav>
            <main className="main-preambule">
                <article>
                    <Header text={"Préambule"}/>
                    <IntroductionAccueil/>              
                </article>
                <article className="center-link-preambule">                   
                    {isMobile && <LinkAccueil direction={"/accueil"} image={"/images/link_general-deux.jpg"} texte={"Acceuil Encyclopédie"}/>}
                    {isTablet && <LinkAccueil direction={"/accueil"} image={"/images/link_general-deux.jpg"} texte={"Acceuil Encyclopédie"}/>}
                    {isDesktop && <Door />}
                </article>
            </main>
            <Footer />
        </section>
    )
}