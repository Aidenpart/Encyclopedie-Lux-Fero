import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import { NavBar } from "../../components/public/navBar/navBar.js";
import { HeaderEncyclopedie } from "../../components/public/header/header.js";
import { readData } from "../../helpers/dataHelpers.js";
import { addRoman } from "../../store/slice/romanSlice.js";
import { Footer } from "../../components/public/footer/footer.js";
import { Loading } from "../../components/public/loading/loading.js";
import { DataBloc } from "../../components/public/blocs/blocs.js";


export const PageAccueilRoman = () => {
    const location = useLocation(); 
    const urlTitle = location.pathname.slice(9).replace( "-", " ");
    const dispatch = useDispatch();
    const roman = useSelector(state => state.roman);
    const nomRoman = roman.nom;
    const [personnages, setPersonnages] = useState([]);
    const [lieux, setLieux] = useState([]);
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
        }
        
    }, [dataLoaded, dispatch, urlTitle]);

    
    useEffect(() => {
        readData("lieux")
        .then((response) => {
            setLieux(response.filter((data) => data.roman === roman.id))
        })
        .catch((err) => {
            console.log(err);
        });

        readData("personnages")
        .then((response) => {
            setPersonnages(response.filter((data) => data.roman === roman.id))
        })
        .catch((err) => {
            console.log(err);
        });

        document.title = `Accueil ${nomRoman}`;
    }, [roman, nomRoman])


    if (!dataLoaded && lieux.length===0 && personnages.length===0)
        return <Loading />;

    return (
        <section className="page">
            < NavBar/>
            <main>
                <HeaderEncyclopedie roman={nomRoman} lieux={lieux.length} personnages={personnages.length} />
                <DataBloc datas={lieux} dataType={"lieux"} roman={nomRoman}/>
                <DataBloc datas={personnages} dataType={"personnages"} roman={nomRoman}/>
            </main>
            <Footer />
        </section>
    );
};