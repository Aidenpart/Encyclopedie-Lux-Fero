import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';


import { URL } from "../../../helpers/urlHelpers.js";
import { appartenancesLuxFero } from "../../../helpers/categories.js";
import { Loading } from "../../../components/public/loading/loading.js";
import { getToken } from "../../../helpers/authHelpers.js";


export const UpdatePersonnage = (props) =>{
    
    const navigate = useNavigate();    
    const [nom, setNom] = useState(props.personnage.nom);
    const [appartenance, setAppartenance] = useState(props.personnage.appartenance);
    const appartenances = appartenancesLuxFero;
    const [titre, setTitre] = useState(props.personnage.titre);
    const [description, setDescription] = useState(props.personnage.description);
    const [image, setImage] = useState('');
    const [message, setMessage] = useState('');
    const id = props.id;
    const [token, setToken] = useState('');
    const [dataLoaded, setDataLoaded] = useState(false);
    
    const handleSubmit = (e) => {
        e.preventDefault();
       
        const formData = new FormData();
        
        formData.append('nom', nom);
        formData.append('appartenance', appartenance);
        formData.append('titre', titre);
        formData.append('description', description);
        formData.append('image', image);

        fetch(`${URL}/admin/update-personnage/${id}`, {
                method: 'POST',
                headers: {
                  'Authorization': `Bearer ${token}`
                },
                body: formData
        })
        .then((data) => {
            navigate("/admin/CRUD-Personnages");
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
        setToken(getToken());
        setDataLoaded(true);
    }, [setToken, setDataLoaded]);
    
    if (!dataLoaded)
        return <Loading />;    
    
    return (
        <article className="update">
            <h3>Modifier le personnage</h3>
            <div className="div-form">
                <form onSubmit={handleSubmit} className="form" encType='multipart/form-data'>
                    <label>Nom :</label>
                        <input onChange={(e) => setNom(e.target.value)} value={nom} type="text"/>
                    <label>Appartenance : </label>
                        <select onChange={(e) => setAppartenance(e.target.value)} value={appartenance}>
                            {appartenances.map((appartenance, i) => {
                                return <option key={i}>{appartenance}</option>;
                            })
                            }
                        </select>
                    <label>Titre :</label>
                        <input onChange={(e) => setTitre(e.target.value)} value={titre} type="text"/>
                    <label>Description :</label>
                        <input onChange={(e) => setDescription(e.target.value)} value={description} type="text"/>
                    <label>Images :</label>
                        <input onChange={handleFileUpload} placeholder={"image"} fileinput="multiple" type="file" />
                    <button>Modifier</button>
                </form>
            </div>
            <div className="err-message">
            {message}
            </div>
        </article>
    );
};