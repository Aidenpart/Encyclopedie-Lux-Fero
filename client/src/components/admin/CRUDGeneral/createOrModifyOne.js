import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Loading } from "../../public/loading/loading.js";
import { getToken } from "../../../helpers/authHelpers.js";
import { listeRomans, appartenancesLuxFero, appartenancesReginaMagicae, naturesMages, naturesCelestes, naturesAutres, naturesInfernales } from "../../../helpers/categories.js";
import "./generalCRUD.scss"


export const CreateOrModifyDataForm = ({ initialValues, onSubmit, isCreation, isPersonnage, id, dataCategory }) => {
    const navigate = useNavigate();
    const romans = listeRomans;
    const nombreDeCaracteresLieu = 200;
    const nombreDeCaracteresPersonnage = 100;
    const [nombreDeCaracteresRestants, setNombreDeCaracteresRestants] = useState("")
    
    const [nom, setNom] = useState(initialValues.nom || '');
    const [roman, setRoman] = useState(initialValues.roman || '');
    const [appartenances, setAppartenances] = useState([]);
    const [appartenance, setAppartenance] = useState(initialValues.appartenance || '');
    const [emplacement, setEmplacement] = useState(initialValues.emplacement || '');
    const [description, setDescription] = useState(initialValues.description || '');
    const [population, setPopulation] = useState(initialValues.population || '');
    const [natures, setNatures] = useState([]);
    const [nature, setNature] = useState(initialValues.nature || '');
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
        }else if (initialValues.roman === "Regina Magicae" || roman === "Regina Magicae") {
            setAppartenances(appartenancesReginaMagicae);
        }else 
            setAppartenances(["-----"]);

        setToken(getToken());
        setDataLoaded(true);
    }, [initialValues, setDataLoaded, setToken, setAppartenances, roman]);

    useEffect(() => {
        switch (appartenance) {
            case "Cieux":
                setNatures(naturesCelestes)
                break;
            case "Enfer":
                setNatures(naturesInfernales)
                break;
            case "Humanité":
                setNatures(naturesAutres)
                break;
            case "Mages":
                setNatures(naturesMages)
                break;              
            case "Autres":
                setNatures(naturesAutres)
                break;                                
            default:
                setNatures([""])
                break;
        }
    }, [appartenance, setNatures]);


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
            formData.append('nature', nature);
            formData.append('demeure', demeure);
            formData.append('titrePrincipal', titrePrincipal);
            formData.append('titresSecondaires', titresSecondaires);
            formData.append('sexe', sexe);
            formData.append('attirance', attirance);
            formData.append('specialite', specialite);
            formData.append('sousSpecialite', sousSpecialite);
        };

        try {
            if(!isPersonnage)
                await onSubmit("lieu", token, formData, id)
                .then((response) => { 
                    navigate(`/admin`, {state: { dataCategory:dataCategory, isCreation:true, isPersonnage:dataCategory  }});
                }) 
            else
                await onSubmit("personnage", token, formData, id)
                .then((response) => { 
                    navigate(`/admin`, {state: { dataCategory:dataCategory, isCreation:true, isPersonnage:dataCategory  }});
                })
        } catch (error) {
            console.log(error)
            setMessage(error.message);
        };
    };

    const handleFileUpload = (e) => {
        console.log(e.target.files[0])
        const file = e.target.files[0];
        setImage(file);
    };

    const handleDescription = (e) => {
        const description = e.target.value;
        setDescription(description)
        isPersonnage? setNombreDeCaracteresRestants(nombreDeCaracteresPersonnage-description.length) : setNombreDeCaracteresRestants(nombreDeCaracteresLieu-description.length)
    }

    if (!dataLoaded)
        return <Loading />;

    return (
        <article className="CRUD">
            <h3>{isCreation ? "Créer" : "Modifier"}</h3>
            <div>
                <form className="formulaire" onSubmit={handleSubmit} encType='multipart/form-data'>
                    <label>Nom :
                        <input onChange={(e) => setNom(e.target.value)} value={nom} type="text" required />
                    </label>
                    <label>Roman :
                        <select onChange={(e) => setRoman(e.target.value)} value={roman} required>
                            <option>-----</option>
                            {romans.map((roman, i) => {
                                return <option key={i}>{roman}</option>;
                            })}
                        </select>
                    </label>
                    <label>Appartenance :
                        <select onChange={(e) => setAppartenance(e.target.value)} value={appartenance} required>
                            <option>-----</option>
                            {appartenances.map((appartenance, i) => {
                                return <option key={i}>{appartenance}</option>;
                            })}
                        </select>
                    </label>
                    {isPersonnage && <>
                        <label>Nature :
                            <select onChange={(e) => setNature(e.target.value)} value={nature} required>
                                <option>-----</option>
                                {natures.map((nature, i) => {
                                    return <option key={i}>{nature}</option>;
                                })}
                            </select>
                        </label>                        
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
                            <textarea onChange={handleDescription} value={description} cols={"23"} maxLength={isPersonnage? nombreDeCaracteresPersonnage : nombreDeCaracteresLieu} required />
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