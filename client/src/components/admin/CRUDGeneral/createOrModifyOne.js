import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Loading } from "../../public/loading/loading.js";
import { getToken } from "../../../helpers/authHelpers.js";
import { listeNatures, listSexes, listeRomans, listeDomaines, appartenancesLuxFero, appartenancesReginaMagicae, listAttirances } from "../../../helpers/categories.js";
import "./generalCRUD.scss"


export const CreateOrModifyDataForm = ({ initialValues, onSubmit, isCreation, isPersonnage, id, dataCategory }) => {
    const navigate = useNavigate();
    const romans = listeRomans;
    const nombreDeCaracteresLieu = 200;
    const nombreDeCaracteresPersonnage = 100;
    const [nombreDeCaracteresRestants, setNombreDeCaracteresRestants] = useState("")
    const [nom, setNom] = useState(initialValues.nom || "");
    const [roman, setRoman] = useState(initialValues.roman || "");
    const [appartenances, setAppartenances] = useState([]);
    const [appartenance, setAppartenance] = useState(initialValues.appartenance || "");
    const [emplacement, setEmplacement] = useState(initialValues.emplacement || "");
    const [description, setDescription] = useState(initialValues.description || "");
    const [population, setPopulation] = useState(initialValues.population || "");
    const [natures, setNatures] = useState([]);
    const [nature, setNature] = useState(initialValues.nature || "");
    const [demeure, setDemeure] = useState(initialValues.demeure || "");
    const [titrePrincipal, setTitrePrincipal] = useState(initialValues.titrePrincipal || "");
    const [titresSecondaires, setTitresSecondaires] = useState(initialValues.titresSecondaires || "");
    const [sexe, setSexe] = useState(initialValues.sexe || "");
    const [attirance, setAttirance] = useState(initialValues.attirance || "");
    const [specialite, setSpecialite] = useState(initialValues.specialite || "");
    const [sousSpecialite, setSousSpecialite] = useState(initialValues.sousSpecialite || "");
    const [image, setImage] = useState("");
    const [message, setMessage] = useState("");
    const [token, setToken] = useState("");
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
                setNatures(listeNatures.Cieux)
                break;
            case "Enfer":
                setNatures(listeNatures.Enfer)
                break;
            case "Humanité":
                setNatures(listeNatures.Humanite)
                break;
            case "Mages":
                setNatures(listeNatures.Mages)
                break;              
            case "Autres":
                setNatures(listeNatures.Autres)
                break;                                
            default:
                setNatures([""])
                break;
        }
    }, [appartenance, setNatures]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (roman === "-----" || appartenance === "-----" || (isPersonnage && (nature === "-----" || sexe === "-----" || attirance === "-----"))) {
            setMessage("Veuillez sélectionner une valeur valide pour tous les champs.");
            return;
        }

        const formData = new FormData();
        formData.append("nom", nom);
        formData.append("roman", roman);
        formData.append("appartenance", appartenance);
        formData.append("description", description);
        formData.append("image", image);
        if(!isPersonnage) {
            formData.append("emplacement", emplacement);
            formData.append("population", population);
        }else {
            formData.append("nature", nature);
            formData.append("demeure", demeure);
            formData.append("titrePrincipal", titrePrincipal);
            formData.append("titresSecondaires", titresSecondaires);
            formData.append("sexe", sexe);
            formData.append("attirance", attirance);
            formData.append("specialite", specialite);
            formData.append("sousSpecialite", sousSpecialite);
        };

        if(!isPersonnage) {
            await onSubmit("lieu", token, formData, id)
            .then((response) => { 
                isCreation? 
                navigate("/admin", {state: { dataCategory:dataCategory, isCreation:true, isPersonnage:dataCategory  }}) 
                : navigate("/admin/CRUD", {state: { dataCategory:dataCategory, isCreation:true, isPersonnage:dataCategory  }});
            })
            .catch((error) => {
                console.log(error)
                setMessage(error.message);
            }) 
        }else{
            await onSubmit("personnage", token, formData, id)
            .then((response) => {
                isCreation? 
                navigate("/admin", {state: { dataCategory:dataCategory, isCreation:true, isPersonnage:dataCategory  }}) 
                : navigate("/admin/CRUD", {state: { dataCategory:dataCategory, isCreation:true, isPersonnage:dataCategory  }});
            })
            .catch((error) => {
                console.log(error)
                setMessage(error.message);
            })
        }
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const handleDescription = (e) => {
        const description = e.target.value;
        setDescription(description)
        isPersonnage? setNombreDeCaracteresRestants(nombreDeCaracteresPersonnage-description.length) : setNombreDeCaracteresRestants(nombreDeCaracteresLieu-description.length)
    };

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
                            <input onChange={(e) => setTitresSecondaires(e.target.value)} value={titresSecondaires} type="text"  />
                        </label>
                        <label>Sexe :
                            <select onChange={(e) => setSexe(e.target.value)} value={sexe}>
                                <option>-----</option>
                                {listSexes.map((sexe, i) => {
                                    return <option key={i}>{sexe}</option>;
                                })}
                            </select>
                        </label>
                        <label>Attirance :
                            <select onChange={(e) => setAttirance(e.target.value)} value={attirance}>
                                    <option>-----</option>
                                    {listAttirances.map((attirance, i) => {
                                        return <option key={i}>{attirance}</option>;
                                    })}
                            </select>
                        </label>
                        <label>Spécialité :
                            <input onChange={(e) => setSpecialite(e.target.value)} value={specialite} type="text" required />
                        </label>
                        <label>Sous-Spécialité :
                            <input onChange={(e) => setSousSpecialite(e.target.value)} value={sousSpecialite} type="text" />
                        </label>
                    </>}
                    {!isPersonnage && <>
                        <label>Emplacement :
                            <input onChange={(e) => setEmplacement(e.target.value)} value={emplacement} type="text" required />
                        </label>
                        <label>Population :
                            <input onChange={(e) => setPopulation(e.target.value)} value={population} type="number" />
                        </label>
                    </>}
                    <label>Description :
                        <div>
                            <textarea onChange={handleDescription} value={description} cols={"23"} maxLength={isPersonnage? nombreDeCaracteresPersonnage : nombreDeCaracteresLieu} />
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
                <p className="error">{message}</p>
            </div>
        </article>
    );
};


