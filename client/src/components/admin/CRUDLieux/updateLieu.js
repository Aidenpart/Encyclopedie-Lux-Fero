import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';


import { URL } from "../../../helpers/urlHelpers.js";
import { listeRomans, appartenancesLuxFero, appartenancesReginaMagicae } from "../../../helpers/categories.js";
import { Loading } from "../../../components/public/loading/loading.js";
import { getToken } from "../../../helpers/authHelpers.js";


export const UpdateLieu = (props) =>{
    
    const navigate = useNavigate();
    const [nom, setNom] = useState(props.lieu.nom);
    const [roman, setRoman] = useState(props.lieu.roman);
    const romans = listeRomans
    const [appartenances, setAppartenances] = useState([]);
    const [appartenance, setAppartenance] = useState(props.lieu.appartenance);
    const [emplacement, setEmplacement] = useState(props.lieu.emplacement);
    const [description, setDescription] = useState(props.lieu.description);
    const [population, setPopulation] = useState(props.lieu.population);
    const [image, setImage] = useState('');
    const [message, setMessage] = useState('');
    const [token, setToken] = useState('');
    const [dataLoaded, setDataLoaded] = useState(false);    
    const id = props.id;

    const handleSubmit = (e) => {
        e.preventDefault();
       
        const formData = new FormData(); 

        formData.append('nom', nom);
        formData.append('roman', roman);
        formData.append('appartenance', appartenance);
        formData.append('emplacement', emplacement);
        formData.append('description', description);
        formData.append('population', population);
        formData.append('image', image);

        fetch(`${URL}/admin/update-lieu/${id}`, {
                method: 'POST',
                headers: {
                  'Authorization': `Bearer ${token}`
                },
                body: formData
        })
        .then((data) => {
            navigate("/admin/CRUD-Lieux");
        })
        .catch((err) =>  {
            console.log(err);
            setMessage(err);
        });
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    useEffect(() => {
        if(roman === "Lux Fero"){
            setAppartenances(appartenancesLuxFero)
        }else if(roman === "Regina Magicae"){
            setAppartenances(appartenancesReginaMagicae)
        }else {
            setAppartenances([])
        }
        
        setToken(getToken());
        setDataLoaded(true);
    }, [setAppartenances, roman, setDataLoaded, setToken]);
    
    
    if (!dataLoaded)
        return <Loading />;   
    
    return (
        <article className="update">
            <h3>Modifier le lieu</h3>
            <div className="div-form">
                <form onSubmit={handleSubmit} className="form" encType='multipart/form-data'>
                    <label>Nom :
                        <input onChange={(e) => setNom(e.target.value)} value={nom} type="text" required/>
                    </label>
                    <label>Roman : 
                        <select onChange={(e) => setRoman(e.target.value)} value={roman}>
                            <option>-----</option>
                            {romans.map((appartenance, i) => {
                                    return <option key={i}>{appartenance}</option>;
                            })}
                        </select>
                    </label>
                    <label>Appartenance : 
                        <select onChange={(e) => setAppartenance(e.target.value)} value={appartenance}>
                            <option>-----</option>
                            {appartenances.map((appartenance, i) => {
                                return <option key={i}>{appartenance}</option>;
                            })}
                        </select>
                    </label>
                    <label>Emplacement : 
                        <input onChange={(e) => setEmplacement(e.target.value)} value={emplacement} type="text" required/>
                    </label>
                    <label>Description : 
                        <input onChange={(e) => setDescription(e.target.value)} value={description} type="text" required/>
                    </label>
                    <label>Population : 
                        <input onChange={(e) => setPopulation(e.target.value)} value={population} type="number" required/>
                    </label>
                    <label>Image : 
                        <input onChange={handleFileUpload} placeholder={"image"} fileinput="multiple" type="file" required/>
                    </label>
                    <button>Modifier</button>
                </form>
            </div>
            <div className={"err-message"}>
            {message}
            </div>
        </article>
    );
};