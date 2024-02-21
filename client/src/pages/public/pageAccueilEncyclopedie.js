import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";


import { LinkAccueil } from "../../components/public/links/links"
import { Header } from "../../components/public/header/header";
import { Footer } from "../../components/public/footer/footer";
import { deleteRoman } from "../../store/slice/romanSlice";
import { listeRomans } from "../../helpers/categories";
import { IntroductionLuxFero, IntroductionReginaMagicae } from "../../components/public/introductions/introductions";
import { Loading } from "../../components/public/loading/loading";

export const PageAccueil = () => {
    const [dataLoaded, setDataLoaded] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if(!dataLoaded) {
            dispatch(deleteRoman());
            setDataLoaded(true);
        } 
            
        document.title = "Acceuil Encyclopédie";
    }, [dataLoaded, dispatch])
  
    if (!dataLoaded)
        return <Loading />; 

    return (
        <section className="page">
            <main>
                <article>
                    <Header text={"Encyclopédie"}/>
                    <p>Introduction</p>
                </article>
                <article>
                    {listeRomans.map((roman, i) => {
                        return (
                            <section>
                                <LinkAccueil 
                                    direction={`/accueil-${roman.replace(/\s/, "-")}`} 
                                    image={`/images/link_${roman.replace(/\s/, "-")}.jpg`} 
                                    texte={`${roman}`} 
                                    setters={{roman:roman}}
                                />
                                {
                                    roman === "Lux Fero" ? <IntroductionLuxFero /> : <IntroductionReginaMagicae />
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