import { useEffect, useState } from "react";

import { readData } from "../../../helpers/dataHelpers.js";
import {capitalizeFirstLetter, ReadAll, SortData, LatestData} from "./componentsBloc.js"
import { listDataCategories } from "../../../helpers/categories.js";
import "./blocsStyles.scss"


export const DataBloc = (props) => {
    const [datas, setDatas] = useState([]);
    const dataType = props.dataType;
    const roman = props.roman;

    useEffect(() => {
        readData(dataType)
        .then((response) => {
            setDatas(response.filter((data) => data.roman === roman.id))
        })
        .catch((err) => {
            console.log(err);
        });
    }, [roman.id, dataType, datas.length])

    return(
        <article className="data-bloc">
            <h1>Les {capitalizeFirstLetter(`${dataType}`)}</h1>
                {datas.length !== 0 ?
                    <>
                        <p>Il y a actuellement {`${datas.length} ${datas.length !== 1 ? dataType: dataType.slice(0, -1)}`} dans cette encyclopédie.</p>
                        <SortData datas={datas} type={dataType} roman={roman.nom}/>
                        <ReadAll datas={datas} type={dataType}/>
                    </>
                    : <p>Il n'y a pas encore de {dataType} dans cette encyclopédie.</p>
                }        
        </article>
    );
};


export const LatestDataAdd = (props) => {
    const [categories, setCategories] = useState(listDataCategories);
    const [classDesktop, setClassDesktop] = useState("");
    const roman = props.roman;

    useEffect(() => {
        props.isDesktop ?
            setClassDesktop("latest-add-desktop")
            : setClassDesktop("")

        if(roman === undefined)
            setCategories(listDataCategories)
        else
            setCategories(listDataCategories.slice(0,-1))
    }, [setCategories, roman, props.isDesktop])

    return (
        <article className={`latest-add ${classDesktop}`}>
            <h1>Derniers ajouts de l'encyclopédie</h1>
            <table>
                <tbody>
                    {categories.map((categorie, i) => {
                        return (<LatestData type={categorie} key={i} roman={roman}/>)
                    })}
                </tbody>
            </table>
        </article>
    );
};