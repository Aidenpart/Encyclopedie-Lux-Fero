/*
idée ChatGPT pour rendre le formulaire de lieu en composant,
pour l'adapter en fonction de création ou de modification.

nécéssiterait de refactoriser la fonction onSubmit, 
pour qu'elle colle en fonction de la création ou de la modification du lieu
*/




import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Loading } from "../../../components/public/loading/loading.js";
import { getToken } from "../../../helpers/authHelpers.js";
import { listeRomans, appartenancesLuxFero, appartenancesReginaMagicae } from "../../../helpers/categories.js";

export const LieuForm = ({ initialValues, onSubmit, isCreation }) => {
    const navigate = useNavigate();
    const [nom, setNom] = useState(initialValues.nom || '');
    const [roman, setRoman] = useState(initialValues.roman || '');
    const romans = listeRomans;
    const [appartenances, setAppartenances] = useState([]);
    const [appartenance, setAppartenance] = useState(initialValues.appartenance || '');
    const [emplacement, setEmplacement] = useState(initialValues.emplacement || '');
    const [description, setDescription] = useState(initialValues.description || '');
    const [population, setPopulation] = useState(initialValues.population || '');
    const [image, setImage] = useState('');
    const [message, setMessage] = useState('');
    const [token, setToken] = useState('');
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        // Set default values for fields if initialValues are provided
        if (initialValues.roman === "Lux Fero" || roman === "Lux Fero") {
            setAppartenances(appartenancesLuxFero);
        } else if (initialValues.roman === "Regina Magicae" || roman === "Regina Magicae") {
            setAppartenances(appartenancesReginaMagicae);
        } else {
            setAppartenances([]);
        }

        setToken(getToken());
        setDataLoaded(true);
    }, [initialValues, setDataLoaded, setToken, setAppartenances, roman]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('nom', nom);
        formData.append('roman', roman);
        formData.append('appartenance', appartenance);
        formData.append('emplacement', emplacement);
        formData.append('description', description);
        formData.append('population', population);
        formData.append('image', image);

        try {
            await onSubmit("lieu", token, formData);
            navigate("/admin");
        } catch (error) {
            console.log(error);
            setMessage(error);
        }
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    if (!dataLoaded)
        return <Loading />;

    return (
        <article className="update">
            <h3>{isCreation ? "Créer un lieu" : "Modifier le lieu"}</h3>
            <div className="div-form">
                <form onSubmit={handleSubmit} className="form" encType='multipart/form-data'>
                    <label>Nom :
                        <input onChange={(e) => setNom(e.target.value)} value={nom} type="text" required />
                    </label>
                    <label>Roman :
                        <select onChange={(e) => setRoman(e.target.value)} value={roman}>
                            <option>-----</option>
                            {romans.map((roman, i) => {
                                return <option key={i}>{roman}</option>;
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
                        <input onChange={(e) => setEmplacement(e.target.value)} value={emplacement} type="text" required />
                    </label>
                    <label>Description :
                        <input onChange={(e) => setDescription(e.target.value)} value={description} type="text" required />
                    </label>
                    <label>Population :
                        <input onChange={(e) => setPopulation(e.target.value)} value={population} type="number" required />
                    </label>
                    <label>Image :
                        <input onChange={handleFileUpload} placeholder={"image"} fileinput="multiple" type="file" />
                    </label>
                    <button>{isCreation ? "Créer" : "Modifier"}</button>
                </form>
            </div>
            <div className={"err-message"}>
                {message}
            </div>
        </article>
    );
};
