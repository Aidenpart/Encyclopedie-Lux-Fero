import { useEffect, useState } from "react";

import {capitalizeFirstLetter, ReadAll, SortData, LatestData} from "./componentsBloc.js"
import { listDataCategories } from "../../../helpers/categories.js";
import "./blocsStyles.scss"


export const DataBloc = (props) => {
    const datas = props.datas;
    const dataType = props.dataType;
    const romanName = props.roman;


    return(
        <article className="data-bloc">
            <h1>Les {capitalizeFirstLetter(`${dataType}`)}</h1>
            <SortData datas={datas} type={dataType} roman={romanName}/>
            <ReadAll datas={datas} type={dataType}/>
        </article>
    );
};


export const LatestDataAdd = (props) => {
    const [categories, setCategories] = useState([listDataCategories])
    const roman = props.roman

    useEffect(() => {
        if(roman !== "")
            setCategories(listDataCategories.slice(0,-1))
    }, [setCategories, roman])

    return (
        <article className="latest-add">
            <p>Les dernières connaissances ajoutées à la base de données : </p>
            <table>
                <tbody>
                    {categories.map((categorie, i) => {
                        return (<LatestData type={categorie} key={i}/>)
                    })}
                </tbody>
            </table>
        </article>
    );
};