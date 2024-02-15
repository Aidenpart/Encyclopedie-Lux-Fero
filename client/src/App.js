import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
import { Loading } from "./components/public/loading/loading.js";


import { getUserbyToken } from "./helpers/authHelpers.js";
import { AdminMiddleware } from "./router/authMiddleware.js";

import { addUser } from "./store/slice/userSlice";
import { PagePreambule } from "./pages/public/pagePreambule.js";
import { PageCGU } from "./pages/legal/pageCGU.js"
import { PageAccueil } from "./pages/public/pageAccueilEncyclopedie.js";
import { PageAccueilLuxFero } from "./pages/public/pageAccueilLuxFero.js";
import { PageAccueilReginaMagicae } from "./pages/public/pageAccueilReginaMagicae.js";
import { PageRGPD } from "./pages/legal/pageRGPD.js";
import { PageMentionsLegales } from "./pages/legal/pageMentionsLegales.js"
import { PageConnexion } from "./pages/admin/pageConnexion.js";
import { PageAdmin } from "./pages/admin/pageAdmin.js";
import { PageCRUD } from "./pages/admin/CRUD/pageCRUD.js";
import { PageOne } from "./pages/admin/CRUD/pageOne.js";


function App() {
  
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [dataLoaded, setDataLoaded] = useState(false);
  
  useEffect(() => {
    if (!dataLoaded) {
      if (sessionStorage.getItem('jwt') && !user.isLogged) {
        const userTokenPromise = getUserbyToken();
        userTokenPromise
        .then(data => {
          dispatch(addUser(data));
          setDataLoaded(true);
        })
        .catch(err => {
          console.log(err);
        });
      }else
        setDataLoaded(true);
    }
  }, [dataLoaded, user.isLogged, dispatch]);
  
  if (!dataLoaded)
      return <Loading />;  

  return (
      <Routes>
        <Route path="/" element={<PagePreambule />} />
        <Route path="/accueil" element={<PageAccueil />} />
        <Route path="/accueil-Lux-Fero" element={<PageAccueilLuxFero />} />
        <Route path="/accueil-Regina-Magicae" element={<PageAccueilReginaMagicae />} />


        <Route path="/cgu" element={<PageCGU />} />
        <Route path="/rgpd" element={<PageRGPD />} />
        <Route path="/mentions-legales" element={<PageMentionsLegales />} />
        <Route path="/connexion" element={<PageConnexion />} />

        <Route path="/admin" element={<AdminMiddleware> <PageAdmin /> </AdminMiddleware>} />
        <Route path="/admin/CRUD" element={<AdminMiddleware> <PageCRUD /> </AdminMiddleware>} />
        <Route path="/admin/CRUD/lieux/:id" element={<AdminMiddleware> <PageOne /> </AdminMiddleware>} />
        <Route path="/admin/CRUD/personnages/:id" element={<AdminMiddleware> <PageOne /> </AdminMiddleware>} />

      </Routes>
  );
};

export default App;