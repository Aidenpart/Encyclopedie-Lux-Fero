import { useState, useEffect } from "react";
import { Loading } from "../../public/loading/loading.js";
import { getToken } from "../../../helpers/authHelpers.js";
import { listeRomans, appartenancesLuxFero, appartenancesReginaMagicae } from "../../../helpers/categories.js";
import "./generalCRUD.scss"


export const CreateOrModifyForm = ({ initialValues, onSubmit, isCreation, isPersonnage, id }) => {
    const romans = listeRomans;
    const nombreDeCaracteres = 300;
    const [nombreDeCaracteresRestants, setNombreDeCaracteresRestants] = useState(300)
    
    const [nom, setNom] = useState(initialValues.nom || '');
    const [roman, setRoman] = useState(initialValues.roman || '');
    const [appartenances, setAppartenances] = useState([]);
    const [appartenance, setAppartenance] = useState(initialValues.appartenance || '');
    const [emplacement, setEmplacement] = useState(initialValues.emplacement || '');
    const [description, setDescription] = useState(initialValues.description || '');
    const [population, setPopulation] = useState(initialValues.population || '');
    const [demeure, setDemeure] = useState(initialValues.demeure || '');
    const [titrePrincipal, setTitrePrincipal] = useState(initialValues.titrePrincipal || '');
    const [titresSecondaires, setTitresSecondaires] = useState(initialValues.titresSecondaires || '');
    const [sexe, setSexe] = useState(initialValues.sexe || '');
    const [attirance, setAttirance] = useState(initialValues.attirance || '');
    const [specialite, setSpecialite] = useState(initialValues.specialite || '');
    const [sousSpecialite, setSousSpecialite] = useState(initialValues.sousSpecialite || '');
    const [image, setImage] = useState('');
    const [message, setMessage] = useState('');
    const [token, setToken] = useState('');
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
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
        formData.append('description', description);
        formData.append('image', image);
        if(!isPersonnage) {
            formData.append('emplacement', emplacement);
            formData.append('population', population);
        }else {
            formData.append('demeure', demeure);
            formData.append('titrePrincipal', titrePrincipal);
            formData.append('titresSecondaires', titresSecondaires);
            formData.append('sexe', sexe);
            formData.append('attirance', attirance);
            formData.append('specialite', specialite);
            formData.append('sousSpecialite', sousSpecialite);
        }

        try {
            if(!isPersonnage)
                await onSubmit("lieu", token, formData, id) 
            else
                await onSubmit("personnage", token, formData, id)
        } catch (error) {
            console.log(error)
            setMessage(error.message);
        }
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const handleDescription = (e) => {
        const description = e.target.value;
        setDescription(description)
        setNombreDeCaracteresRestants(nombreDeCaracteres-description.length)
    }

    if (!dataLoaded)
        return <Loading />;

    return (
        <article >
            <h3>{isCreation ? "Créer" : "Modifier"}</h3>
            <div>
                <form className="formulaire" onSubmit={handleSubmit} encType='multipart/form-data'>
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
                    {isPersonnage && <>
                        <label>Demeure :
                            <input onChange={(e) => setDemeure(e.target.value)} value={demeure} type="text" required />
                        </label>
                        <label>Titre Principal :
                            <input onChange={(e) => setTitrePrincipal(e.target.value)} value={titrePrincipal} type="text" required />
                        </label>
                        <label>Titres Secondaires :
                            <input onChange={(e) => setTitresSecondaires(e.target.value)} value={titresSecondaires} type="text" required />
                        </label>
                        <label>Sexe :
                            <input onChange={(e) => setSexe(e.target.value)} value={sexe} type="text" required />
                        </label>
                        <label>Attirance :
                            <input onChange={(e) => setAttirance(e.target.value)} value={attirance} type="text" required />
                        </label>
                        <label>Spécialité :
                            <input onChange={(e) => setSpecialite(e.target.value)} value={specialite} type="text" required />
                        </label>
                        <label>Sous-Spécialité :
                            <input onChange={(e) => setSousSpecialite(e.target.value)} value={sousSpecialite} type="text" required />
                        </label>
                    </>}
                    {!isPersonnage && <>
                        <label>Emplacement :
                            <input onChange={(e) => setEmplacement(e.target.value)} value={emplacement} type="text" required />
                        </label>
                        <label>Population :
                            <input onChange={(e) => setPopulation(e.target.value)} value={population} type="number" required />
                        </label>
                    </>}
                    <label>Description :
                        <div>
                            <textarea onChange={handleDescription} value={description} cols={"23"} required />
                            <p className="caracteres-restants">Caractères restant : {nombreDeCaracteresRestants}</p>
                        </div>
                    </label>
                    <label>Image :
                        <input onChange={handleFileUpload} placeholder={"image"} fileinput="multiple" type="file" />
                    </label>
                    <button>{isCreation ? "Créer" : "Modifier"}</button>
                </form>
            </div>
            <div>
                {message}
            </div>
        </article>
    );
};