import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
import { Loading } from "./components/public/loading/loading.js";


import { getUserbyToken } from "./helpers/authHelpers.js";
import { addUser } from "./store/slice/userSlice";
import { PagePreambule } from "./pages/public/pageAccueil.js";
import { PageCGU } from "./pages/legal/pageCGU.js"
import { PageAccueilEncylopedie } from "./pages/public/pageAccueilEncyclopedie.js";
import { PageRGPD } from "./pages/legal/pageRGPD.js";
import { PageMentionsLegales } from "./pages/legal/pageMentionsLegales.js"


function App() {
  
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [dataLoaded, setDataLoaded] = useState(false);
  
  useEffect(() => {
    if (!dataLoaded) {
      if (localStorage.getItem('jwt') && !user.isLogged) {
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
        <Route path="/accueil" element={<PageAccueilEncylopedie />} />
        <Route path="/cgu" element={<PageCGU />} />
        <Route path="/rgpd" element={<PageRGPD />} />
        <Route path="/mentions-legales" element={<PageMentionsLegales />} />
      </Routes>
  );
}

export default App;