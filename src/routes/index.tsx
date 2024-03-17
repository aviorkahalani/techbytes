import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import Posts from '../pages/Posts'
import Error from '../pages/Error'
import Admin from '../pages/Admin'
import ProtectedRoute from '../components/ProtectedRoute'
import Login from '../pages/Login'
import Overview from '../components/admin/Overview'
import Edit from '../components/admin/Edit'
import PostDetail from '../pages/PostDetail'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'posts',
        element: <Posts />,
      },
      {
        path: 'posts/:id',
        element: <PostDetail />,
      },
    ],
    errorElement: <Error />,
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <Admin />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Overview />,
      },
      {
        path: 'edit/:id?',
        element: <Edit />,
      },
    ],
    errorElement: <Error />,
  },
  {
    path: '/login',
    element: <Login />,
  },
])
