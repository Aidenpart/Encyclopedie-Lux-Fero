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


export const LatestDataAdd = () => {

    return (
        <article>
            <p>Les dernières données ajoutées : </p>
            <ul>
                {listDataCategories.map((categorie, i) => {
                    return (<LatestData type={categorie} key={i}/>)
                })}            
            </ul>
        </article>
    );
};