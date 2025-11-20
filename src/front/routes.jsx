import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";
import { Mision1 } from "./pages/mision";  // Importa Misión 1
import { Mision2 } from "./pages/mision2";  // Importa Misión 2
import { Mision3 } from "./pages/mision3";  // Importa Misión 3 (placeholder)
import { Mision4 } from "./pages/mision4";  // Importa Misión 3 (placeholder)

export const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >

        {/* Nested Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/single/:theId" element={<Single />} />
        <Route path="/demo" element={<Demo />} />

        {/* Misión Routes */}
        <Route path="/mision" element={<Mision1 />} />
        <Route path="/mision2" element={<Mision2 />} />
        <Route path="/mision3" element={<Mision3 />} />
        <Route path="/mision4" element={<Mision4 />} />


      </Route>
    )
);
