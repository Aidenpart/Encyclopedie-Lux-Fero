import { useState, useEffect } from "react";


import { NavBar } from "../../components/public/navBar/navBar";
import { Header } from "../../components/public/header/header";
import { LinkAccueil } from "../../components/public/links/links";
import { LatestDataAdd } from "../../components/public/blocs/blocs";
import { Door } from "../../components/public/door/door";
import { Footer } from "../../components/public/footer/footer";
import { IntroductionAccueil } from "../../components/public/introductions/introductions";
import { IntroductionLuxFero, IntroductionReginaMagicae } from "../../components/public/introductions/introductions";
import { listeRomans } from "../../helpers/categories";

import "./pagesAccueilStyles.scss"


export const PageAccueil = () => {
    const [isDesktop, setDesktop] = useState(window.innerWidth > 1081);
    const [isTablet, setTablet] = useState(window.innerWidth > 500 && window.innerWidth < 1080);
    const [isMobile, setMobile] = useState(window.innerWidth < 500);
  
    const updateMedia = () => {
      setDesktop(window.innerWidth > 1081);
      setTablet(window.innerWidth > 500 && window.innerWidth < 1080);
      setMobile(window.innerWidth < 500);
    };
  
    useEffect(() => {
        document.title = "Accueil";
        window.addEventListener("resize", updateMedia);
        return () => window.removeEventListener("resize", updateMedia);
    });

    return (
        <section className="page">
            <NavBar />
            <main>
                <article>
                    <Header text={"Bienvenu"}/>
                    <IntroductionAccueil/>     
                    <LatestDataAdd />
                </article>
                <article className="article-liens-pages-romans">
                    {listeRomans.map((roman, i) => {
                        return (
                            <section key={i} className="liens-pages-romans">
                                {isMobile && 
                                    <>
                                        <LinkAccueil roman={roman} />
                                        {
                                            roman === "Lux Fero" ? <IntroductionLuxFero /> : <IntroductionReginaMagicae />
                                        }
                                    </>
                                }
                                {isTablet && 
                                    <>
                                        <LinkAccueil roman={roman} />
                                        {
                                            roman === "Lux Fero" ? <IntroductionLuxFero /> : <IntroductionReginaMagicae />
                                        }
                                    </>
                                }
                                {isDesktop && 
                                    <>
                                        <h2 className="titre-roman">{roman}</h2>
                                        <Door roman={roman} />
                                        {
                                            roman === "Lux Fero" ? <IntroductionLuxFero /> : <IntroductionReginaMagicae />
                                        }
                                    </>
                                }
                            </section>
                        )
                    })}
                </article>
            </main>
            <Footer />
        </section>
    )
}