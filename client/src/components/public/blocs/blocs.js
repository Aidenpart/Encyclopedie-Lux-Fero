import { useState } from "react";

import { CardComponent } from "../cards/cardsEncyclopedie";
import { appartenancesLuxFero } from "../../../helpers/categories";

export const DataBloc = (props) => {
    const datas = props.datas;
    const type = props.type;
    const text = type.slice(0, -1);
    const [selectedData, setSelectedData] = useState("");
    const [specifiedData, setSpecifiedData] = useState([]);


    const handleSubmitOne = (e) => {
        e.preventDefault();
        
        const foundData = datas.filter((data) => selectedData === data.nom || selectedData === data.appartenance);
        
        if (foundData.length > 2) {
            setSpecifiedData(foundData)
            console.log(specifiedData) 
        }else{
            setSpecifiedData(foundData)
            console.log(specifiedData)
        }
    };


    return(
        <article>
            <div>
                <form onSubmit={handleSubmitOne}>
                    <label>Nom du {text}
                        <select onChange={(e) => setSelectedData(e.target.value)}>
                            <option disabled={true} selected>-----</option>
                                {datas.map((data, i) => {
                                    return <option key={i}>{data.nom}</option>;
                                })}
                        </select>
                    </label>
                    <label>Appartenance du {text}
                        <select onChange={(e) => setSelectedData(e.target.value)}>
                            <option disabled={true} selected>-----</option>
                                {appartenancesLuxFero.map((data, i) => {
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
        </article>
    )
}


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

/*
import React, { useState } from "react";
import { CardComponent } from "../cards/cardsEncyclopedie";
import { appartenancesLuxFero } from "../../../helpers/categories";

export const DataBloc = (props) => {
    const datas = props.datas;
    const type = props.type;
    const text = type.slice(0, -1);
    const [selectedNom, setSelectedNom] = useState("");
    const [selectedAppartenance, setSelectedAppartenance] = useState("");
    const [specifiedData, setSpecifiedData] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Filtre en fonction du nom et/ou de l'appartenance sélectionnée
        const foundData = datas.filter(data => {
            if (selectedNom && selectedAppartenance) {
                return selectedNom === data.nom && selectedAppartenance === data.appartenance;
            } else if (selectedNom) {
                return selectedNom === data.nom;
            } else if (selectedAppartenance) {
                return selectedAppartenance === data.appartenance;
            }
            return true; // Aucune sélection
        });
        
        setSpecifiedData(foundData);
    };

    const handleSelectChange = (e) => {
        setSelectedNom("");
        setSelectedAppartenance("");
        if (e.target.name === "nom") {
            setSelectedNom(e.target.value);
        } else if (e.target.name === "appartenance") {
            setSelectedAppartenance(e.target.value);
        }
    };

    return (
        <article>
            <div>
                <form onSubmit={handleSubmit}>
                    <label>Nom du {text}
                        <select name="nom" onChange={handleSelectChange} value={selectedNom}>
                            <option value="">-----</option>
                            {datas.map((data, i) => (
                                <option key={i}>{data.nom}</option>
                            ))}
                        </select>
                    </label>
                    <label>Appartenance du {text}
                        <select name="appartenance" onChange={handleSelectChange} value={selectedAppartenance}>
                            <option value="">-----</option>
                            {appartenancesLuxFero.map((data, i) => (
                                <option key={i}>{data}</option>
                            ))}
                        </select>
                    </label>
                    <button type="submit">Chercher le {text}</button>
                </form>
            </div>
            {specifiedData.length > 0 && (
                <CardComponent datas={specifiedData} type={type}/>
            )}
        </article>
    );
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
                <div>
                    <button onClick={handleClick}>Cacher</button>
                    <div>
                        <CardComponent datas={datas} type={type}/>
                    </div>
                </div>
            )}
            {!modalIsOpen && (<button onClick={() => setModalIsOpen(true)}>Afficher tous les {type}</button>)}
        </section>
    );
};
*/