import React, { useState } from 'react';
import { Table, Button, Space, Modal, Form, Input, Select, message, Popconfirm, Tag, Switch } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, LockOutlined } from '@ant-design/icons';

const { Option } = Select;

const UserManage = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState([
    { 
      id: 1, 
      username: 'admin', 
      nickname: '管理员', 
      email: 'admin@example.com', 
      phone: '13800138000', 
      role: 'admin', 
      status: true, 
      createTime: '2023-03-01' 
    },
    { 
      id: 2, 
      username: 'editor', 
      nickname: '编辑', 
      email: 'editor@example.com', 
      phone: '13800138001', 
      role: 'editor', 
      status: true, 
      createTime: '2023-03-02' 
    },
    { 
      id: 3, 
      username: 'user1', 
      nickname: '普通用户1', 
      email: 'user1@example.com', 
      phone: '13800138002', 
      role: 'user', 
      status: true, 
      createTime: '2023-03-03' 
    },
    { 
      id: 4, 
      username: 'user2', 
      nickname: '普通用户2', 
      email: 'user2@example.com', 
      phone: '13800138003', 
      role: 'user', 
      status: false, 
      createTime: '2023-03-04' 
    },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
      key: 'nickname',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
      render: (role) => {
        let color = 'blue';
        let text = '用户';
        
        if (role === 'admin') {
          color = 'red';
          text = '管理员';
        } else if (role === 'editor') {
          color = 'green';
          text = '编辑';
        }
        
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status, record) => (
        <Switch 
          checked={status} 
          onChange={(checked) => handleStatusChange(record.id, checked)}
        />
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
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
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Button 
            icon={<LockOutlined />} 
            size="small"
            onClick={() => handleResetPassword(record.id)}
          >
            重置密码
          </Button>
          <Popconfirm
            title="确定要删除这个用户吗？"
            onConfirm={() => handleDelete(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <Button 
              danger 
              icon={<DeleteOutlined />} 
              size="small"
            >
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleAdd = () => {
    setEditingUser(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (record) => {
    setEditingUser(record);
    form.setFieldsValue({ 
      username: record.username,
      nickname: record.nickname,
      email: record.email,
      phone: record.phone,
      role: record.role,
      status: record.status
    });
    setModalVisible(true);
  };

  const handleDelete = (id) => {
    setData(data.filter(item => item.id !== id));
    message.success('用户删除成功');
  };

  const handleStatusChange = (id, status) => {
    setData(data.map(item => 
      item.id === id 
        ? { ...item, status } 
        : item
    ));
    message.success(`用户状态已${status ? '启用' : '禁用'}`);
  };

  const handleResetPassword = (id) => {
    setCurrentUserId(id);
    setPasswordModalVisible(true);
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      if (editingUser) {
        // 编辑现有用户
        setData(data.map(item => 
          item.id === editingUser.id 
            ? { 
                ...item, 
                username: values.username,
                nickname: values.nickname,
                email: values.email,
                phone: values.phone,
                role: values.role,
                status: values.status
              } 
            : item
        ));
        message.success('用户更新成功');
      } else {
        // 添加新用户
        const newUser = {
          id: Math.max(...data.map(item => item.id)) + 1,
          username: values.username,
          nickname: values.nickname,
          email: values.email,
          phone: values.phone,
          role: values.role,
          status: values.status,
          createTime: new Date().toISOString().split('T')[0]
        };
        setData([...data, newUser]);
        message.success('用户添加成功');
      }
      setModalVisible(false);
    });
  };

  const handlePasswordOk = () => {
    form.validateFields(['password', 'confirmPassword']).then(values => {
      message.success('密码重置成功');
      setPasswordModalVisible(false);
    });
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          添加用户
        </Button>
      </div>
      <Table columns={columns} dataSource={data} rowKey="id" />

      {/* 用户编辑/添加模态框 */}
      <Modal
        title={editingUser ? '编辑用户' : '添加用户'}
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={() => setModalVisible(false)}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{ status: true, role: 'user' }}
        >
          <Form.Item
            name="username"
            label="用户名"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input placeholder="请输入用户名" />
          </Form.Item>
          
          {!editingUser && (
            <Form.Item
              name="password"
              label="密码"
              rules={[
                { required: true, message: '请输入密码' },
                { min: 6, message: '密码长度不能少于6个字符' }
              ]}
            >
              <Input.Password placeholder="请输入密码" />
            </Form.Item>
          )}
          
          <Form.Item
            name="nickname"
            label="昵称"
            rules={[{ required: true, message: '请输入昵称' }]}
          >
            <Input placeholder="请输入昵称" />
          </Form.Item>
          
          <Form.Item
            name="email"
            label="邮箱"
            rules={[
              { required: true, message: '请输入邮箱' },
              { type: 'email', message: '请输入有效的邮箱地址' }
            ]}
          >
            <Input placeholder="请输入邮箱" />
          </Form.Item>
          
          <Form.Item
            name="phone"
            label="手机号"
            rules={[{ required: true, message: '请输入手机号' }]}
          >
            <Input placeholder="请输入手机号" />
          </Form.Item>
          
          <Form.Item
            name="role"
            label="角色"
            rules={[{ required: true, message: '请选择角色' }]}
          >
            <Select placeholder="请选择角色">
              <Option value="admin">管理员</Option>
              <Option value="editor">编辑</Option>
              <Option value="user">普通用户</Option>
            </Select>
          </Form.Item>
          
          <Form.Item
            name="status"
            label="状态"
            valuePropName="checked"
          >
            <Switch checkedChildren="启用" unCheckedChildren="禁用" />
          </Form.Item>
        </Form>
      </Modal>

      {/* 重置密码模态框 */}
      <Modal
        title="重置密码"
        open={passwordModalVisible}
        onOk={handlePasswordOk}
        onCancel={() => setPasswordModalVisible(false)}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="password"
            label="新密码"
            rules={[
              { required: true, message: '请输入新密码' },
              { min: 6, message: '密码长度不能少于6个字符' }
            ]}
          >
            <Input.Password placeholder="请输入新密码" />
          </Form.Item>
          
          <Form.Item
            name="confirmPassword"
            label="确认新密码"
            dependencies={['password']}
            rules={[
              { required: true, message: '请确认新密码' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('两次输入的密码不一致'));
                },
              }),
            ]}
          >
            <Input.Password placeholder="请确认新密码" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserManage; 