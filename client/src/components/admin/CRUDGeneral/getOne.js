import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { fetchData } from "../../../helpers/dataHelpers";


export const GetOne = (props) => {
    const navigate = useNavigate();
    const [text, setText] = useState("");
    const [message, setMessage] = useState("");
    const [datas, setDatas] = useState([]);
    const [selectedData, setSelectedData] = useState("");
    
    useEffect(() => {
        fetchData(props.dataCategory)
        .then((data) => {
            setDatas(data);
        })
        .catch((err) => {
            console.log(err);
            setMessage(err);
        });

        props.dataCategory === "personnages" ? setText("personnage") : setText("lieu");
    }, [setDatas, setMessage, props.dataCategory, setText]);
    
    const handleSubmitOne = (e) => {
        e.preventDefault();
        
        const foundData = datas.find(data => data.nom === selectedData);
        if (foundData)
            navigate(`${props.dataCategory}/${foundData._id}`, {state: {dataCategory:props.dataCategory}});
   };
    
    return (
        <section className="CRUD">
            <h3>Chercher un {text}</h3>
            <div>
                <form onSubmit={handleSubmitOne} className="formulaire">
                    <label>Nom du {text}
                        <select onChange={(e) => setSelectedData(e.target.value)}>
                            <option disabled={true} selected>-----</option>
                            {datas.map((data, i) => {
                                return <option key={i}>{data.nom}</option>;
                            })}
                        </select>
                    </label>
                    <button>Chercher</button>
                </form>
            </div>
            <div className={"err-message"}>
            {message}
            </div>
        </section>
    );
};