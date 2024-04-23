import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { readData } from "../../../helpers/dataHelpers";


export const GetOne = (props) => {
    const navigate = useNavigate();
    const romans = props.romans;
    const [text, setText] = useState("");
    const [message, setMessage] = useState("");
    const [datas, setDatas] = useState([]);
    const [selectedData, setSelectedData] = useState("");
    const [isRoman, setIsRoman] = useState(false);
    const [roman, setRoman] = useState("");
    
    useEffect(() => {
        readData(props.dataCategory)
        .then((response) => {
            !isRoman? setDatas(response.filter((data) => data.roman === roman)) 
            : setDatas(response)
        })
        .catch((err) => {
            console.log(err);
            setMessage(err);
        });

        switch (props.dataCategory) {
            case "personnages":
                setText("du personnage")
                break;
            case "lieux":
                setText("du lieu")
                break;
            case "fiches":
                setText("de la fiche")
                break;
            case "romans":
                setIsRoman(true)
                setText("du roman")
                break;                                           
            default:
                setText("")
                break;
        };
        
    }, [setDatas, setMessage, props.dataCategory, setText, roman, romans, isRoman, setIsRoman]);

    const handleSubmitOne = (e) => {
        e.preventDefault();
        const foundData = datas.find(data => data.nom === selectedData || data.titre === selectedData);
        if (foundData)
            navigate(`${props.dataCategory}/${foundData._id}`, {state: {dataCategory:props.dataCategory}});
   };
    
    return (
        <section className="CRUD">
            <h3>Chercher</h3>
            <form onSubmit={handleSubmitOne} className="formulaire">
                {!isRoman && 
                    <label> Roman :
                        <select onChange={(e) => setRoman(e.target.value)}>
                            <option disabled={true} selected>-----</option>
                            {romans.map((roman,i) => {
                                return <option key={i} value={roman._id}>{roman.nom}</option>
                            })}
                        </select>
                    </label>
                }
                <label>Nom {text}
                    <select onChange={(e) => setSelectedData(e.target.value)}>
                        <option disabled={true} selected>-----</option>
                        {datas.map((data, i) => {
                            return <option key={i}>{data.nom || data.titre}</option>
                        })}
                    </select>
                </label>
                <button>Chercher</button>
            </form>
            <div className={"err-message"}>
                {message}
            </div>
        </section>
    );
};