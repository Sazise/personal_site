import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home";
import Projects from "../pages/Projects";
import NotFound from "../pages/NotFound";

const router = createBrowserRouter([{
    path: "/",
    element: <Home />
},
{
    path: "/projects",
    element: <Projects />
},
{
    path: "*",
    element: <NotFound />
}

]);

export default router;