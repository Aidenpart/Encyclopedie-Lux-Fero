import { PagePreambule } from "../pages/public/pageAccueil.js";
import { PageMentionsLegales } from "../pages/legal/pageMentionsLegales.js";
import { PageCGU } from "../pages/legal/pageCGU.js"
import { PageAccueilEncylopedie } from "../pages/public/pageAccueilEncyclopedie.js";
import { PageRGPD } from "../pages/legal/pageRGPD.js";


export const publicRoutes = [
    {path:"/", component : <PagePreambule/>},
    {path:"/accueil", component : <PageAccueilEncylopedie/>},
    {path:"/cgu", component : <PageCGU/>},
    {path:"/rgpd", component : <PageRGPD/>},
    {path:"/mentions-legales", component : <PageMentionsLegales/>},
]






/*
ne marche pas pour l'instant


export const publicRoutes = [
    {path: "/cheminroute", component: < PageRoute/>},
]


//Dans App.js -> Fonctionnera pareil avec les routes Admin
{publicRoutes.map((route, i) => (
    <Route path={route.path} element={route.component}/>
))}*/