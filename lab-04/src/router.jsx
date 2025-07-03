import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: 'about', element: <About /> },
      // thêm route khác ở đây
    ],
  }
]);

export default router;
