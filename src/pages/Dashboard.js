import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import { 
  FileTextOutlined, 
  EyeOutlined, 
  CommentOutlined, 
  TagOutlined 
} from '@ant-design/icons';

const Dashboard = () => {
  // 这里可以添加获取统计数据的逻辑
  const stats = {
    posts: 25,
    views: 1024,
    comments: 56,
    tags: 18
  };

  return (
    <div>
      <h2>仪表盘</h2>
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic
              title="文章数量"
              value={stats.posts}
              prefix={<FileTextOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="总浏览量"
              value={stats.views}
              prefix={<EyeOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="评论数"
              value={stats.comments}
              prefix={<CommentOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="标签数"
              value={stats.tags}
              prefix={<TagOutlined />}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard; 