import { useState, useEffect } from "react";


import { URL } from "../../../helpers/urlHelpers.js";
import { CardsLieux } from "../../shared/cards/cardsLieux.js";
import { CardsPersonnages } from "../../shared/cards/cardsPersonnages.js";
import "../../admin/adminComponentsStyles.scss";


export const ReadAllAdmin = (props) => {

    const text = props.text;
    const [data, setData] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        fetch(`${URL}/wiki/${text}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((response) => response.json())
        .then((data) => {
            setData(data);
        })
        .catch((err) => {
            console.log(err);
        });
    }, [text, setData]);

    const handleClick = () => {
        setModalIsOpen(false);
    };
    
    return (
        <section className="article-CRUD">
            <h3>Voir les {text}</h3>
            {modalIsOpen && (
                <div className="div-cards">
                    <button onClick={handleClick}>Cacher</button>
                    <div className="card-section">
                        { text === "lieux" ? 
                        <CardsLieux lieux={data}/> 
                        : 
                        <CardsPersonnages personnages={data}/>
                        }    
                    </div>
                </div>
            )}
            {!modalIsOpen && (<button onClick={() => setModalIsOpen(true)}>Afficher tous les {text}</button>)}
        </section>
    );
};