import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";


import { LinkAccueil } from "../../components/public/links/links"
import { Header } from "../../components/public/header/header";
import { Footer } from "../../components/public/footer/footer";
import { deleteRoman } from "../../store/slice/romanSlice";
import { fetchData } from "../../helpers/dataHelpers";
import { Loading } from "../../components/public/loading/loading";

export const PageAccueil = () => {
    const [dataLoaded, setDataLoaded] = useState(false);
    const [romans, setRomans] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {

    });

    useEffect(() => {
        if(!dataLoaded) {
            fetchData("romans")
            .then((data) => {
                setRomans(data)
                setDataLoaded(true);
            })
            .catch((err)=>{
                console.log(err)
            })
        }
        document.title = "Acceuil Encyclopédie";
        dispatch(deleteRoman())
    }, [setRomans, dataLoaded, dispatch, romans])


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
                    <section>
                        <LinkAccueil direction={"/accueil-Lux-Fero"} image={"/images/link_Lux-Fero.jpg"} texte={"Lux Fero"}/>
                        <p>Résumé Lux Fero</p>
                    </section>
                    <section>
                        <LinkAccueil direction={"/accueil-Regina-Magicae"} image={"/images/link_Regina-Magicae.jpg"} texte={"Regina Magicae"}/>
                        <p>Résumé Regina Magicae</p>
                    </section>
                </article>
            </main>
            <Footer />
        </section>
    )
}