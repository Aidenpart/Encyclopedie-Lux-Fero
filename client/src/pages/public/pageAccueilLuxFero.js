import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Header } from "../../components/public/header/header";
import { fetchData } from "../../helpers/dataHelpers";
import { addRoman } from "../../store/slice/romanSlice";
import { GenericLink } from "../../components/public/links/links";
import { Footer } from "../../components/public/footer/footer";
import { Loading } from "../../components/public/loading/loading";
import { CardComponent } from "../../components/public/cards/newCardsEncyclopedie";


export const PageAccueilLuxFero = () => {
    const [personnages, setPersonnages] = useState("")
    const [lieux, setLieux] = useState("")
    const [dataLoaded, setDataLoaded] = useState(false);
    const dispatch = useDispatch();
    const roman = useSelector(state => state.roman);

    useEffect(() => {
        if (!dataLoaded) {
            fetchData("romans")
                .then((response) => {
                    const luxFeroRoman = response.filter((data) => data.nom === "Lux Fero");
                    dispatch(addRoman(luxFeroRoman[0]));
                    setDataLoaded(true);
                })
                .catch((err) => {
                    console.log(err);
                });

            fetchData("lieux")
                .then((response) => {
                    const lieux = response.filter((data) => data.roman === roman.id);
                    setLieux(lieux)
                })
                .catch((err) => {
                    console.log(err);
                });

            fetchData("personnages")
                .then((response) => {
                    const personnages = response.filter((data) => data.roman === roman.id);
                    setPersonnages(personnages)
                })
                .catch((err) => {
                    console.log(err);
                });
            }

        document.title = "Accueil Lux Fero";
    }, [dataLoaded, dispatch, roman, setLieux]);

    if (!dataLoaded)
        return <Loading />;

    return (
        <section className="page">
            <nav>
                <GenericLink direction={"/accueil"} class={"general-link"} text={"Accueil Encyclopédie"}/>
            </nav>
            <main>
                <article>
                    <Header text={"Accueil Lux Fero"}/>
                    <p>{roman.nom}</p>
                    <p>Il y a actuellement {lieux.length} lieux et {personnages.length} personnages dans cette Encyclopédie.</p>
                </article>
                <article>
                    <h1>Les Lieux</h1>
                    <div className="cards-article"><CardComponent datas={lieux} type={"lieux"}/></div>
                </article>
                <article>
                    <h1>Les Personnages</h1>
                    <div className="cards-article"><CardComponent datas={personnages} type={"personnages"}/></div>
                </article>
            </main>
            <Footer />
        </section>
    )
}