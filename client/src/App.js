import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
import { Loading } from "./components/loading/loading.js";


import { getUserbyToken } from "./helpers/authHelpers.js";
import { addUser } from "./store/slice/userSlice";
import { Accueil } from "./pages/public/accueil.js";
import { AccueilEncylopedie } from "./pages/public/accueilEncyclopedie.js";


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
        <Route path="/" element={<Accueil />} />
        <Route path="/accueil" element={<AccueilEncylopedie />} />
      </Routes>
  );
}

export default App;