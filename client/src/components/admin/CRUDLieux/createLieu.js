import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';


import { URL } from "../../../helpers/urlHelpers.js";
import { appartenancesLuxFero, appartenancesReginaMagicae, listeRomans } from "../../../helpers/categories.js";
import { Loading } from "../../../components/public/loading/loading.js";
import { getToken } from "../../../helpers/authHelpers.js";


export const CreateLieu = () =>{
    
    const navigate = useNavigate();    
    const [nom, setNom] = useState('');
    const [roman, setRoman] = useState('');
    const romans = listeRomans
    const [appartenances, setAppartenances] = useState([]);
    const [appartenance, setAppartenance] = useState('');
    const [emplacement, setEmplacement] = useState('');
    const [description, setDescription] = useState('');
    const [population, setPopulation] = useState('');
    const [image, setImage] = useState('');
    const [message, setMessage] = useState('');
    const [token, setToken] = useState('');
    const [dataLoaded, setDataLoaded] = useState(false);
    
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
 
        fetch(`${URL}/admin/create-lieu`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`
            },
            body: formData
        })
        .then((data) => {
            navigate("/admin"); 
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
        <article>
            <h3>Créer un lieu</h3>
            <div>
                <form onSubmit={handleSubmit} encType='multipart/form-data'>
                    <label>Nom : 
                        <input onChange={(e) => setNom(e.target.value)} value={nom} placeholder={"nom"} type="text"/>
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
                        <input onChange={(e) => setEmplacement(e.target.value)} value={emplacement} placeholder={"emplacement"} type="text"/>
                    </label>
                    <label>Description : 
                        <input onChange={(e) => setDescription(e.target.value)} value={description} placeholder={"description"} type="text"/>
                    </label>
                    <label>Population :
                        <input onChange={(e) => setPopulation(e.target.value)} value={population} placeholder={"population"} type="number"/>
                    </label>
                    <label>Image :
                        <input onChange={handleFileUpload} placeholder={"image"} fileinput="multiple" type="file" />
                    </label>
                    <button>Créer un lieu</button>
                </form>
            </div>
            <div>
            {message}
            </div>
        </article>
    );
};