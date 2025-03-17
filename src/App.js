import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import './App.css';

// 导入布局组件
import MainLayout from './components/Layout/MainLayout';

// 导入页面组件
import Dashboard from './pages/Dashboard';
import PostList from './pages/PostList';
import PostEdit from './pages/PostEdit';
import CategoryManage from './pages/CategoryManage';
import TagManage from './pages/TagManage';
import UserProfile from './pages/UserProfile';
import UserManage from './pages/UserManage';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

// 导入路由配置
import routes from './routes';

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="posts" element={<PostList />} />
            <Route path="posts/edit/:id" element={<PostEdit />} />
            <Route path="posts/new" element={<PostEdit />} />
            <Route path="categories" element={<CategoryManage />} />
            <Route path="tags" element={<TagManage />} />
            <Route path="users" element={<UserManage />} />
            <Route path="profile" element={<UserProfile />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
