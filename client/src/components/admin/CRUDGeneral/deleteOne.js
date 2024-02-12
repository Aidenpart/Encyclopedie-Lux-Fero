import { useState, useEffect } from "react";
import { useParams, useNavigate} from 'react-router-dom';

import { Loading } from "../../../components/public/loading/loading.js";
import { getToken } from "../../../helpers/authHelpers.js";
import { deleteData } from "../../../helpers/dataHelpers.js";


export const DeleteOne = (props) =>{
 
    const navigate = useNavigate(); 
    const { id } = useParams(); 
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [token, setToken] = useState('');
    const [dataLoaded, setDataLoaded] = useState(false);
    
    const handleDelete = () => {

        deleteData(props.text, token, id)
        .then((response) => { 
            navigate(`/admin/CRUD-${props.direction}`);
        })
        .catch((err) => {
            console.log(err);
        });
        setModalIsOpen(false);
    };
    
    useEffect(() => {
        setToken(getToken());
        setDataLoaded(true);
    }, [setToken]);
    
    if (!dataLoaded)
        return <Loading />;    
        
    return (
        <div className="delete">
            <h2>Supprimer le {props.text}</h2>
            {modalIsOpen && (
                <>
                    <button onClick={handleDelete}>Confirmer</button>
                    <button onClick={() => setModalIsOpen(false)}>Annuler</button>
                </>
            )}
            {!modalIsOpen && (<button onClick={() => setModalIsOpen(true)}>Supprimer</button>)}
        </div>    
    );
};