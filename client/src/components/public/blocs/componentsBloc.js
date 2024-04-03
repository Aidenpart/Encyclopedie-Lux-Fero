import { useEffect, useState } from "react";

import { CardComponent } from "../cards/cardsEncyclopedie";
import { appartenancesLuxFero, appartenancesReginaMagicae } from "../../../helpers/categories";
import { readData } from "../../../helpers/dataHelpers";


export const capitalizeFirstLetter = (text) => {
    return text.charAt(0).toUpperCase()+text.slice(1);
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
    const [appartenances, setAppartenances] = useState([])
    const datas = props.datas;
    const type = props.type;
    const text = `${type}`.slice(0, -1);
    const [filter, setFilter] = useState("");
    const [selectedData, setSelectedData] = useState("");


    useEffect(() => {
        props.roman === "Lux Fero" ? 
            setAppartenances(appartenancesLuxFero) 
            : setAppartenances(appartenancesReginaMagicae)
    }, [props.roman, appartenances]);

    const handleSubmit = (e, filter) => {
        e.preventDefault();
        if(e.target[0].value || e.target[1].value !== "" )
            setSelectedData(datas.filter((data) => selectValues[filter] === data[filter]));
                   
    };

    const handleChange = (selectedValue, selectName) => {
        const updatedSelectValues = {...selectValues, [selectName]: selectedValue};
    
        Object.keys(updatedSelectValues).forEach(name => {
            if (name !== selectName)
                updatedSelectValues[name] = '';
        });
    
        setFilter(selectName)
        setSelectValues(updatedSelectValues);
    };
    
    return(
        <section>
            <div>
                <form onSubmit={(e) => handleSubmit(e, filter)}>
                    <label>Nom du {text} :
                        <select value={selectValues.nom} onChange={(e) => handleChange(e.target.value, 'nom')}>
                            <option value={""}>-----</option>
                            {datas.map((data, i) => {
                                return <option key={i}>{data.nom}</option>;
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
            </div>
        </section>
    );
};


export const LatestData = (props) => {
    const type = props.type;
    const roman = props.roman
    const [latestDataFound, setLatestDataFound] = useState("")

    useEffect(() => {
        readData(type)
        .then((response) => {

            if (roman !== undefined && roman.id !== "") {
                setLatestDataFound(filterRecentData(response.filter((data) => data.roman === roman.id)))
            }else
                setLatestDataFound(filterRecentData(response))
        })
    }, [type, roman, latestDataFound])


    return(
        <tr>
            <th>{capitalizeFirstLetter(`${type}`)}</th>
            {latestDataFound === "" || latestDataFound === undefined ? 
                <td>Pas de données</td>
                :<td>{latestDataFound.nom || latestDataFound.titre}</td>}
        </tr>
    );
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