import React from 'react';
import { Table, Button, Space, Tag, Input } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const PostList = () => {
  // 模拟数据
  const data = [
    {
      id: 1,
      title: '如何使用React Router',
      category: '前端开发',
      tags: ['React', 'Router'],
      status: '已发布',
      createTime: '2023-03-15',
      viewCount: 128
    },
    {
      id: 2,
      title: 'Ant Design使用技巧',
      category: 'UI设计',
      tags: ['Ant Design', 'React'],
      status: '草稿',
      createTime: '2023-03-10',
      viewCount: 85
    }
  ];

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => <Link to={`/posts/edit/${record.id}`}>{text}</Link>,
    },
    {
      title: '分类',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: '标签',
      key: 'tags',
      dataIndex: 'tags',
      render: (tags) => (
        <>
          {tags.map(tag => (
            <Tag color="blue" key={tag}>
              {tag}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === '已发布' ? 'green' : 'orange'}>
          {status}
        </Tag>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '浏览量',
      dataIndex: 'viewCount',
      key: 'viewCount',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button 
            type="primary" 
            icon={<EditOutlined />} 
            size="small"
          >
            <Link to={`/posts/edit/${record.id}`}>编辑</Link>
          </Button>
          <Button 
            danger 
            icon={<DeleteOutlined />} 
            size="small"
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
        <Input.Search 
          placeholder="搜索文章" 
          style={{ width: 300 }} 
          enterButton={<SearchOutlined />} 
        />
        <Button type="primary" icon={<PlusOutlined />}>
          <Link to="/posts/new">新建文章</Link>
        </Button>
      </div>
      <Table columns={columns} dataSource={data} rowKey="id" />
    </div>
  );
};

export default PostList; 