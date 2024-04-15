import { useState, useEffect } from "react";


import { NavBar } from "../../components/public/navBar/navBar";
import { Header } from "../../components/public/header/header";
import { LinkAccueil } from "../../components/public/links/links";
import { LatestDataAdd } from "../../components/public/blocs/blocs";
import { Door } from "../../components/public/door/door";
import { Footer } from "../../components/public/footer/footer";
import { IntroductionAccueil } from "../../components/public/introductions/introductions";
import { ResumeLuxFero, ResumeReginaMagicae } from "../../components/public/introductions/introductions";
import { listeRomans } from "../../helpers/categories";

import "./pagesAccueilStyles.scss"


export const PageAccueil = () => {
    const [isDesktop, setDesktop] = useState(window.innerWidth > 1023);
    const [isTablet, setTablet] = useState(window.innerWidth > 480 && window.innerWidth < 1024);
    const [isMobile, setMobile] = useState(window.innerWidth < 481);
    const [classDivAccueil, setClassDivAccueil] = useState("")
  
    const updateMedia = () => {
      setDesktop(window.innerWidth > 1023);
      setTablet(window.innerWidth > 481 && window.innerWidth < 1024);
      setMobile(window.innerWidth < 480);
    };
  
    useEffect(() => {
        isDesktop ?
            setClassDivAccueil("desktop")
            : setClassDivAccueil("")

        document.title = "Accueil";
        window.addEventListener("resize", updateMedia);
        return () => window.removeEventListener("resize", updateMedia);
    }, [setClassDivAccueil, isDesktop]);

    return (
        <section className="page">
            <NavBar />
            <main>
                <article>
                    <Header text={"Bienvenue"}/>
                    <div className={classDivAccueil}>
                        <IntroductionAccueil isDesktop={isDesktop}/>     
                        <LatestDataAdd isDesktop={isDesktop}/>
                    </div>
                </article>
                <article className="article-liens-pages-romans">
                    {listeRomans.map((roman, i) => {
                        return (
                            <section key={i} className="liens-pages-romans">
                                {isMobile && 
                                    <>
                                        <LinkAccueil roman={roman} />
                                        {
                                            roman === "Lux Fero" ? <ResumeLuxFero /> : <ResumeReginaMagicae />
                                        }
                                    </>
                                }
                                {isTablet && 
                                    <>
                                        <LinkAccueil roman={roman} />
                                        {
                                            roman === "Lux Fero" ? <ResumeLuxFero /> : <ResumeReginaMagicae />
                                        }
                                    </>
                                }
                                {isDesktop && 
                                    <>
                                        <h2 className="titre-roman">{roman}</h2>
                                        <Door roman={roman} />
                                        {
                                            roman === "Lux Fero" ? <ResumeLuxFero /> : <ResumeReginaMagicae />
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