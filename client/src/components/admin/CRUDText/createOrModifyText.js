import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Loading } from "../../public/loading/loading.js";
import { getToken } from "../../../helpers/authHelpers.js";
import { listeRomans, listeDomaines } from "../../../helpers/categories.js";
import "../CRUDGeneral/generalCRUD.scss"


export const CreateOrModifyTextForm = ({ initialValues, onSubmit, isCreation, isFiche, id }) => {
    const navigate = useNavigate();
    const romans = listeRomans;
    
    const [roman, setRoman] = useState(initialValues.roman || '');
    const [domaine, setDomaine] = useState(initialValues.domaine || '');
    const [titre, setTitre] = useState(initialValues.titre || '');
    const [contenuPrincipal, setContenuPrincipal] = useState(initialValues.contenuPrincipal || '');
    const [titreSecondaire, setTitreSecondaire] = useState(initialValues.titreSecondaire || '');
    const [contenuSecondaire, setContenuSecondaire] = useState(initialValues.contenuSecondaire || '');
    const [remarque, setRemarque] = useState(initialValues.remarque || '');
    const [contenuRemarque,setContenuRemarque ] = useState(initialValues.contenuRemarque || '');

    const [nom, setNom] = useState(initialValues.nom || '');
    const [nombreDePages, setNombreDePages] = useState(initialValues.nombreDePages || '');
    const [nombreDeMots, setNombreDeMots] = useState(initialValues.nombreDeMots || '');
    const [nombreDeSEC, setNombreDeSEC] = useState('');
    const [nombreDeParties, setNombreDeParties] = useState('');
    const [nombreDeChapitres, setNombreDeChapitres] = useState('');
    const [isFini, setIsFini] = useState(false);
    
    const [message, setMessage] = useState('');
    const [token, setToken] = useState('');
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        setToken(getToken());
        setDataLoaded(true);
    }, [setDataLoaded, setToken, roman]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        if(!isFiche) {
            formData.append('nom', nom);
            formData.append('nombreDePages', nombreDePages);
            formData.append('nombreDeMots', nombreDeMots);
            formData.append('nombreDeSEC', nombreDeSEC);
            formData.append('nombreDeParties', nombreDeParties);
            formData.append('nombreDeChapitres', nombreDeChapitres);
            formData.append('isFini', isFini);        
        }else {
            formData.append('roman', roman);
            formData.append('domaine', domaine);
            formData.append('titre', titre);
            formData.append('contenuPrincipal', contenuPrincipal);
            formData.append('titreSecondaire', titreSecondaire);
            formData.append('contenuSecondaire', contenuSecondaire);
            formData.append('remarque', remarque);
            formData.append('contenuRemarque', contenuRemarque);                  
        };

        try {
            if(!isFiche)
                await onSubmit("roman", token, formData, id)
                .then((response) => { 
                    navigate(`/admin`);
                }) 
            else
                await onSubmit("fiche", token, formData, id)
                .then((response) => { 
                    navigate(`/admin`);
                })
        } catch (error) {
            console.log(error)
            setMessage(error.message);
        };
    };



    if (!dataLoaded)
        return <Loading />;

    return (
        <article className="CRUD">
            <h3>{isCreation ? "Créer" : "Modifier"}</h3>
            <div>
                <form className="formulaire" onSubmit={handleSubmit} encType='multipart/form-data'>
                    {isFiche && <>
                        <label>Domaine :
                            <select onChange={(e) => setDomaine(e.target.value)} value={domaine} required>
                                <option>-----</option>
                                {listeDomaines.map((nature, i) => {
                                    return <option key={i}>{nature}</option>;
                                })}
                            </select>
                        </label>                        
                        <label>Titre Principal :
                            <input onChange={(e) => setTitre(e.target.value)} value={titre} type="text" required />
                        </label>
                        <label>Contenu Principal :
                            <input onChange={(e) => setContenuPrincipal(e.target.value)} value={contenuPrincipal} type="text" required />
                        </label>
                        <label>Titre Secondaire :
                            <input onChange={(e) => setTitreSecondaire(e.target.value)} value={titreSecondaire} type="text" required />
                        </label>
                        <label>Contenu Secondaire :
                            <input onChange={(e) => setContenuSecondaire(e.target.value)} value={contenuSecondaire} type="text" required />
                        </label>
                        <label>Remarque :
                            <input onChange={(e) => setRemarque(e.target.value)} value={remarque} type="text" required />
                        </label>
                        <label>Contenu Remarque :
                            <input onChange={(e) => setContenuRemarque(e.target.value)} value={contenuRemarque} type="text" required />
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
                            <select onChange={(e) => setIsFini(e.target.value)} value={isFini} required>
                                <option>Achevé</option>
                                <option>Inachevé</option>
                            </select>
                        </label>
                    </>}
                    <button>{isCreation ? "Créer" : "Modifier"}</button>
                </form>
            </div>
            <div>
                {message}
            </div>
        </article>
    );
};