import { Navigate } from 'react-router-dom';

// 页面组件
import Dashboard from './pages/Dashboard';
import PostList from './pages/PostList';
import PostEdit from './pages/PostEdit';
import CategoryManage from './pages/CategoryManage';
import TagManage from './pages/TagManage';
import UserProfile from './pages/UserProfile';
import UserManage from './pages/UserManage';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

// 路由配置
const routes = [
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />
  },
  {
    path: '/dashboard',
    element: <Dashboard />
  },
  {
    path: '/posts',
    element: <PostList />
  },
  {
    path: '/posts/edit/:id',
    element: <PostEdit />
  },
  {
    path: '/posts/new',
    element: <PostEdit />
  },
  {
    path: '/categories',
    element: <CategoryManage />
  },
  {
    path: '/tags',
    element: <TagManage />
  },
  {
    path: '/users',
    element: <UserManage />
  },
  {
    path: '/profile',
    element: <UserProfile />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '*',
    element: <NotFound />
  }
];

export default routes; 