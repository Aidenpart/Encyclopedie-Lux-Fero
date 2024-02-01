

export const publicRoutes = [
    {path: "/cheminroute", component: < PageRoute/>},
]


//Dans App.js -> Fonctionnera pareil avec les routes Admin
{publicRoutes.map((route, i) => (
    <Route path={route.path} element={route.component}/>
))}