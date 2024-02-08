import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';


import { URL } from "../../../helpers/urlHelpers.js";
import { appartenancesPersonnages } from "../categories.js";
import { Loading } from "../../../components/shared/loading/loading.js";
import { getToken } from "../../../helpers/authHelpers.js";
import "../adminComponentsStyles.scss";


export const CreatePersonnage = () =>{
    
    const navigate = useNavigate();    
    const [token, setToken] = useState('');
    const [nom, setNom] = useState('');
    const [appartenance, setAppartenance] = useState('');
    const appartenances = appartenancesPersonnages;
    const [titre, setTitre] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [message, setMessage] = useState('');
    const [dataLoaded, setDataLoaded] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
       
        const formData = new FormData(); 

        formData.append('nom', nom);
        formData.append('appartenance', appartenance);
        formData.append('titre', titre);
        formData.append('description', description);
        formData.append('image', image);
 
        fetch(`${URL}/admin/create-personnage`, {
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
        setToken(getToken());
        setDataLoaded(true);
    }, [setToken, setDataLoaded]);
    
    
    if (!dataLoaded)
        return <Loading />;
    
    return (
        <article className="article-CRUD">
            <h3>Créer un personnage</h3>
            <div className="div-form-admin">
                <form onSubmit={handleSubmit} className="form" encType='multipart/form-data'>
                    <label>Nom : </label>
                        <input onChange={(e) => setNom(e.target.value)} value={nom} placeholder={"nom"} type="text" required/>
                    <label>Appartenance : </label>
                        <select onChange={(e) => setAppartenance(e.target.value)} value={appartenance} required>
                            <option>-----</option>
                            {appartenances.map((appartenance, i) => {
                                return <option key={i}>{appartenance}</option>;
                            })
                            }
                        </select>
                    <label>Titre :</label>
                        <input onChange={(e) => setTitre(e.target.value)} value={titre} placeholder={"titre"} type="text" required/>
                    <label>Description :</label>
                        <input onChange={(e) => setDescription(e.target.value)} value={description} placeholder={"description"} type="text" required/>
                    <label>Image : </label>
                        <input onChange={handleFileUpload} fileinput="multiple" type="file" required/>
                        <p className="spec-images">Utiliser un fichier de dimension 308px de large et 564px de haut, ou un multiple supérieur</p>
                    <button>Créer un personnage</button>
                </form>
            </div>
            <div className={"err-message"}>
            {message}
            </div>
        </article>
    );
};