import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Loading } from "../../public/loading/loading.js";
import { InputTextOrTextarea, InputList } from "./componentsCRUD.js";
import { getToken } from "../../../helpers/authHelpers.js";
import { listeDetailsCRUD, listeDomaines } from "../../../helpers/categories.js";
import "./generalCRUD.scss"


export const CreateOrModifyTextForm = ({ initialValues, onSubmit, isCreation, isFiche, id }) => {
    const navigate = useNavigate();
    const romans = listeDetailsCRUD.romans;
    const [roman, setRoman] = useState("");
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

        if (roman === "-----" || roman === "" || (isFiche && (domaine === "-----" || domaine === ""))) {
            setMessage("Veuillez sélectionner une valeur valide le roman et/ou le domaine.");
            return;
        }

        const formData = new FormData();
        if(!isFiche) {
            formData.append("nom", nom);
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
                        <InputTextOrTextarea 
                            label={"Titre Principal"} 
                            value={titre} 
                            onChange={(e) => setTitre(e.target.value)} 
                        />
                        <InputTextOrTextarea 
                            label={"Contenu Principal"} 
                            value={contenuPrincipal} 
                            onChange={(e) => setContenuPrincipal(e.target.value)} 
                            isTextArea={true}
                        />
                        <InputTextOrTextarea 
                            label={"Titre Secondaire"} 
                            value={titreSecondaire} 
                            onChange={(e) => setTitreSecondaire(e.target.value)} 
                        />
                        <InputTextOrTextarea 
                            label={"Contenu Secondaire"} 
                            value={contenuSecondaire} 
                            onChange={(e) => setContenuSecondaire(e.target.value)} 
                            isTextArea={true}
                        />
                        <InputTextOrTextarea 
                            label={"Remarque"} 
                            value={remarque} 
                            onChange={(e) => setRemarque(e.target.value)}
                        />  
                        <InputTextOrTextarea 
                            label={"Contenu Remarque"} 
                            value={contenuRemarque} 
                            onChange={(e) => setContenuRemarque(e.target.value)} 
                            isTextArea={true}
                        />
                        <InputList 
                            label={"Roman"} 
                            value={roman} 
                            onChange={(e) => setRoman(e.target.value)} 
                            list={romans}
                        />
                    </>}
                    {!isFiche && <>
                        <InputTextOrTextarea 
                            label={"Nom"} 
                            value={nom} 
                            onChange={(e) => setNom(e.target.value)} 
                        />  
                        <InputTextOrTextarea 
                            label={"Resumé"} 
                            value={resume} 
                            onChange={(e) => setResume(e.target.value)} 
                            isTextArea={true}
                        />
                        <InputTextOrTextarea 
                            label={"Nombre de Pages"} 
                            value={nombreDePages} 
                            onChange={(e) => setNombreDePages(e.target.value)} 
                        />  
                        <InputTextOrTextarea 
                            label={"Nombre de Mots"} 
                            value={nombreDeMots} 
                            onChange={(e) => setNombreDeMots(e.target.value)} 
                        /> 
                        <InputTextOrTextarea 
                            label={"Nombre de Signes, Espaces Compris"} 
                            value={nombreDeSEC} 
                            onChange={(e) => setNombreDeSEC(e.target.value)} 
                        /> 
                        <InputTextOrTextarea 
                            label={"Nombre de Parties"} 
                            value={nombreDeParties} 
                            onChange={(e) => setNombreDeParties(e.target.value)} 
                        /> 
                        <InputTextOrTextarea 
                            label={"Nombre de Chapitres"} 
                            value={nombreDeChapitres} 
                            onChange={(e) => setNombreDeChapitres(e.target.value)} 
                        />                                                                                                                       
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