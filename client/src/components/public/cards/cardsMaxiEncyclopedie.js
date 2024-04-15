import { useState, useEffect } from "react";

import { Loading } from "../loading/loading";
import { filteredDataByRoman } from "../../../helpers/dataHelpers";
import "./cardsStyles.scss";


export const CardsRoman = (props) => {
    const roman = props.roman;
    const [dataLoaded, setDataLoaded] = useState(false);
    const [dataRoman, setDataRoman] = useState();

    useEffect(() => {
        filteredDataByRoman(roman._id)
        .then((response) => {
            setDataRoman(response)
            setDataLoaded(true);
        })
        .catch((err) => {
            console.log(err);
        });

        console.log(roman)
    }, [dataLoaded, roman, setDataRoman]);


    if(!dataLoaded)
        return <Loading />;

    return (
        <article >
            <h1>{roman.nom}</h1>
            <h2>Les données</h2>
            <ul>
                {Object.keys(roman).map((key) => (
                    <li key={key}><span className="">{key} :</span> {roman[key]}</li>
                ))}
            </ul>
            <h2>Les lieux</h2>
            <ul>
                {dataRoman.lieux.map((lieu) => {
                    return <li>{lieu.nom}</li>
                })}
            </ul>
            <h2>Les données</h2>
            <ul>Les personnages
                {dataRoman.personnages.map((personnage) => {
                    return <li>{personnage.nom}</li>
                })}
            </ul>
        </article>
    )
};


export const CardResumeGeneric = (props) => {
    const type = props.type;
    const data = props.datas;
    const [dataLoaded, setDataLoaded] = useState(false);
    const [dataRoman, setDataRoman] = useState();

    useEffect(() => {
        if(type === "romans") {
            filteredDataByRoman(data._id)
            .then((response) => {
                setDataRoman(response)
                setDataLoaded(true);
            })
            .catch((err) => {
                console.log(err);
            });        
        }else
            setDataLoaded(true)
        
    }, [dataLoaded, data._id, setDataRoman, type]);


    if(!dataLoaded)
        return <Loading />;

    return (
        <article className="card-generic">
            <div>
                {Object.keys(data).map((key) => (
                    <p key={key}><span className="key">{key.toLocaleUpperCase()}</span><span className="data">{data[key]}</span></p>
                ))}
            </div>
            {dataRoman &&
                <>
                    <h2>Les lieux</h2>
                    <ul>
                        {dataRoman.lieux.map((lieu) => {
                            return <li>{lieu.nom}</li>
                        })}
                    </ul>
                    <h2>Les personnages</h2>
                    <ul> 
                        {dataRoman.personnages.map((personnage) => {
                            return <li>{personnage.nom}</li>
                        })}
                    </ul>
                </> 
            }
        </article>
    )
};