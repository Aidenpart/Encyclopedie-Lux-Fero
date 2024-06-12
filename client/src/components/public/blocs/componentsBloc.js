import { useEffect, useState } from "react";

import { CardComponent } from "../cards/componentsCard.js";
import { listeDomaines, listeAppartenances } from "../../../helpers/categories";
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
    return mostRecentObject;
};


export const ReadAll = (props) => {
    const type = props.type;
    const datas = props.datas;
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


export const LatestData = (props) => {
    const type = props.type;
    const roman = props.roman;
    const [latestDataFound, setLatestDataFound] = useState("");

    useEffect(() => {
        readData(type)
        .then((response) => {
            if (roman === undefined) {
                setLatestDataFound(filterRecentData(response))
            }else {
                setLatestDataFound(filterRecentData(response.filter((data) => data.roman === roman.id)))
            }
        })
    }, [roman, type]);

    return(
        <tr>
            <th>{capitalizeFirstLetter(`${type}`)}</th>
            {latestDataFound === "" || latestDataFound === undefined ? 
                <td>Pas de données</td>
                :<td>{latestDataFound.nom || latestDataFound.titre}</td>}
        </tr>
    );
};


export const SortData = (props) => {
    const datas = props.datas;
    const type = props.type;
    const [dataFilter, setDataFilter] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false); 
    const [errorMessage, setErrorMessage] = useState([]);
    const [categories, setCategories] = useState([]);
    const [textType, setTextType] = useState("");
    const [selectedData, setSelectedData] = useState("");
    const [filterOne, setFilterOne] = useState("");
    const [filterTwo, setFilterTwo] = useState("");
    const [selectValues, setSelectValues] = useState({
        nom: "",
        appartenance: "",
        titre: "",
        domaine: ""
    });

    useEffect(() => {       
        if(type === "fiches") {
            setTextType(`de la ${type.slice(0, -1)}`);
            setCategories(listeDomaines.map(categorie => categorie.domaine));
            setFilterOne("titre");
            setFilterTwo("domaine");
        }else {
            setFilterOne("nom");
            setFilterTwo("appartenance");
            setTextType(`du ${type.slice(0, -1)}`);
            if (props.roman === "Lux Fero") 
                setCategories(listeAppartenances.LuxFero); 
            else 
                setCategories(listeAppartenances.ReginaMagicae);
        }

    }, [props.roman, type, setCategories]);

    const handleSubmit = (e, filter) => {
        e.preventDefault();
        let data = datas.filter((data) => selectValues[filter] === data[filter]);
        if((e.target[0].value || e.target[1].value !== "") && data.length !== 0) {
            console.log(e.target[0].value)
            setSelectedData(data)
            setErrorMessage(false)
            setModalIsOpen(true)
        }else {
            filter === "" ?
                setErrorMessage("Selectionnez une catégorie ou un nom")
                : setErrorMessage("Aucune donnée dans cette catégorie")
            setSelectedData(false)
        };
    };

    const handleChange = (selectedSelect, selectName) => {
        const updatedSelectValues = {...selectValues, [selectName]: selectedSelect};
        setDataFilter(selectName);
        setSelectValues(updatedSelectValues);
        
        Object.keys(updatedSelectValues).forEach(name => {
            if (name !== selectName)
                updatedSelectValues[name] = "";
        });
    };

    const handleClick = () => {
        setModalIsOpen(false);
    };
    
    return(
        <section>
            <div>
                <form className="sort-data-form" onSubmit={(e) => handleSubmit(e, dataFilter)}>
                    <label>{`${capitalizeFirstLetter(filterOne)} ${textType}`} : <br />
                        <select value={selectValues.nom || selectValues.titre} onChange={(e) => handleChange(e.target.value, filterOne)}>
                            <option value={""}>-----</option>
                            {datas.map((data, i) => {
                                return <option key={i}>{data.nom || data.titre}</option>;
                            })}
                        </select>                    
                    </label>
                    <label>{`${capitalizeFirstLetter(filterTwo)} ${textType}`} : <br />
                        <select value={selectValues.appartenance || selectValues.domaine} onChange={(e) => handleChange(e.target.value, filterTwo)}>
                            <option value={""}>-----</option>
                                {categories.map((data, i) => {
                                    return <option key={i}>{data}</option>;
                                })}
                        </select>
                    </label>
                    <button>Chercher</button>
                </form>
            </div>
                {modalIsOpen && (
                    <>
                        <button className="hide-button" onClick={handleClick}>Cacher</button>
                        <div className="cards-article">
                            <CardComponent datas={selectedData} type={type}/>
                        </div>
                    </>
                )}
                {errorMessage && (
                    <p className="error-message">{`${errorMessage}`}</p>
                )}
        </section>
    );
};