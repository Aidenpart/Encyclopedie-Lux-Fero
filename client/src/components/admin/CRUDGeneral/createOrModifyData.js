import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { InputTextOrTextarea, InputList, InputNumber } from "./componentsCRUD.js";
import { Loading } from "../../public/loading/loading.js";
import { getToken } from "../../../helpers/authHelpers.js";
import { listeNatures, listeDetailsCRUD, listeAppartenances, listeSpecs, listeDemeures } from "../../../helpers/categories.js";
import "./generalCRUD.scss"


export const CreateOrModifyDataForm = ({ initialValues, onSubmit, isCreation, isPersonnage, id, dataCategory }) => {
    const navigate = useNavigate();
    const romans = listeSpecs.romans;
    const nombreDeCaracteresLieu = 200;
    const nombreDeCaracteresPersonnage = 120;
    const [nombreDeCaracteresRestants, setNombreDeCaracteresRestants] = useState("")
    const [nom, setNom] = useState(initialValues.nom || "");
    const [roman, setRoman] = useState("");

    const [emplacement, setEmplacement] = useState(initialValues.emplacement || "");
    const [description, setDescription] = useState(initialValues.description || "");
    const [population, setPopulation] = useState(initialValues.population || "");

    const [titrePrincipal, setTitrePrincipal] = useState(initialValues.titrePrincipal || "");
    const [titresSecondaires, setTitresSecondaires] = useState(initialValues.titresSecondaires || "");
    const [sexe, setSexe] = useState(initialValues.sexe || "");
    const [attirance, setAttirance] = useState(initialValues.attirance || "");
    const [domaineSpecialite, setDomaineSpecialite] = useState("");
    const [specialite, setSpecialite] = useState("");
    const [sousSpecialite, setSousSpecialite] = useState(initialValues.specialite || "");
    const [image, setImage] = useState("");

    const [appartenances, setAppartenances] = useState([]);
    const [appartenance, setAppartenance] = useState("");
    const [nature, setNature] = useState(initialValues.nature || "");
    const [natures, setNatures] = useState([]);
    const [demeure, setDemeure] = useState(initialValues.demeure || "");
    const [demeures, setDemeures] = useState([]);


    const [message, setMessage] = useState("");
    const [token, setToken] = useState("");
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        if (initialValues.roman === "Lux Fero" || roman === "Lux Fero") {
            setAppartenances(listeAppartenances.LuxFero);
        }else if (initialValues.roman === "Regina Magicae" || roman === "Regina Magicae") {
            setAppartenances(listeAppartenances.ReginaMagicae);
        }else 
            setAppartenances(["-----"]);

        setToken(getToken());
        setDataLoaded(true);
    }, [initialValues, setDataLoaded, setToken, setAppartenances, roman]);



    useEffect(() => {

        switch (appartenance) {
            case "Cieux":
                setNatures(listeNatures.Cieux)
                setDemeures(listeDemeures.Cieux)
                break;
            case "Enfer":
                setNatures(listeNatures.Enfer)
                setDemeures(listeDemeures.Enfer)
                break;
            case "Humanité":
                setNatures(listeNatures.Humanite)
                setDemeures(listeDemeures.Humanite)
                break;
            case "Mages":
                setNatures(listeNatures.Mages)
                setDemeures(listeDemeures.Mages)
                break;              
            case "Autres":
                setNatures(listeNatures.Autres)
                setDemeures(listeDemeures.Autres)
                break;                                
            default:
                setNatures([""])
                break;
        }

        setSpecialite(`${domaineSpecialite} - ${sousSpecialite}`)
    }, [appartenance, domaineSpecialite, sousSpecialite, setNatures]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (roman === "-----" || roman === "" || appartenance === "-----" || appartenance === "" || (isPersonnage && (nature === "-----" || sexe === "-----" || attirance === "-----"))) {
            setMessage("Veuillez au moins sélectionner une valeur valide pour le roman et l'appartenance.");
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
                    <InputTextOrTextarea 
                        label={"Nom"} 
                        value={nom} 
                        onChange={(e) => setNom(e.target.value)} 
                    />  
                    <InputList 
                        label={"Roman"} 
                        value={roman} 
                        onChange={(e) => setRoman(e.target.value)}
                        list={romans} 
                    />
                    <InputList 
                        label={"Appartenance"} 
                        value={appartenance} 
                        onChange={(e) => setAppartenance(e.target.value)}
                        list={appartenances} 
                    />  
                    {isPersonnage && <>
                        <InputList 
                            label={"Nature"} 
                            value={nature} 
                            onChange={(e) => setNature(e.target.value)}
                            list={natures} 
                        />
                        <InputList 
                            label={"Demeure"} 
                            value={demeure} 
                            onChange={(e) => setDemeure(e.target.value)}
                            list={demeures} 
                        />                          
                        <InputTextOrTextarea 
                            label={"Titre Principal"} 
                            value={titrePrincipal} 
                            onChange={(e) => setTitrePrincipal(e.target.value)} 
                        />
                        <InputTextOrTextarea 
                            label={"Titres Secondaires"} 
                            value={titresSecondaires} 
                            onChange={(e) => setTitresSecondaires(e.target.value)} 
                        />
                        <InputList 
                            label={"Sexe"} 
                            value={sexe} 
                            onChange={(e) => setSexe(e.target.value)}
                            list={listeDetailsCRUD.sexes} 
                        />  
                        <InputList 
                            label={"Attirance"} 
                            value={attirance} 
                            onChange={(e) => setAttirance(e.target.value)}
                            list={listeDetailsCRUD.attirances} 
                        />                       
                        <InputList 
                            label={"Domaine de Spécialité"} 
                            value={domaineSpecialite} 
                            onChange={(e) => setDomaineSpecialite(e.target.value)}
                            list={listeDetailsCRUD.domainesSpecialites} 
                        /> 
                        <InputTextOrTextarea 
                            label={"Spécialité"} 
                            value={sousSpecialite} 
                            onChange={(e) => setSousSpecialite(e.target.value)} 
                        />
                    </>}
                    {!isPersonnage && <>
                        <InputTextOrTextarea 
                            label={"Emplacement"} 
                            value={emplacement} 
                            onChange={(e) => setEmplacement(e.target.value)} 
                        />
                        <InputNumber 
                            label={"Population"} 
                            value={population} 
                            onChange={(e) => setPopulation(e.target.value)} 
                        />
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