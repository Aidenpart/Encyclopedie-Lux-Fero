import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";


import { URL } from "../../../helpers/urlHelpers";


export const GetOne = (props) => {
    
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [datas, setDatas] = useState([]);
    const [selectedData, setSelectedData] = useState("");
    
    useEffect(() => {
        fetch(`${URL}/wiki/${props.dataSetter}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((response) => response.json())
        .then((data) => {
            setDatas(data);
        })
        .catch((err) => {
            console.log(err);
            setMessage(err);
        });
    }, [setDatas, setMessage, props.dataSetter]);
    
    const handleSubmitOne = (e) => {
        e.preventDefault();
        
        const foundData = datas.find(data => data.nom === selectedData);

        if (foundData) {
            navigate(`${props.textSetter}/${foundData._id}`);
        }
   };
    
    return (
        <section className="article-CRUD">
            <h3>Chercher un {props.textSetter}</h3>
            <div className="div-form-admin">
                <form onSubmit={handleSubmitOne}  className="form">
                    <label>Nom du {props.textSetter}</label>
                        <select onChange={(e) => setSelectedData(e.target.value)}>
                            <option disabled={true} selected>-----</option>
                            {datas.map((data, i) => {
                                return <option key={i}>{data.nom}</option>;
                            })
                            }
                        </select>
                    <button>Chercher</button>
                </form>
            </div>
            <div className={"err-message"}>
            {message}
            </div>
        </section>
    );
};