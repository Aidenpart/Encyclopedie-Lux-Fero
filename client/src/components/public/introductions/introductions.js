import { faBookJournalWhills, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { appartenancesLuxFero, appartenancesReginaMagicae, listeRomans } from '../../../helpers/categories';
import "./introductionsStyles.scss";


export const IntroductionAccueil = () => {
    
    return (
        <article className="intro-accueil">
            <p className="introduction">
                Lecteurs, Lectrices, curieux et curieuses de tous horizons
                <br /><span className="bienvenu">Bienvenue sur l'encyclopédie officielle de</span>
                <br /><span className="titre-LF">L'Univers Lux Fero</span>
                <br />Ici, vous trouverez une encyclopédie des personnages et lieux des romans de l'univers Lux-Fero. Si vous découvrez cet endroit, un lien pour lire le premier tome de "Lux Fero - Le Porteur de Lumière" se trouve à la suite de ce paragraphe, en accès sur la plateforme Wattpad.
                <br />Alors, comme il m'est l'habitude de le dire, que vous voguiez ici, ou là-bas...
                <br />Bonne Lecture ! 
            </p>
            <a className="lien-wattpad" rel="noreferrer" target="_blank" href="https://www.wattpad.com/story/318552524-lux-fero-le-porteur-de-lumi%C3%A8re">
                <FontAwesomeIcon icon={faBookJournalWhills} /><span className="lire-roman">Lire le roman</span>
            </a>
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

export const IntroductionLuxFero = () => {

    return (
        <article className="intro-accueil">
            <p className="introduction">
                Ceci est le résumé du roman Lux Fero
            </p>
        </article>
    )
}

export const IntroductionReginaMagicae = () => {

    return (
        <article className="intro-accueil">
            <p className="introduction">
                Ceci est le résumé du roman Regina Magicae
            </p>
        </article>
    )
}