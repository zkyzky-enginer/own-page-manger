import React, { useState } from 'react';
import { Form, Input, Button, Card, Avatar, Row, Col, Tabs, message, Upload } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, LockOutlined, UploadOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;

const UserProfile = () => {
  const [profileForm] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  
  // 模拟用户数据
  const userData = {
    username: 'admin',
    nickname: '管理员',
    email: 'admin@example.com',
    phone: '13800138000',
    avatar: 'https://joeschmoe.io/api/v1/random',
    bio: '这是一个博客管理员账号'
  };
  
  const onProfileFinish = (values) => {
    setLoading(true);
    console.log('个人信息更新:', values);
    
    // 模拟API调用
    setTimeout(() => {
      message.success('个人信息更新成功！');
      setLoading(false);
    }, 1000);
  };
  
  const onPasswordFinish = (values) => {
    setLoading(true);
    console.log('密码更新:', values);
    
    // 模拟API调用
    setTimeout(() => {
      message.success('密码更新成功！');
      passwordForm.resetFields();
      setLoading(false);
    }, 1000);
  };
  
  const uploadProps = {
    name: 'avatar',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} 上传成功`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 上传失败`);
      }
    },
  };
  
  return (
    <div>
      <h2>个人信息</h2>
      <Row gutter={24}>
        <Col span={8}>
          <Card>
            <div style={{ textAlign: 'center' }}>
              <Avatar size={100} src={userData.avatar} />
              <h3 style={{ marginTop: 16 }}>{userData.nickname}</h3>
              <p>{userData.bio}</p>
              <Upload {...uploadProps}>
                <Button icon={<UploadOutlined />}>更换头像</Button>
              </Upload>
            </div>
          </Card>
        </Col>
        <Col span={16}>
          <Card>
            <Tabs defaultActiveKey="1">
              <TabPane tab="基本信息" key="1">
                <Form
                  form={profileForm}
                  layout="vertical"
                  initialValues={userData}
                  onFinish={onProfileFinish}
                >
                  <Form.Item
                    name="username"
                    label="用户名"
                    rules={[{ required: true, message: '请输入用户名' }]}
                  >
                    <Input prefix={<UserOutlined />} disabled />
                  </Form.Item>
                  
                  <Form.Item
                    name="nickname"
                    label="昵称"
                    rules={[{ required: true, message: '请输入昵称' }]}
                  >
                    <Input prefix={<UserOutlined />} />
                  </Form.Item>
                  
                  <Form.Item
                    name="email"
                    label="邮箱"
                    rules={[
                      { required: true, message: '请输入邮箱' },
                      { type: 'email', message: '请输入有效的邮箱地址' }
                    ]}
                  >
                    <Input prefix={<MailOutlined />} />
                  </Form.Item>
                  
                  <Form.Item
                    name="phone"
                    label="手机号"
                    rules={[{ required: true, message: '请输入手机号' }]}
                  >
                    <Input prefix={<PhoneOutlined />} />
                  </Form.Item>
                  
                  <Form.Item
                    name="bio"
                    label="个人简介"
                  >
                    <Input.TextArea rows={4} />
                  </Form.Item>
                  
                  <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                      保存修改
                    </Button>
                  </Form.Item>
                </Form>
              </TabPane>
              
              <TabPane tab="修改密码" key="2">
                <Form
                  form={passwordForm}
                  layout="vertical"
                  onFinish={onPasswordFinish}
                >
                  <Form.Item
                    name="oldPassword"
                    label="当前密码"
                    rules={[{ required: true, message: '请输入当前密码' }]}
                  >
                    <Input.Password prefix={<LockOutlined />} />
                  </Form.Item>
                  
                  <Form.Item
                    name="newPassword"
                    label="新密码"
                    rules={[
                      { required: true, message: '请输入新密码' },
                      { min: 6, message: '密码长度不能少于6个字符' }
                    ]}
                  >
                    <Input.Password prefix={<LockOutlined />} />
                  </Form.Item>
                  
                  <Form.Item
                    name="confirmPassword"
                    label="确认新密码"
                    dependencies={['newPassword']}
                    rules={[
                      { required: true, message: '请确认新密码' },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('newPassword') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error('两次输入的密码不一致'));
                        },
                      }),
                    ]}
                  >
                    <Input.Password prefix={<LockOutlined />} />
                  </Form.Item>
                  
                  <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                      更新密码
                    </Button>
                  </Form.Item>
                </Form>
              </TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default UserProfile; 