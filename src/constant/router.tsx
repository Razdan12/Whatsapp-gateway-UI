import { createBrowserRouter } from "react-router-dom";
import { listedUser } from "./listed";
import SignIn from "../pages/Login";
import Home from "../pages/Home";


const Route: ReturnType<typeof createBrowserRouter> = createBrowserRouter([
  {
    path: listedUser.signin,
    element: <SignIn />,
  },
  {
    path: listedUser.whatsapp,
    element: <Home />,
  },
  
]);

export default Route;