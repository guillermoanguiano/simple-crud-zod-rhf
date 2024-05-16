import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<></>}>
                <Route path="/iniciar-sesion" element={<></>} />
                <Route path="/registrarse" element={<></>} />
            </Route>
            <Route path="/" element={<></>} >
                <Route path="/inicio" element={<></>} />
            </Route>
        </>
    )
)

export default router