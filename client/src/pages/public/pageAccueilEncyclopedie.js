import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";


import { LinkAccueil } from "../../components/public/links/links"
import { Header } from "../../components/public/header/header";
import { Footer } from "../../components/public/footer/footer";
import { URL } from "../../helpers/urlHelpers";
import { deleteRoman } from "../../store/slice/romanSlice";

export const PageAccueil = () => {
    
    const [romans, setRomans] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        document.title = "Acceuil Encyclopédie";
        dispatch(deleteRoman())
    });

    useEffect(() => {
        fetch(`${URL}/wiki/romans`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
        .then((response)=>response.json())
        .then((data) => {
            setRomans(data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }, [setRomans])

    console.log(romans)

    return (
        <section>
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