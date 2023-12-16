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
import CreateReviewPage from './components/CreateReviewPage.jsx';
import CreateSubsidyPage from './routes/CreateSubsidyPage.jsx';


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
        path: 'createSubsidy',
        element: <CreateSubsidyPage />,
      },
      {
        path: 'applications',
        element: <ApplicationPage />,
      },
      {
        path: 'reviews',
        element: <ReviewPage />,
      },
      {
        path: 'createreview',
        element: <CreateReviewPage />,
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
