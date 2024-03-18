import { useEffect, useState } from "react";

import {capitalizeFirstLetter} from "./componentsBloc.js"
import { CardComponent } from "../cards/cardsEncyclopedie";
import { appartenancesLuxFero, appartenancesReginaMagicae } from "../../../helpers/categories";


export const DataBloc = (props) => {
    const datas = props.datas;
    const dataType = props.dataType;
    const romanName = props.roman ;


    return(
        <article>
            <h1>Les {capitalizeFirstLetter(`${dataType}`)}</h1>
            <div className="cards-article">
                <SortData datas={datas} type={dataType} roman={romanName}/>
                <ReadAll datas={datas} type={dataType}/>
            </div>
        </article>
    );
};



export const SortData = (props) => {
    const [appartenances, setAppartenances] = useState([])
    const datas = props.datas;
    const type = props.type;
    const text = `${type}`.slice(0, -1)
    const [filter, setFilter] = useState("");
    const [selectedData, setSelectedData] = useState("");
    const [specifiedData, setSpecifiedData] = useState([]);


    useEffect(() => {
        props.roman === "Lux Fero" ? 
            setAppartenances(appartenancesLuxFero) 
            : setAppartenances(appartenancesReginaMagicae)

    }, [props.roman, appartenances]);

    const handleSubmitOne = (e, filter) => {
        e.preventDefault();
        setSpecifiedData(datas.filter((data) => selectedData === data[filter]))    
    };

    const handleChange = (e, filter) => {
        setFilter(filter)
        setSelectedData(e.target.value)
    };

    return(
        <section>
            <div>
                <form onSubmit={(e) => handleSubmitOne(e, filter)}>
                    <label>Nom du {text}
                        <select onChange={(e) => handleChange(e, "nom")}>
                            <option disabled={true} value={"default"} selected>-----</option>
                                {datas.map((data, i) => {
                                    return <option key={i}>{data.nom}</option>;
                                })}
                        </select>
                    </label>
                    <label>Appartenance du {text}
                        <select onChange={(e) => handleChange(e, "appartenance")}>
                            <option disabled={true} selected>-----</option>
                                {appartenances.map((data, i) => {
                                    return <option key={i}>{data}</option>;
                                })}
                        </select>
                    </label>
                    <button>Chercher le {text}</button>
                </form>
            </div>
            {specifiedData && (
                <CardComponent datas={specifiedData} type={type}/>
            )}
        </section>
    );
};


export const ReadAll = (props) => {
    const type = props.type;
    const datas = props.datas
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const handleClick = () => {
        setModalIsOpen(false);
    };
    
    return (
        <section>
            <h3>Voir les {type}</h3>
            {modalIsOpen && (
                <div>
                    <button onClick={handleClick}>Cacher</button>
                    <div>
                        { type === "lieux" ? 
                        <CardComponent datas={datas} type={type}/> 
                        : 
                        <CardComponent datas={datas} type={type}/>
                        }    
                    </div>
                </div>
            )}
            {!modalIsOpen && (<button onClick={() => setModalIsOpen(true)}>Afficher tous les {type}</button>)}
        </section>
    );
};