import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';


import { URL } from "../../../helpers/urlHelpers.js";
import { appartenancesLieux } from "../categories.js";
import { Loading } from "../../../components/shared/loading/loading.js";
import { getToken } from "../../../helpers/authHelpers.js";
import "../adminComponentsStyles.scss";


export const UpdateLieu = (props) =>{
    
    const navigate = useNavigate();
    const [nom, setNom] = useState(props.lieu.nom);
    const appartenances = appartenancesLieux;
    const [appartenance, setAppartenance] = useState(props.lieu.appartenance);
    const [emplacement, setEmplacement] = useState(props.lieu.emplacement);
    const [description, setDescription] = useState(props.lieu.description);
    const [population, setPopulation] = useState(props.lieu.population);
    const [images, setImages] = useState('');
    const [message, setMessage] = useState('');
    const [token, setToken] = useState('');
    const [dataLoaded, setDataLoaded] = useState(false);    
    const id = props.id;

    const handleSubmit = (e) => {
        e.preventDefault();
       
        const formData = new FormData(); 

        formData.append('nom', nom);
        formData.append('appartenance', appartenance);
        formData.append('emplacement', emplacement);
        formData.append('description', description);
        formData.append('population', population);
        formData.append('images', images);

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
        setImages(file);
    };

    useEffect(() => {
        setToken(getToken());
        setDataLoaded(true);
    }, [setToken]);
    
    
    if (!dataLoaded)
        return <Loading />;   
    
    return (
        <article className="update">
            <h3>Modifier le lieu</h3>
            <div className="div-form">
                <form onSubmit={handleSubmit} className="form" encType='multipart/form-data'>
                    <label>Nom :</label>
                        <input onChange={(e) => setNom(e.target.value)} value={nom} type="text" required/>
                    <label>Appartenance : </label>
                        <select onChange={(e) => setAppartenance(e.target.value)} value={appartenance} required>
                            <option disabled={true} selected>-----</option>
                            {appartenances.map((appartenance, i) => {
                                return <option key={i}>{appartenance}</option>;
                            })
                            }
                        </select>
                    <label>Emplacement : </label>
                        <input onChange={(e) => setEmplacement(e.target.value)} value={emplacement} type="text" required/>
                    <label>Description : </label>
                        <input onChange={(e) => setDescription(e.target.value)} value={description} type="text" required/>
                    <label>Population : </label>
                        <input onChange={(e) => setPopulation(e.target.value)} value={population} type="number" required/>
                    <label>Images : </label>
                        <input onChange={handleFileUpload} placeholder={"image"} fileinput="multiple" type="file" required/>
                    <button>Modifier</button>
                </form>
            </div>
            <div className={"err-message"}>
            {message}
            </div>
        </article>
    );
};