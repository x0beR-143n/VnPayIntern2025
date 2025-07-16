import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import Home from '../features/home/Home';
import About from '../features/about/About';
import Login from '../features/auth/Login';
import TokenUsage from '../features/token_usage/TokenUsage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: 'login',
    element: <Login /> },
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: 'about', element: <About /> },
      { path: 'token_usage', element: <TokenUsage /> },
      // thêm route khác ở đây
    ],
  }
]);

export default router;
