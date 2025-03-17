import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Space, Card, message } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';

const { Option } = Select;
const { TextArea } = Input;

const PostEdit = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const isEdit = id !== undefined;
  
  // 模拟分类和标签数据
  const categories = ['前端开发', 'UI设计', '后端开发', '数据库', '服务器'];
  const tags = ['React', 'Vue', 'Angular', 'Node.js', 'JavaScript', 'TypeScript', 'Ant Design', 'Router'];
  
  useEffect(() => {
    if (isEdit) {
      // 模拟从API获取文章数据
      const fetchData = async () => {
        setLoading(true);
        try {
          // 这里应该是实际的API调用
          // 模拟数据
          const postData = {
            title: '如何使用React Router',
            content: '这是一篇关于React Router的文章...',
            category: '前端开发',
            tags: ['React', 'Router'],
            status: '已发布'
          };
          
          form.setFieldsValue(postData);
        } catch (error) {
          message.error('获取文章数据失败');
        } finally {
          setLoading(false);
        }
      };
      
      fetchData();
    }
  }, [form, id, isEdit]);
  
  const onFinish = (values) => {
    console.log('提交的数据:', values);
    
    // 这里应该是实际的API调用
    message.success(`文章${isEdit ? '更新' : '创建'}成功！`);
    navigate('/posts');
  };
  
  return (
    <Card title={isEdit ? '编辑文章' : '新建文章'} loading={loading}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          status: '草稿',
          tags: []
        }}
      >
        <Form.Item
          name="title"
          label="标题"
          rules={[{ required: true, message: '请输入文章标题' }]}
        >
          <Input placeholder="请输入文章标题" />
        </Form.Item>
        
        <Form.Item
          name="category"
          label="分类"
          rules={[{ required: true, message: '请选择文章分类' }]}
        >
          <Select placeholder="请选择文章分类">
            {categories.map(category => (
              <Option key={category} value={category}>{category}</Option>
            ))}
          </Select>
        </Form.Item>
        
        <Form.Item
          name="tags"
          label="标签"
        >
          <Select mode="multiple" placeholder="请选择文章标签">
            {tags.map(tag => (
              <Option key={tag} value={tag}>{tag}</Option>
            ))}
          </Select>
        </Form.Item>
        
        <Form.Item
          name="content"
          label="内容"
          rules={[{ required: true, message: '请输入文章内容' }]}
        >
          <TextArea rows={10} placeholder="请输入文章内容" />
        </Form.Item>
        
        <Form.Item
          name="status"
          label="状态"
        >
          <Select>
            <Option value="草稿">草稿</Option>
            <Option value="已发布">发布</Option>
          </Select>
        </Form.Item>
        
        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              {isEdit ? '更新' : '创建'}
            </Button>
            <Button onClick={() => navigate('/posts')}>
              取消
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default PostEdit; 