export const CreateOrModifyTextForm = ({ initialValues, onSubmit, isCreation, isFiche, id }) => {
    const navigate = useNavigate();
    const romans = listeRomans;
    const [roman, setRoman] = useState(initialValues.roman || "");
    const [resume, setResume] = useState(initialValues.resume || "");
    const [domaine, setDomaine] = useState(initialValues.domaine || "");
    const [titre, setTitre] = useState(initialValues.titre || "");
    const [contenuPrincipal, setContenuPrincipal] = useState(initialValues.contenuPrincipal || "");
    const [titreSecondaire, setTitreSecondaire] = useState(initialValues.titreSecondaire || "");
    const [contenuSecondaire, setContenuSecondaire] = useState(initialValues.contenuSecondaire || "");
    const [remarque, setRemarque] = useState(initialValues.remarque || "");
    const [contenuRemarque,setContenuRemarque ] = useState(initialValues.contenuRemarque || "");
    const [nom, setNom] = useState(initialValues.nom || "");
    const [nombreDePages, setNombreDePages] = useState(initialValues.nombreDePages || "");
    const [nombreDeMots, setNombreDeMots] = useState(initialValues.nombreDeMots || "");
    const [nombreDeSEC, setNombreDeSEC] = useState(initialValues.nombreDeSEC || "");
    const [nombreDeParties, setNombreDeParties] = useState(initialValues.nombreDeParties || "");
    const [nombreDeChapitres, setNombreDeChapitres] = useState(initialValues.nombreDeChapitres || "");
    const [isFini, setIsFini] = useState(false);
    const [message, setMessage] = useState("");
    const [token, setToken] = useState("");
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        setToken(getToken());
        setDataLoaded(true);
    }, [setDataLoaded, setToken, roman]);

    const handleSubmit = async (e) => {
        e.preventDefault();


        if (roman === "-----" || domaine === "-----" ) {
            setMessage("Veuillez sélectionner une valeur valide pour tous les champs.");
            return;
        }

        const formData = new FormData();
        if(!isFiche) {
            formData.append(nom, nom);
            formData.append("resume", resume);
            formData.append("nombreDePages", nombreDePages);
            formData.append("nombreDeMots", nombreDeMots);
            formData.append("nombreDeSEC", nombreDeSEC);
            formData.append("nombreDeParties", nombreDeParties);
            formData.append("nombreDeChapitres", nombreDeChapitres);
            formData.append("isFini", isFini);        
        }else {
            formData.append("roman", roman);
            formData.append("domaine", domaine);
            formData.append("titre", titre);
            formData.append("contenuPrincipal", contenuPrincipal);
            formData.append("titreSecondaire", titreSecondaire);
            formData.append("contenuSecondaire", contenuSecondaire);
            formData.append("remarque", remarque);
            formData.append("contenuRemarque", contenuRemarque);                  
        };

        try {
            if(!isFiche)
                await onSubmit("roman", token, formData, id)
                .then((response) => { 
                    navigate("/admin");
                }) 
            else
                await onSubmit("fiche", token, formData, id)
                .then((response) => { 
                    navigate("/admin");
                })
        } catch (error) {
            console.log(error)
            setMessage(error.message);
        };
    };

    const handleStatus = (status) => {
        status.value === "Achevé" ?
            setIsFini(true) : setIsFini(false)
    };

    if (!dataLoaded)
        return <Loading />;

    return (
        <article className="CRUD">
            <h3>{isCreation ? "Créer" : "Modifier"}</h3>
            <div>
                <form className="formulaire" onSubmit={handleSubmit} encType="multipart/form-data">
                    {isFiche && <>
                        <label>Domaine :
                            <select onChange={(e) => setDomaine(e.target.value)} value={domaine} required>
                                <option>-----</option>
                                {listeDomaines.map((domaine, i) => {
                                    return <option key={i}>{domaine.domaine}</option>;
                                })}
                            </select>
                        </label>                        
                        <label>Titre Principal :
                            <input onChange={(e) => setTitre(e.target.value)} value={titre} type="text" required />
                        </label>
                        <label>Contenu Principal :
                            <textarea onChange={(e) => setContenuPrincipal(e.target.value)} value={contenuPrincipal} type="text" required />
                        </label>
                        <label>Titre Secondaire :
                            <input onChange={(e) => setTitreSecondaire(e.target.value)} value={titreSecondaire} type="text" required />
                        </label>
                        <label>Contenu Secondaire :
                            <textarea onChange={(e) => setContenuSecondaire(e.target.value)} value={contenuSecondaire} type="text" required />
                        </label>
                        <label>Remarque :
                            <input onChange={(e) => setRemarque(e.target.value)} value={remarque} type="text" />
                        </label>
                        <label>Contenu Remarque :
                            <textarea onChange={(e) => setContenuRemarque(e.target.value)} value={contenuRemarque} type="text" />
                        </label>
                        <label>Roman :
                            <select onChange={(e) => setRoman(e.target.value)} value={roman} required>
                                <option>-----</option>
                                {romans.map((roman, i) => {
                                    return <option key={i}>{roman}</option>;
                                })}
                            </select>
                        </label>
                    </>}
                    {!isFiche && <>
                        <label> Nom :
                            <input onChange={(e) => setNom(e.target.value)} value={nom} type="text" required />
                        </label>
                        <label>Resumé :
                            <textarea onChange={(e) => setResume(e.target.value)} value={resume} type="text" />
                        </label>
                        <label> Nombre de Pages:
                            <input onChange={(e) => setNombreDePages(e.target.value)} value={nombreDePages} type="text" required />
                        </label>
                        <label> Nombre de Mots:
                            <input onChange={(e) => setNombreDeMots(e.target.value)} value={nombreDeMots} type="text" required />
                        </label>
                        <label> Nombre de Signes, Espaces Compris :
                            <input onChange={(e) => setNombreDeSEC(e.target.value)} value={nombreDeSEC} type="text" required />
                        </label>
                        <label> Nombre de Parties :
                            <input onChange={(e) => setNombreDeParties(e.target.value)} value={nombreDeParties} type="text" required />
                        </label>
                        <label> Nombre de Chapitres :
                            <input onChange={(e) => setNombreDeChapitres(e.target.value)} value={nombreDeChapitres} type="text" required />
                        </label>
                        <label> Statut :
                            <select onChange={handleStatus}required>
                                <option>Achevé</option>
                                <option>Inachevé</option>
                            </select>
                        </label>
                    </>}
                    <button>{isCreation ? "Créer" : "Modifier"}</button>
                </form>
            </div>
            <div className="error">
                {message}
            </div>
        </article>
    );
};