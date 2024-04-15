import { useEffect, useState } from "react";

import { CardComponent } from "../cards/componentsCard.js";
import { appartenancesLuxFero, appartenancesReginaMagicae, listeDomaines } from "../../../helpers/categories";
import { readData } from "../../../helpers/dataHelpers";


export function capitalizeFirstLetter (text) {
    return text.charAt(0).toUpperCase()+text.slice(1);
};


function filterRecentData (data) {
    let mostRecentDate = new Date(Math.max.apply(null, data.map( e => {
        return new Date(e.updatedAt);
     })));
    let mostRecentObject = data.filter( e => { 
        let d = new Date( e.updatedAt ); 
        return d.getTime() === mostRecentDate.getTime();
    })[0];
    return mostRecentObject
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
                <>
                    <button onClick={handleClick}>Cacher</button>
                    <div className="cards-article">
                        <CardComponent datas={datas} type={type}/>
                    </div>
                </>
            )}
            {!modalIsOpen && (<button onClick={() => setModalIsOpen(true)}>Afficher tous les {type}</button>)}
        </section>
    );
};


export const SortData = (props) => {
    const [selectValues, setSelectValues] = useState({
        nom: "",
        appartenance: ""
    });
    const [messageNoData, setMessageNoData] = useState([])
    const [appartenances, setAppartenances] = useState([])
    const datas = props.datas;
    const type = props.type;
    const text = `${type}`.slice(0, -1);
    const [filter, setFilter] = useState("");
    const [selectedData, setSelectedData] = useState("");

    useEffect(() => {       
        if(type === "fiches")
            setAppartenances(listeDomaines.map(categorie => categorie.domaine))
        else {
            if (props.roman === "Lux Fero") 
                setAppartenances(appartenancesLuxFero) 
            else 
                setAppartenances(appartenancesReginaMagicae)
        }
    }, [props.roman, type, setAppartenances]);

    const handleSubmit = (e, filter) => {
        e.preventDefault();
        let data = datas.filter((data) => selectValues[filter] === data[filter]);
        if((e.target[0].value || e.target[1].value !== "") && data.length !== 0) {
            setSelectedData(data)
            setMessageNoData(false)
        }else {
            filter === "" ?
                setMessageNoData("Selectionnez une catégorie")
                : setMessageNoData("Aucune donnée dans cette catégorie")
            setSelectedData(false)
        };
    };

    const handleChange = (selectedValue, selectName) => {
        const updatedSelectValues = {...selectValues, [selectName]: selectedValue};
        setFilter(selectName)
        setSelectValues(updatedSelectValues);
        
        Object.keys(updatedSelectValues).forEach(name => {
            if (name !== selectName)
                updatedSelectValues[name] = '';
        });
    };
    
    return(
        <section>
            <div>
                <form className="sort-data-form" onSubmit={(e) => handleSubmit(e, filter)}>
                    <label>Nom du {text} :
                        <select value={selectValues.nom || selectValues.titre} onChange={(e) => handleChange(e.target.value, 'nom' || "titre")}>
                            <option value={""}>-----</option>
                            {datas.map((data, i) => {
                                return <option key={i}>{data.nom || data.titre}</option>;
                            })}
                        </select>                    
                    </label>
                    <label>Appartenance du {text} : 
                        <select value={selectValues.appartenance} onChange={(e) => handleChange(e.target.value, 'appartenance')}>
                            <option value={""}>-----</option>
                                {appartenances.map((data, i) => {
                                    return <option key={i}>{data}</option>;
                                })}
                        </select>
                    </label>
                    <button>Chercher le {text}</button>
                </form>
            </div>
            <div className="cards-article">
            {selectedData && (
                <CardComponent datas={selectedData} type={type}/>
            )}
            {messageNoData && (
                <p>{`${messageNoData}`}</p>
            )}
            </div>
        </section>
    );
};


export const LatestData = (props) => {
    const type = props.type;
    const roman = props.roman;
    const [latestDataFound, setLatestDataFound] = useState("")

    useEffect(() => {
        readData(type)
        .then((response) => {
            if (roman === undefined) {
                setLatestDataFound(filterRecentData(response))
            }else {
                setLatestDataFound(filterRecentData(response.filter((data) => data.roman === roman.id)))
            }
        })
    }, [roman, type])

    return(
        <tr>
            <th>{capitalizeFirstLetter(`${type}`)}</th>
            {latestDataFound === "" || latestDataFound === undefined ? 
                <td>Pas de données</td>
                :<td>{latestDataFound.nom || latestDataFound.titre}</td>}
        </tr>
    );
};