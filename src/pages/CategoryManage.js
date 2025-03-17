import React, { useState } from 'react';
import { Table, Button, Space, Modal, Form, Input, message, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const CategoryManage = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState([
    { id: 1, name: '前端开发', count: 12, createTime: '2023-03-01' },
    { id: 2, name: 'UI设计', count: 8, createTime: '2023-03-02' },
    { id: 3, name: '后端开发', count: 10, createTime: '2023-03-03' },
    { id: 4, name: '数据库', count: 5, createTime: '2023-03-04' },
    { id: 5, name: '服务器', count: 3, createTime: '2023-03-05' },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '分类名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '文章数量',
      dataIndex: 'count',
      key: 'count',
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
          <Popconfirm
            title="确定要删除这个分类吗？"
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
    setEditingCategory(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (record) => {
    setEditingCategory(record);
    form.setFieldsValue({ name: record.name });
    setModalVisible(true);
  };

  const handleDelete = (id) => {
    setData(data.filter(item => item.id !== id));
    message.success('分类删除成功');
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      if (editingCategory) {
        // 编辑现有分类
        setData(data.map(item => 
          item.id === editingCategory.id 
            ? { ...item, name: values.name } 
            : item
        ));
        message.success('分类更新成功');
      } else {
        // 添加新分类
        const newCategory = {
          id: Math.max(...data.map(item => item.id)) + 1,
          name: values.name,
          count: 0,
          createTime: new Date().toISOString().split('T')[0]
        };
        setData([...data, newCategory]);
        message.success('分类添加成功');
      }
      setModalVisible(false);
    });
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          添加分类
        </Button>
      </div>
      <Table columns={columns} dataSource={data} rowKey="id" />

      <Modal
        title={editingCategory ? '编辑分类' : '添加分类'}
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={() => setModalVisible(false)}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="name"
            label="分类名称"
            rules={[{ required: true, message: '请输入分类名称' }]}
          >
            <Input placeholder="请输入分类名称" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CategoryManage; 