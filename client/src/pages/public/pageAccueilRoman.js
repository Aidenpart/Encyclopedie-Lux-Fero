import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import { NavBar } from "../../components/public/navBar/navBar.js";
import { listDataCategories } from "../../helpers/categories.js";
import { Header } from "../../components/public/header/header.js";
import { readData } from "../../helpers/dataHelpers.js";
import { addRoman } from "../../store/slice/romanSlice.js";
import { Footer } from "../../components/public/footer/footer.js";
import { Loading } from "../../components/public/loading/loading.js";
import { DataBloc, LatestDataAdd } from "../../components/public/blocs/blocs.js";


export const PageAccueilRoman = () => {
    const location = useLocation(); 
    const urlTitle = location.pathname.slice(9).replace( "-", " ");
    const dispatch = useDispatch();
    const roman = useSelector(state => state.roman);
    const nomRoman = roman.nom;
    const [dataLoaded, setDataLoaded] = useState(false);
  
    useEffect(() => {
        
        if (!dataLoaded) {
            setDataLoaded(true);

            readData("romans")
            .then((response) => {
                dispatch(addRoman(response.find((data) => data.nom === urlTitle)));
            })
            .catch((err) => {
                console.log(err);
            });
        };

        document.title = `Accueil ${nomRoman}`
    }, [dataLoaded, dispatch, urlTitle, nomRoman]);


    if (!dataLoaded)
        return <Loading />;

    return (
        <section className="page">
            < NavBar/>
            <main>
                <Header text={nomRoman} />
                <LatestDataAdd roman={roman}/>
                {listDataCategories.slice(0, -1).map((categorie, i) => {
                    return (<DataBloc datas={categorie} dataType={`${categorie}`} key={i} roman={roman}/>)
                })}
            </main>
            <Footer />
        </section>
    );
};