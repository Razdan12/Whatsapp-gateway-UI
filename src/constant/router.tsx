import { createBrowserRouter } from 'react-router-dom';
import { listed, listedUser } from './listed';

import HomePage from '../pages/HomePage';
import RegisterPage from '../pages/RegisterPage';
import LoginPage from '../pages/LoginPage';
import LayoutAdmin from '@/components/Layout';
import Dashboard from '@/pages/userPanel/Dashboard';
import WebhooksPage from '@/pages/userPanel/Webhooks';
import ApisPage from '@/pages/userPanel/ApiHistory';
import WhatsappPage from '@/pages/userPanel/WhatsappAccount';
import Home from '@/pages/Home';

const Route: ReturnType<typeof createBrowserRouter> = createBrowserRouter([
  {
    path: listedUser.home,
    element: <HomePage />,
  },
  {
    path: listedUser.signup,
    element: <RegisterPage />,
  },
  {
    path: listedUser.login,
    element: <LoginPage />,
  },
  {
    path: '/',
    element: <LayoutAdmin />,
    children: [
      {
        path: listed.dashboard,
        element: <Dashboard />,
      },
      {
        path: listed.webhook,
        element: <WebhooksPage/>,
      },
      {
        path: listed.apis,
        element: <ApisPage/>,
      },
      {
        path: listed.waProfile,
        element: <WhatsappPage/>,
      },
      {
        path: listed.sinkronize,
        element: <Home/>,
      },
    ],
  },
]);

export default Route;
