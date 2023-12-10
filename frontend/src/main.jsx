import ReactDOM from 'react-dom/client';
import App from './routes/App.jsx';
import SubsidyPage from './routes/SubsidyPage.jsx';
import ApplicationPage from './routes/ApplicationPage.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/Root.jsx';
import ErrorPage from './routes/ErrorPage.jsx';
import Login from './routes/Login.jsx';
import ReviewPage from './routes/ReviewPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <App />,
      },
      {
        path: 'subsidies',
        element: <SubsidyPage />,
      },
      {
        path: 'applications',
        element: <ApplicationPage />,
      },
      {
        path: 'reviews',
        element: <ReviewPage />,
      }
      // ... puedes agregar más rutas hijas aquí ...
    ],
  },
  {
    path: '/auth',
    element: <Login />,
  },
  // ... otras rutas no relacionadas ...
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
