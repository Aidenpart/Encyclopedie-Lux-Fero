import { useEffect, useState } from "react";

import { faBookJournalWhills, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./introductionsStyles.scss";


export const IntroductionAccueil = (props) => {
    const isDesktop = props.isDesktop;
    const [classIntro, setClassIntro] = useState("");

    useEffect(() => {
        isDesktop ?
            setClassIntro("intro-desktop")
            : setClassIntro("accueil")
    }, [isDesktop, setClassIntro]);
    
    return (
        <article className={`intro ${classIntro}`}>
            <p className="introduction">
                Lecteurs, lectrices, âmes de tous horizons
                <br /><span className="bienvenu">Bienvenue sur l'encyclopédie officielle de</span>
                <br /><span className="titre-LF">L'Univers Lux Fero</span>
                <br />Ici, vous trouverez une encyclopédie des personnages et lieux des romans de l'univers Lux-Fero. Si vous découvrez cet endroit, un lien pour lire le premier tome de "Lux Fero - Le Porteur de Lumière" se trouve plus bas, en accès sur la plateforme Wattpad.
                <br />Alors, comme il m'est l'habitude de le dire, que vous voguiez ici, ou là-bas...
                <br />Bonne Lecture ! 
            </p>

        </article>
    );
};


export const IntroductionAdmin = () => {
    
    return (
        <article className="intro-admin">
            <p>Ici, c'est la zone d'ombre, <span>"le lieu que l'oeil ne voit pas"</span>. <br />
                Ici, on répertorie les histoires, les personnages, les lieux, et peut-être plus tard, les anecdotes.
                Nul besoin d'être avare de détails et toujours se souvenir de ces quelques points : 
            </p>
            <ul className="liste-admin">
                <li><FontAwesomeIcon icon={faArrowRight} /><span>Est-ce mentionné dans le roman, ou les textes sacrés ?
                    <br/>Si oui:</span>
                        <ul  className="liste-admin">
                            <li><FontAwesomeIcon icon={faArrowRight} /><span>Que dit le roman ?</span></li>
                            <li><FontAwesomeIcon icon={faArrowRight} /><span>Que disent les textes sacrés ?</span></li>
                        </ul>
                </li>
                <li><FontAwesomeIcon icon={faArrowRight} /><span>Est-ce cohérent avec la diégèse déjà existante ?</span></li>
                <li><FontAwesomeIcon icon={faArrowRight} /><span>Si cela entre en conflit, comment cela peut être modifié pour correspondre ?</span></li>
            </ul>
            <p>Il est toujours plus simple d'écrire sur le clavier donc prioriser ce moyen mais le site est codé dans l'optique du mobile first. S'il devient un jour en ligne, il pourra ainsi être consulté qu'importe le média.</p>    
        </article>
    );
};

export const ResumeLuxFero = () => {

    return (
        <article className="resume-accueil">
            <p className="resume">
                Depuis dix ans, Lucifer s’est exilé chez l'Humanité mais lorsqu’il stoppe les crimes d’un serviteur d'un de ses Généraux Infernaux, il comprend que son Royaume est troublé. 
                <br />Hélas, il entraîne dans son périple Abigail, une humaine à laquelle il s'attache ; leurs destins liés, celle-ci découvrira qu’au-delà des fables, anges et démons existent réellement.  
                <br />Mais si à l'aube de toute légende réside une vérité, celle-ci peut s'avérer pire que son mythe.
            </p>
            <a className="lien-wattpad" rel="noreferrer" target="_blank" href="https://www.wattpad.com/story/318552524-lux-fero-le-porteur-de-lumi%C3%A8re">
                <FontAwesomeIcon icon={faBookJournalWhills} /><span className="lire-roman">Lire sur Wattpad</span>
            </a>
        </article>
    );
};

export const ResumeReginaMagicae = () => {

    return (
        <article className="resume-accueil">
            <p className="resume">
                L'Apocalypse complétée, Mähr découvre la vie d'un père et peine à équilibrer découverte de ses pouvoirs et nature divine de sa fille. Voulant se faire pardonner d'un nouvel écart auprès de Siohe, il décide l'emmener voir la plus grande bibliothèque d'Europe. 
                <br />Hélas, un fantôme de son passé ressurgit et tous deux se retrouvent embarqués dans un périple duquel ce premier se serait bien passé mais dont la seconde ne pouvait que rêver.
            </p>
        </article>
    );
};