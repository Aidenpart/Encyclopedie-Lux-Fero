import { Link } from "react-router-dom";
import { useState, useEffect } from "react";


import { Header } from "../../components/public/header/header";
import { LinkAccueil } from "../../components/public/links/links";
import { Door } from "../../components/public/door/door";
import { Footer } from "../../components/public/footer/footer";


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
      window.addEventListener("resize", updateMedia);
      return () => window.removeEventListener("resize", updateMedia);
    });

    return (
        <section>
            <nav></nav>
            <main>
                <article>
                    <Header text={"Accueil Encyclopédie"}/>
                    <p>Introduction</p>              
                </article>
                <article>
                    <Link to={"/accueil"}>
                        {isMobile && <LinkAccueil direction={"/accueil"} image={"/images/link_general.jpg"} texte={"Acceuil Encyclopédie"}/>}
                        {isTablet && <LinkAccueil direction={"/accueil"} image={"/images/link_general.jpg"} texte={"Acceuil Encyclopédie"}/>}
                        {isDesktop && <Door />}
                    </Link>
                </article>
            </main>
            <Footer />
        </section>
    )
}