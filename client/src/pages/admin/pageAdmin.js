import { useState, useEffect } from "react";

import { Loading } from "../../components/public/loading/loading.js";
import { GenericLink } from "../../components/public/links/links.js";
import { IntroductionAdmin } from "../../components/public/introductions/introductions.js";
import { Header } from "../../components/public/header/header.js";
import { Footer } from "../../components/public/footer/footer.js";
import "./stylesAdmin.scss"


export const PageAdmin = () => {
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {       
        setDataLoaded(true);
        document.title = "Page Administrateur";
    }, [setDataLoaded]);

    if (!dataLoaded)
        return <Loading />;    

    return (
        <section>
            <Header text={"Admin"}/>
            <GenericLink direction={"/accueil"} class={"general-link"} text={"Retour à l'accueil"}/>
            <main className="main-admin">
                <IntroductionAdmin />
                <div className="link-zone">
                    <p>Création Roman</p>
                    <GenericLink direction={"/admin/CRUD-Personnages"} class={"CRUD-link"} text={"CRUD Personnage"}/>
                    <GenericLink direction={"/admin/CRUD-Lieux"} class={"CRUD-link"} text={"CRUD Lieux"}/>
                </div>
            </main>
            <Footer />
        </section>
    )
}