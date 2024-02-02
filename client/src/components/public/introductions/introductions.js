import { faBookJournalWhills } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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