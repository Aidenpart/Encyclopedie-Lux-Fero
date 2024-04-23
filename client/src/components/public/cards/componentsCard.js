import { useState, useEffect } from "react";

import { Loading } from "../loading/loading";
import { CardsPersonnages, CardsLieux, CardsFiche, CardsRoman } from "./cardsEncyclopedie";
import { readData } from "../../../helpers/dataHelpers";
import "./cardsStyles.scss";



export const CardComponent = (props) => {
    const time = 500;
    const [dataLoaded, setDataLoaded] = useState(false);
    const [romans, setRomans] = useState([]);
    const [isData, setIsData] = useState(false);
    const [isCategoryPersonnage, setIsCategoryPersonnage] = useState(false);
    const [isCategoryFiche, setIsCategoryFiche] = useState(false);

    useEffect(() => {
        if(!dataLoaded) {
            readData("romans")
            .then((data) => {
                setRomans(data);
                setDataLoaded(true);
                switch (props.type) {
                    case "personnages":
                        setIsData(true);
                        setIsCategoryPersonnage(true);
                        break;
                    case "lieux":
                        setIsData(true);
                        setIsCategoryPersonnage(false);
                        break;
                    case "fiches":
                        setIsData(false);
                        setIsCategoryFiche(true);
                        break;
                    case "romans":
                        setIsData(false);
                        setIsCategoryFiche(false);
                        break;                                           
                    default:
                        setIsData(false);
                        break;
                }
            })
            .catch((err) => {
                console.log(err);
            });
        }
    }, [dataLoaded, setDataLoaded, props.type]);

    if (!dataLoaded)
        return <Loading />; 

    return (
        <>
            {props.datas.map((data, i) => {
                const nomRoman = getNomRoman(romans, data.roman)

                return isData ?
                    isCategoryPersonnage ?
                        <CardsPersonnages key={i} personnage={data} delay={time*i} roman={nomRoman} number={i} />
                        : <CardsLieux key={i} lieu={data} delay={time * i} roman={nomRoman} />
                    : isCategoryFiche ?
                        <CardsFiche key={i} fiche={data} roman={nomRoman} />
                        : <CardsRoman key={i} roman={data} />
            })}
        </>
    );
};



const convertArabicToRoman = (num) => {
	const rules = {
		"M": 1000, "CM": 900,
		"D": 500, "CD": 400,
		"C": 100, "XC": 90,
		"L": 50, "XL": 40,
		"XXX": 30, "XX": 20, "X": 10,
		"IX": 9, "V": 5, "IV": 4, "I": 1
	};
	
	let res = "";
	const romans = Object.keys(rules);

	for (let i = 0; i < romans.length; ++i) {
		const val = rules[romans[i]];
		
		while (num >= val) {
			num -= val;
			res += romans[i];
		}
	};
	return res;
};


export const RomanNumber = (props) => {
    let num = props.i + 1;
    return (
        <span>{convertArabicToRoman(num)}</span>
    );
};


export const getNomRoman = (romans, id) => {
    const roman = romans.find(roman => roman._id === id);
    return roman ? roman.nom : "";
};


export const adaptivePronoun = (emplacement) => {
	const premiereLettre = emplacement.substr(0,1);
	const voyelles = "aeiouyAEIOUY";
	const pronomConsonne = "au";
	const pronomVoyelle = "à l'";
	if (!voyelles.includes(premiereLettre))
		return `${pronomConsonne} ${emplacement}`
	else
		return `${pronomVoyelle} ${emplacement}`
};