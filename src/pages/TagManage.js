import React, { useState } from 'react';
import { Table, Button, Space, Modal, Form, Input, message, Popconfirm, Tag } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const TagManage = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState([
    { id: 1, name: 'React', color: 'blue', count: 8, createTime: '2023-03-01' },
    { id: 2, name: 'Vue', color: 'green', count: 5, createTime: '2023-03-02' },
    { id: 3, name: 'Angular', color: 'red', count: 3, createTime: '2023-03-03' },
    { id: 4, name: 'Node.js', color: 'orange', count: 6, createTime: '2023-03-04' },
    { id: 5, name: 'JavaScript', color: 'gold', count: 12, createTime: '2023-03-05' },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTag, setEditingTag] = useState(null);

  const colorOptions = ['blue', 'green', 'red', 'orange', 'gold', 'purple', 'cyan', 'magenta'];

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '标签名称',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Tag color={record.color}>{text}</Tag>
      ),
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
            title="确定要删除这个标签吗？"
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
    setEditingTag(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (record) => {
    setEditingTag(record);
    form.setFieldsValue({ 
      name: record.name,
      color: record.color
    });
    setModalVisible(true);
  };

  const handleDelete = (id) => {
    setData(data.filter(item => item.id !== id));
    message.success('标签删除成功');
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      if (editingTag) {
        // 编辑现有标签
        setData(data.map(item => 
          item.id === editingTag.id 
            ? { ...item, name: values.name, color: values.color } 
            : item
        ));
        message.success('标签更新成功');
      } else {
        // 添加新标签
        const newTag = {
          id: Math.max(...data.map(item => item.id)) + 1,
          name: values.name,
          color: values.color,
          count: 0,
          createTime: new Date().toISOString().split('T')[0]
        };
        setData([...data, newTag]);
        message.success('标签添加成功');
      }
      setModalVisible(false);
    });
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          添加标签
        </Button>
      </div>
      <Table columns={columns} dataSource={data} rowKey="id" />

      <Modal
        title={editingTag ? '编辑标签' : '添加标签'}
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
            label="标签名称"
            rules={[{ required: true, message: '请输入标签名称' }]}
          >
            <Input placeholder="请输入标签名称" />
          </Form.Item>
          <Form.Item
            name="color"
            label="标签颜色"
            rules={[{ required: true, message: '请选择标签颜色' }]}
          >
            <Space wrap>
              {colorOptions.map(color => (
                <Tag
                  key={color}
                  color={color}
                  style={{ cursor: 'pointer' }}
                  onClick={() => form.setFieldsValue({ color })}
                >
                  {form.getFieldValue('color') === color ? '✓' : ' '}
                </Tag>
              ))}
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TagManage; 