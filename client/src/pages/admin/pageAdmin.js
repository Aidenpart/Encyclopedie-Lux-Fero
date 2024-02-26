import { useState, useEffect } from "react";

import { NavBar } from "../../components/public/navBar/navBar.js";
import { Loading } from "../../components/public/loading/loading.js";
import { GenericLinkDynamicData } from "../../components/public/links/links.js";
import { IntroductionAdmin } from "../../components/public/introductions/introductions.js";
import { Header } from "../../components/public/header/header.js";
import { Footer } from "../../components/public/footer/footer.js";
import { listDataCategories } from "../../helpers/categories.js";
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
            <NavBar />
            <main className="main-admin">
                <Header text={"Admin"}/>
                <IntroductionAdmin />
                <div className="link-zone">
                    <p>Création Roman</p>
                    {listDataCategories.map((dataCategory, i) => {
                        return <GenericLinkDynamicData 
                                    key={i}
                                    direction={"/admin/CRUD"} 
                                    class={"CRUD-link"} 
                                    text={`CRUD ${dataCategory}`}
                                    setters={{
                                        dataCategory:dataCategory,
                                        isCreation:true,
                                        isPersonnage:dataCategory
                                }}/>
                    })}  
                </div>
            </main>
            <Footer />
        </section>
    )
}