import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";


import { Header } from "../../components/public/header/header";
import { Footer } from "../../components/public/footer/footer";


export const PageAccueilReginaMagicae = () => {
    
    const [roman, setRoman] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        document.title = "Acceuil RM";
    });

    return (
        <section>
            <main>
                <article>
                    <Header text={"Accueil Regina Magicae"}/>
                    <p>Introduction</p>
                </article>
            </main>
            <Footer />
        </section>
    )
}